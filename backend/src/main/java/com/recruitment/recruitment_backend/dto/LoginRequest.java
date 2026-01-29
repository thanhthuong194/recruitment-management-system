package com.recruitment.recruitment_backend.dto;

import lombok.Data; 

/**
 * DTO cho yêu cầu đăng nhập.
 * 
 * <p>Sử dụng trong API: POST /api/auth/login
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "username": "admin",
 *   "password": "password123"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.AuthController#login
 */
@Data 
public class LoginRequest {
    /** Tên đăng nhập */
    private String username;
    
    /** Mật khẩu (plain text, sẽ được xác thực với BCrypt) */
    private String password;
}