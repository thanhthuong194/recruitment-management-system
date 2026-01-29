package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO cho yêu cầu nộp Đơn Ứng tuyển mới.
 * 
 * <p>Sử dụng trong API: POST /api/applications/submit
 * 
 * <p>Quy trình nộp đơn:
 * <ol>
 *   <li>Upload CV qua POST /api/upload/cv → nhận cvPath</li>
 *   <li>Gửi ApplicationSubmitRequest với cvPath</li>
 * </ol>
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "fullName": "Nguyễn Văn A",
 *   "dateOfBirth": "1995-05-15",
 *   "email": "nguyenvana@email.com",
 *   "phone": "0901234567",
 *   "position": "Giảng viên",
 *   "department": "Khoa CNTT",
 *   "address": "123 Đường ABC, TP.HCM",
 *   "cpa": 3.5,
 *   "sex": "Nam",
 *   "cvPath": "uploads/abc123.pdf",
 *   "positionID": 5
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.ApplicationController#submitApplication
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationSubmitRequest {
    /** Họ và tên đầy đủ của ứng viên */
    private String fullName;
    
    /** Ngày sinh */
    private LocalDate dateOfBirth;
    
    /** Email liên hệ (dùng để gửi thông báo) */
    private String email;
    
    /** Số điện thoại liên hệ */
    private String phone;
    
    /** Tên vị trí ứng tuyển (nếu không có positionID) */
    private String position;
    
    /** Phòng ban/Khoa muốn ứng tuyển */
    private String department;
    
    /** Địa chỉ liên hệ */
    private String address;
    
    /** Điểm CPA/GPA của ứng viên */
    private Float cpa;
    
    /** Giới tính: Nam, Nữ, Khác */
    private String sex;
    
    /** Đường dẫn tới file CV đã upload */
    private String cvPath;
    
    /** ID vị trí tuyển dụng (tùy chọn, liên kết với JobPosting) */
    private Integer positionID;
}
