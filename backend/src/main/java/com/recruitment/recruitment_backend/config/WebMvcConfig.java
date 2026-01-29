package com.recruitment.recruitment_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Cấu hình Spring MVC cho ứng dụng.
 * 
 * <p>Class này cấu hình việc phục vụ các file tĩnh (static resources),
 * đặc biệt là các file CV đã upload.
 * 
 * <p>Cấu hình đường dẫn:
 * <ul>
 *   <li>URL: /uploads/cv/** → Folder: {file.upload-dir}</li>
 *   <li>Mặc định: uploads/cv trong thư mục gốc project</li>
 * </ul>
 * 
 * <p>Ví dụ sử dụng:
 * <pre>
 * Tải file: GET /uploads/cv/abc123.pdf
 * Đường dẫn thực tế: {project}/uploads/cv/abc123.pdf
 * </pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurer
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * Thư mục lưu trữ file upload.
     * 
     * <p>Cấu hình trong application.properties: file.upload-dir
     * <p>Giá trị mặc định: uploads/cv
     */
    @Value("${file.upload-dir:uploads/cv}")
    private String uploadDir;

    /**
     * Cấu hình resource handlers để phục vụ file tĩnh.
     * 
     * <p>Map URL pattern /uploads/cv/** tới thư mục upload thực tế
     * trên hệ thống file.
     * 
     * @param registry ResourceHandlerRegistry để đăng ký handlers
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Get absolute path for uploads directory
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        String uploadAbsolutePath = uploadPath.toUri().toString();

        // Serve files from /uploads/cv/** URL
        registry.addResourceHandler("/uploads/cv/**")
                .addResourceLocations(uploadAbsolutePath);
    }
}
