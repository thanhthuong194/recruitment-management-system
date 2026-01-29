package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO đại diện cho thông tin Ứng viên.
 * 
 * <p>Trả về trong các API:
 * <ul>
 *   <li>GET /api/candidates - Danh sách ứng viên</li>
 *   <li>GET /api/candidates/{id} - Chi tiết ứng viên</li>
 *   <li>Nested trong ApplicationDTO</li>
 * </ul>
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "candidateID": 1,
 *   "fullName": "Nguyễn Văn A",
 *   "dateOfBirth": "1995-05-15",
 *   "email": "nguyenvana@email.com",
 *   "phone": "0901234567",
 *   "position": "Giảng viên",
 *   "department": "Khoa CNTT",
 *   "address": "123 Đường ABC",
 *   "cpa": 3.5,
 *   "sex": "Nam",
 *   "cvPath": "uploads/abc123.pdf"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.CandidateController
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDTO {
    /** ID duy nhất của ứng viên */
    private Integer candidateID;
    
    /** Họ và tên đầy đủ */
    private String fullName;
    
    /** Ngày sinh */
    private LocalDate dateOfBirth;
    
    /** Email liên hệ */
    private String email;
    
    /** Số điện thoại */
    private String phone;
    
    /** Vị trí ứng tuyển */
    private String position;
    
    /** Phòng ban/Khoa */
    private String department;
    
    /** Địa chỉ liên hệ */
    private String address;
    
    /** Điểm CPA/GPA */
    private Float cpa;
    
    /** Giới tính */
    private String sex;
    
    /** Đường dẫn file CV */
    private String cvPath;
}
