package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO cho yêu cầu tạo User mới (chỉ dành cho Admin/UNIT_MANAGER).
 * 
 * <p>Sử dụng trong API: POST /api/user-management/users
 * 
 * <p>Các role hợp lệ:
 * <ul>
 *   <li>ADMIN - Quản trị viên hệ thống</li>
 *   <li>RECTOR - Hiệu trưởng (phê duyệt kế hoạch)</li>
 *   <li>UNIT_MANAGER - Trưởng đơn vị (tạo kế hoạch)</li>
 *   <li>PERSONNEL_MANAGER - Cán bộ nhân sự</li>
 * </ul>
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "username": "truongkhoa_cntt",
 *   "password": "SecurePass123",
 *   "fullName": "Trần Văn B",
 *   "dateOfBirth": "1980-03-20",
 *   "phoneNumber": "0912345678",
 *   "email": "truongkhoa@university.edu.vn",
 *   "address": "456 Đường XYZ",
 *   "role": "UNIT_MANAGER",
 *   "sex": "Nam",
 *   "department": "Khoa CNTT",
 *   "position": "Trưởng khoa"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.UserManagementController#createUser
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
    /** Tên đăng nhập (unique, bắt buộc) */
    private String username;
    
    /** Mật khẩu (sẽ được mã hóa BCrypt) */
    private String password;
    
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
    
    /** Giới tính: Nam, Nữ, Khác */
    private String sex;
    
    /** Phòng ban (bắt buộc cho UNIT_MANAGER) */
    private String department;
    
    /** Chức vụ (bắt buộc cho UNIT_MANAGER) */
    private String position;
}
