package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO đại diện cho một Đơn Ứng tuyển.
 * 
 * <p>Trả về trong các API:
 * <ul>
 *   <li>GET /api/applications - Danh sách đơn ứng tuyển</li>
 *   <li>GET /api/applications/job/{positionId} - Đơn theo vị trí</li>
 * </ul>
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "applicationID": 1,
 *   "applyDate": "2024-01-20",
 *   "status": "Pending",
 *   "candidate": { ... },
 *   "positionTitle": "Giảng viên CNTT",
 *   "positionID": 5
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.ApplicationController
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {
    /** ID duy nhất của đơn ứng tuyển */
    private Integer applicationID;
    
    /** Ngày nộp đơn */
    private LocalDate applyDate;
    
    /** Trạng thái: Đang xét, Đã duyệt, Từ chối */
    private String status;
    
    /** Lý do từ chối (nếu status = Từ chối) */
    private String rejectionReason;
    
    /** Thông tin ứng viên (nested DTO) */
    private CandidateDTO candidate;
    
    /** Tiêu đề vị trí ứng tuyển */
    private String positionTitle;
    
    /** ID vị trí ứng tuyển */
    private Integer positionID;
}
