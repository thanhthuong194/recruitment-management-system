package com.recruitment.recruitment_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity đại diện cho Thông báo Tuyển dụng công khai.
 * 
 * <p>Thông báo tuyển dụng được HR đăng trên Landing Page để công bố
 * thông tin tuyển dụng từ các kế hoạch đã được phê duyệt.
 * 
 * <p>Khác với {@link Notification} - thông báo cá nhân gửi đến ứng viên.
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>ManyToOne với User (người tạo - HR)</li>
 *   <li>ManyToOne với RecruitmentPlan (kế hoạch nguồn, tùy chọn)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see RecruitmentPlan
 * @see Notification
 */
@Entity
@Table(name = "recruitment_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentNotification {
    
    /** ID thông báo (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    /** Tiêu đề thông báo */
    @Column(nullable = false, length = 255)
    private String title;
    
    /** Nội dung chi tiết thông báo (HTML/text dài) */
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;
    
    /** Ngày giờ tạo thông báo */
    @Column(nullable = false)
    private LocalDateTime createdDate;
    
    /** Trạng thái hiển thị (true = hiện trên Landing Page) */
    @Column(nullable = false)
    private Boolean isActive;
    
    /** Người tạo thông báo (HR) */
    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "userid")
    private User createdBy;
    
    /** Kế hoạch tuyển dụng liên kết (tùy chọn) */
    @ManyToOne
    @JoinColumn(name = "planID", referencedColumnName = "planID")
    private RecruitmentPlan plan;
}
