package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO đại diện cho Thông tin Tuyển dụng (Job Posting).
 * 
 * <p>Trả về trong các API:
 * <ul>
 *   <li>GET /api/jobs - Danh sách công khai (không cần auth)</li>
 *   <li>GET /api/jobs/auth - Danh sách cho user đã đăng nhập</li>
 * </ul>
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "postid": 1,
 *   "title": "Tuyển giảng viên CNTT 2024",
 *   "status": "Active",
 *   "createdDate": "2024-01-20",
 *   "deadline": "2024-02-28",
 *   "planid": 5,
 *   "position": "Giảng viên",
 *   "school": "Khoa CNTT",
 *   "quantity": 10,
 *   "requiredCpa": 3.0,
 *   "positionID": 1
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.JobPostingController
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDTO {
    /** ID duy nhất của bài đăng */
    private Integer postid;
    
    /** Tiêu đề bài đăng */
    private String title;
    
    /** Trạng thái: Active, Closed, Draft */
    private String status;
    
    /** Ngày tạo */
    private LocalDate createdDate;
    
    /** Hạn nộp hồ sơ */
    private LocalDate deadline;
    
    /** ID kế hoạch tuyển dụng liên quan */
    private Integer planid;
    
    /** Vị trí tuyển dụng */
    private String position;
    
    /** Trường/Khoa/Phòng ban */
    private String school;
    
    /** Số lượng cần tuyển */
    private Integer quantity;
    
    /** Điểm CPA tối thiểu yêu cầu */
    private Float requiredCpa;
    
    /** ID vị trí (dùng cho ứng tuyển) */
    private Integer positionID;
}
