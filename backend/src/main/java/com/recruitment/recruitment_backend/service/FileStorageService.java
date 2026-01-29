package com.recruitment.recruitment_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * Service xử lý lưu trữ và quản lý file (CV uploads).
 * 
 * <p>Cung cấp các phương thức:
 * <ul>
 *   <li>{@link #storeFile(MultipartFile)} - Lưu file upload</li>
 *   <li>{@link #deleteFile(String)} - Xóa file</li>
 * </ul>
 * 
 * <p>Cấu hình:
 * <ul>
 *   <li>Thư mục lưu trữ: {@code file.upload-dir} (mặc định: uploads/cv)</li>
 *   <li>Tên file: UUID + extension gốc để tránh trùng lặp</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 */
@Service
public class FileStorageService {

    /** Đường dẫn thư mục lưu trữ file */
    private final Path fileStorageLocation;

    /**
     * Constructor khởi tạo FileStorageService.
     * 
     * <p>Tự động tạo thư mục lưu trữ nếu chưa tồn tại.
     * 
     * @param uploadDir Đường dẫn thư mục upload từ configuration
     * @throws RuntimeException nếu không thể tạo thư mục
     */
    public FileStorageService(@Value("${file.upload-dir:uploads/cv}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    /**
     * Lưu file upload vào hệ thống.
     * 
     * <p>Quy trình:
     * <ol>
     *   <li>Làm sạch tên file gốc</li>
     *   <li>Kiểm tra path traversal attack (..)</li>
     *   <li>Tạo tên file mới với UUID</li>
     *   <li>Lưu file vào thư mục đích</li>
     * </ol>
     * 
     * <p>Ví dụ:
     * <pre>{@code
     * String path = fileStorageService.storeFile(multipartFile);
     * // path = "/uploads/cv/a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf"
     * }</pre>
     * 
     * @param file MultipartFile cần lưu
     * @return Đường dẫn tương đối của file đã lưu (để lưu vào database)
     * @throws RuntimeException nếu có lỗi khi lưu file
     */
    public String storeFile(MultipartFile file) {
        // Normalize file name
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        
        try {
            // Check if the file's name contains invalid characters
            if (originalFileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + originalFileName);
            }

            // Generate unique filename
            String fileExtension = "";
            if (originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String newFileName = UUID.randomUUID().toString() + fileExtension;

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/cv/" + newFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    /**
     * Xóa file khỏi hệ thống lưu trữ.
     * 
     * <p>Nếu file không tồn tại, không throw exception.
     * 
     * @param fileName Tên file cần xóa (UUID + extension)
     * @throws RuntimeException nếu có lỗi IO khi xóa
     */
    public void deleteFile(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Could not delete file " + fileName + ". Please try again!", ex);
        }
    }
}
