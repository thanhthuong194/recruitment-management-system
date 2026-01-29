package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO đầy đủ cho thông tin Profile User.
 * 
 * <p>Sử dụng trong API: GET /api/users/me
 * 
 * <p>Bao gồm thêm các trường đặc biệt cho UNIT_MANAGER
 * (department, position).
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "userID": 2,
 *   "username": "truongkhoa_cntt",
 *   "fullName": "Trần Văn B",
 *   "dateOfBirth": "1980-03-20",
 *   "sex": "Nam",
 *   "phoneNumber": "0912345678",
 *   "email": "truongkhoa@university.edu.vn",
 *   "address": "456 Đường XYZ",
 *   "role": "UNIT_MANAGER",
 *   "department": "Khoa CNTT",
 *   "position": "Trưởng khoa"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.UserController
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    /** ID duy nhất của user */
    private Integer userID;
    
    /** Tên đăng nhập */
    private String username;
    
    /** Họ và tên đầy đủ */
    private String fullName;
    
    /** Ngày sinh */
    private LocalDate dateOfBirth;
    
    /** Giới tính */
    private String sex;
    
    /** Số điện thoại */
    private String phoneNumber;
    
    /** Email */
    private String email;
    
    /** Địa chỉ */
    private String address;
    
    /** Role: ADMIN, RECTOR, UNIT_MANAGER, PERSONNEL_MANAGER */
    private String role;
    
    /** Phòng ban (chỉ cho UNIT_MANAGER) */
    private String department;
    
    /** Chức vụ (chỉ cho UNIT_MANAGER) */
    private String position;
}
