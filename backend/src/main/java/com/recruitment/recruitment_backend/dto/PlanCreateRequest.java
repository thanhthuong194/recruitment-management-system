package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO cho yêu cầu tạo Kế hoạch Tuyển dụng mới.
 * 
 * <p>Sử dụng trong API: POST /api/plans
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "title": "Tuyển giảng viên CNTT",
 *   "position": "Giảng viên",
 *   "school": "Khoa Công nghệ thông tin",
 *   "quantity": 5,
 *   "cpa": 3.0,
 *   "creatDate": "2024-01-15"
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.PlansController#createPlan
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanCreateRequest {
    /** Tiêu đề kế hoạch */
    private String title;
    
    /** Vị trí tuyển dụng */
    private String position;
    
    /** Trường/Khoa/Phòng ban cần tuyển */
    private String school;
    
    /** Số lượng cần tuyển */
    private Integer quantity;
    
    /** Điểm CPA tối thiểu yêu cầu */
    private Double cpa;
    
    /** Ngày tạo (tùy chọn, mặc định = today) */
    private LocalDate creatDate;
}
