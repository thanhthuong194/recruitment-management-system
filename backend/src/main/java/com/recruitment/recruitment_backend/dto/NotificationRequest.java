package com.recruitment.recruitment_backend.dto;

import lombok.*;

/**
 * DTO cho yêu cầu tạo/cập nhật Thông báo Tuyển dụng.
 * 
 * <p>Sử dụng trong các API:
 * <ul>
 *   <li>POST /api/notifications/recruitment - Tạo thông báo mới</li>
 *   <li>PUT /api/notifications/recruitment/{id} - Cập nhật thông báo</li>
 * </ul>
 * 
 * <p>Ví dụ JSON request:
 * <pre>{@code
 * {
 *   "title": "Thông báo tuyển giảng viên CNTT",
 *   "content": "Nội dung chi tiết thông báo...",
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
public class NotificationRequest {
    /** Tiêu đề thông báo */
    private String title;
    
    /** Nội dung chi tiết của thông báo (có thể chứa HTML) */
    private String content;
    
    /** ID kế hoạch tuyển dụng liên quan (tùy chọn) */
    private Integer planID;
}
