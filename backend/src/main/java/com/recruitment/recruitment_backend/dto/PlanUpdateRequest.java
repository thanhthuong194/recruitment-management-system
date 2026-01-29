package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO cho yêu cầu cập nhật Kế hoạch Tuyển dụng.
 * 
 * <p>Sử dụng trong API: PUT /api/plans/{id}
 * 
 * <p>Chỉ các trường được gửi sẽ được cập nhật.
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "title": "Tuyển giảng viên CNTT - Cập nhật",
 *   "quantity": 10,
 *   "cpa": 3.2
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.PlansController#updatePlan
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanUpdateRequest {
    /** Tiêu đề kế hoạch (tùy chọn) */
    private String title;
    
    /** Vị trí tuyển dụng (tùy chọn) */
    private String position;
    
    /** Trường/Khoa/Phòng ban (tùy chọn) */
    private String school;
    
    /** Số lượng cần tuyển (tùy chọn) */
    private Integer quantity;
    
    /** Điểm CPA tối thiểu (tùy chọn) */
    private Double cpa;
    
    /** Trạng thái mới (tùy chọn) */
    private String status;
    
    /** Ngày phê duyệt (set khi approve) */
    private LocalDate approvDate;
    
    /** ID người phê duyệt (set khi approve) */
    private Integer approvedBy;
}
