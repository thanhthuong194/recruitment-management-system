package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO phản hồi thông tin Kế hoạch Tuyển dụng.
 * 
 * <p>Trả về trong các API:
 * <ul>
 *   <li>GET /api/plans - Danh sách kế hoạch</li>
 *   <li>GET /api/plans/{id} - Chi tiết kế hoạch</li>
 *   <li>POST /api/plans - Kế hoạch vừa tạo</li>
 * </ul>
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "planid": 1,
 *   "title": "Tuyển giảng viên CNTT",
 *   "position": "Giảng viên",
 *   "school": "Khoa CNTT",
 *   "quantity": 5,
 *   "cpa": 3.0,
 *   "status": "Pending",
 *   "creatDate": "2024-01-15",
 *   "approvDate": null,
 *   "createdBy": "unit_manager1",
 *   "approvedBy": null,
 *   "rejectReason": null
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.PlansController
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanResponse {
    /** ID duy nhất của kế hoạch */
    private Integer planid;
    
    /** Tiêu đề kế hoạch */
    private String title;
    
    /** Vị trí tuyển dụng */
    private String position;
    
    /** Trường/Khoa/Phòng ban */
    private String school;
    
    /** Số lượng cần tuyển */
    private Integer quantity;
    
    /** Điểm CPA tối thiểu yêu cầu */
    private Double cpa;
    
    /** Trạng thái: Pending, Approved, Rejected */
    private String status;
    
    /** Ngày tạo kế hoạch */
    private LocalDate creatDate;
    
    /** Ngày phê duyệt (null nếu chưa duyệt) */
    private LocalDate approvDate;
    
    /** Username của người tạo */
    private String createdBy;
    
    /** Username của người phê duyệt */
    private String approvedBy;
    
    /** Lý do từ chối (nếu bị reject) */
    private String rejectReason;
}
