package com.recruitment.recruitment_backend.dto;

import lombok.Data;

/**
 * DTO cho yêu cầu User tự cập nhật thông tin cá nhân.
 * 
 * <p>Sử dụng trong API: PUT /api/users/me
 * 
 * <p>Chỉ cho phép user cập nhật các trường giới hạn để đảm bảo
 * an toàn (không cho thay đổi role, password qua API này).
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "username": "new_username",
 *   "email": "newemail@email.com",
 *   "phone": "0987654321",
 *   "address": "789 Đường Mới"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.UserController#updateSelf
 */
@Data
public class UserSelfUpdateRequest {
    /** Tên đăng nhập mới (tùy chọn) */
    private String username;
    
    /** Email mới (tùy chọn) */
    private String email;
    
    /** Số điện thoại mới (tùy chọn) */
    private String phone;
    
    /** Địa chỉ mới (tùy chọn) */
    private String address;
}