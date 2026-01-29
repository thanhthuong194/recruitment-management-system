package com.recruitment.recruitment_backend.dto;

import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO phản hồi thông tin Thông báo Tuyển dụng.
 * 
 * <p>Trả về trong các API:
 * <ul>
 *   <li>GET /api/notifications/recruitment - Danh sách thông báo</li>
 *   <li>GET /api/notifications/recruitment/public - Thông báo công khai</li>
 *   <li>POST /api/notifications/recruitment - Thông báo vừa tạo</li>
 * </ul>
 * 
 * <p>Ví dụ JSON response:
 * <pre>{@code
 * {
 *   "id": 1,
 *   "title": "Thông báo tuyển giảng viên CNTT",
 *   "content": "Nội dung chi tiết...",
 *   "createdDate": "2024-01-20T10:30:00",
 *   "isActive": true,
 *   "createdBy": "personnel_manager",
 *   "planID": 5
 * }
 * }</pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.controller.NotificationController
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {
    /** ID duy nhất của thông báo */
    private Integer id;
    
    /** Tiêu đề thông báo */
    private String title;
    
    /** Nội dung chi tiết */
    private String content;
    
    /** Thời gian tạo */
    private LocalDateTime createdDate;
    
    /** Trạng thái hiển thị (true = đang đăng) */
    private Boolean isActive;
    
    /** Username của người tạo */
    private String createdBy;
    
    /** ID kế hoạch tuyển dụng liên quan (nếu có) */
    private Integer planID;
}
