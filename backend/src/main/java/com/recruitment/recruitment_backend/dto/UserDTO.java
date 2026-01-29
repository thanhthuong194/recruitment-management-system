package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO cơ bản đại diện cho thông tin User.
 * 
 * <p>Sử dụng trong các API quản lý user:
 * <ul>
 *   <li>GET /api/user-management/users - Danh sách users</li>
 *   <li>POST /api/user-management/users - User vừa tạo</li>
 * </ul>
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "userID": 1,
 *   "username": "admin",
 *   "fullName": "Nguyễn Quản Trị",
 *   "dateOfBirth": "1980-01-15",
 *   "phoneNumber": "0901234567",
 *   "email": "admin@university.edu.vn",
 *   "address": "123 Đường ABC",
 *   "role": "ADMIN",
 *   "sex": "Nam"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.UserManagementController
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    /** ID duy nhất của user */
    private Integer userID;
    
    /** Tên đăng nhập */
    private String username;
    
    /** Họ và tên đầy đủ */
    private String fullName;
    
    /** Ngày sinh */
    private LocalDate dateOfBirth;
    
    /** Số điện thoại */
    private String phoneNumber;
    
    /** Email */
    private String email;
    
    /** Địa chỉ */
    private String address;
    
    /** Role: ADMIN, RECTOR, UNIT_MANAGER, PERSONNEL_MANAGER */
    private String role;
    
    /** Giới tính */
    private String sex;
}
