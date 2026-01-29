package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Tin Tuyển dụng.
 * 
 * <p>Tin tuyển dụng được tạo bởi HR (PersonnelManager) sau khi kế hoạch được duyệt.
 * Mỗi tin tuyển dụng liên kết với một kế hoạch tuyển dụng (RecruitmentPlan).
 * 
 * <p>Trạng thái:
 * <ul>
 *   <li>"Đang mở" - Đang nhận hồ sơ ứng tuyển</li>
 *   <li>"Đã đóng" - Hết hạn hoặc đã tuyển đủ</li>
 * </ul>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToOne với RecruitmentPlan (kế hoạch nguồn)</li>
 *   <li>ManyToOne với PersonnelManager (người đăng tin)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see RecruitmentPlan
 * @see PersonnelManager
 */
@Entity
@Table(name = "JobPostings")
@Getter
@Setter
@ToString(exclude = {"plan", "createdBy"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class JobPosting {
    /** ID tin tuyển dụng (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postID;

    /** Tiêu đề tin tuyển dụng */
    @Column(nullable = false, length = 100)
    private String title;

    /** Hạn nộp hồ sơ */
    @Column(nullable = false)
    private LocalDate deadline;

    /** Ngày đăng tin */
    @Column(nullable = false)
    private LocalDate createdDate; 

    /** Trạng thái: "Đang mở", "Đã đóng" */
    @Column(length = 20)
    private String status;

    /** Kế hoạch tuyển dụng nguồn */
    @OneToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "planID", nullable = false) 
    private RecruitmentPlan plan;

    /** Nhân viên HR đăng tin */
    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "createdBy", nullable = false)
    private PersonnelManager createdBy;
}
