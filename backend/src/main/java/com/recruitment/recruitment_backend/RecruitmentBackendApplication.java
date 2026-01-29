package com.recruitment.recruitment_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Lớp khởi động chính của ứng dụng Recruitment Management System.
 * 
 * <p>Đây là entry point của ứng dụng Spring Boot, chịu trách nhiệm:
 * <ul>
 *   <li>Khởi tạo Spring Application Context</li>
 *   <li>Quét và đăng ký tất cả các Bean trong package com.recruitment</li>
 *   <li>Cấu hình auto-configuration của Spring Boot</li>
 *   <li>Khởi động embedded server (Tomcat)</li>
 * </ul>
 * 
 * <p>Cách chạy ứng dụng:
 * <pre>{@code
 * // Sử dụng Maven
 * mvn spring-boot:run
 * 
 * // Hoặc chạy JAR file
 * java -jar recruitment-backend.jar
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @since 2024
 * @see org.springframework.boot.autoconfigure.SpringBootApplication
 */
@SpringBootApplication
public class RecruitmentBackendApplication {

	/**
	 * Phương thức main - điểm khởi đầu của ứng dụng.
	 * 
	 * <p>Khởi chạy ứng dụng Spring Boot với các cấu hình mặc định.
	 * Ứng dụng sẽ chạy trên cổng được cấu hình trong application.properties
	 * (mặc định: 8080).
	 * 
	 * @param args Tham số dòng lệnh (command line arguments)
	 *             - Có thể truyền các cấu hình như: --server.port=9090
	 */
	public static void main(String[] args) {
		SpringApplication.run(RecruitmentBackendApplication.class, args);
	}

}
