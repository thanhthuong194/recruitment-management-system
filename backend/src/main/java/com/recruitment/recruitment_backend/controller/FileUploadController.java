package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller quản lý Upload/Download File (CV).
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>POST /api/files/upload-cv - Upload file CV (Public)</li>
 *   <li>GET /api/files/download/{fileName} - Download file CV</li>
 * </ul>
 * 
 * <p>Định dạng file được hỗ trợ:
 * <ul>
 *   <li>PDF (.pdf)</li>
 *   <li>Word (.doc, .docx)</li>
 * </ul>
 * 
 * <p>Giới hạn: 5MB tối đa
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see FileStorageService
 */
@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileUploadController {

    /** Service xử lý lưu trữ file */
    @Autowired
    private FileStorageService fileStorageService;

    /** Thư mục lưu trữ file upload */
    @Value("${file.upload-dir:uploads/cv}")
    private String uploadDir;

    /**
     * Upload file CV (Public API - không cần đăng nhập).
     * 
     * <p>Endpoint: POST /api/files/upload-cv
     * 
     * <p>Quy trình validation:
     * <ol>
     *   <li>Kiểm tra file không rỗng</li>
     *   <li>Kiểm tra định dạng file (PDF, DOC, DOCX)</li>
     *   <li>Kiểm tra kích thước file (max 5MB)</li>
     *   <li>Lưu file với tên unique (UUID)</li>
     * </ol>
     * 
     * @param file MultipartFile - File CV cần upload
     * @return ResponseEntity chứa:
     *         - Thành công: { filePath: "/uploads/cv/xxx.pdf", message: "..." }
     *         - Thất bại: { error: "lý do" } với HTTP 400
     */
    @PostMapping("/upload-cv")
    public ResponseEntity<?> uploadCV(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "File is empty");
                return ResponseEntity.badRequest().body(error);
            }

            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || 
                (!contentType.equals("application/pdf") && 
                 !contentType.equals("application/msword") &&
                 !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Only PDF and Word documents are allowed");
                return ResponseEntity.badRequest().body(error);
            }

            // Validate file size (5MB max)
            if (file.getSize() > 5 * 1024 * 1024) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "File size must not exceed 5MB");
                return ResponseEntity.badRequest().body(error);
            }

            String filePath = fileStorageService.storeFile(file);
            
            Map<String, String> response = new HashMap<>();
            response.put("filePath", filePath);
            response.put("message", "File uploaded successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Could not upload file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Download file CV theo tên file.
     * 
     * <p>Endpoint: GET /api/files/download/{fileName}
     * 
     * <p>Trả về file với header Content-Disposition: inline để có thể xem trực tiếp
     * trong browser (đối với PDF).
     * 
     * @param fileName Tên file cần download (UUID + extension)
     * @return ResponseEntity chứa:
     *         - Thành công: Resource file với đúng Content-Type
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     *         - Thất bại: HTTP 400 nếu có lỗi
     */
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadCV(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Determine content type
                String contentType = "application/octet-stream";
                if (fileName.toLowerCase().endsWith(".pdf")) {
                    contentType = "application/pdf";
                } else if (fileName.toLowerCase().endsWith(".doc")) {
                    contentType = "application/msword";
                } else if (fileName.toLowerCase().endsWith(".docx")) {
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
