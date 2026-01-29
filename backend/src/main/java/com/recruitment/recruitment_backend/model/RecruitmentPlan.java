package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Kế hoạch Tuyển dụng.
 * 
 * <p>Kế hoạch tuyển dụng được tạo bởi Trưởng đơn vị (UnitManager)
 * và phải được Hiệu trưởng (Rector) phê duyệt trước khi đăng tin.
 * 
 * <p>Workflow trạng thái:
 * <pre>
 * "Pending" → "Approved" (được duyệt) → Đăng tin tuyển dụng
 *          ↘ "Rejected" (bị từ chối)
 * </pre>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>ManyToOne với UnitManager (người tạo)</li>
 *   <li>ManyToOne với Rector (người duyệt)</li>
 *   <li>OneToMany với JobPosting, JobPosition, RecruitmentResult</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see UnitManager
 * @see Rector
 */
@Entity
@Table(name = "RecruitmentPlan")
@Getter
@Setter
@ToString(exclude = {"createdBy", "approvedBy"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RecruitmentPlan {
    /** ID kế hoạch (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planID;

    /** Tiêu đề kế hoạch */
    @Column(nullable = false, length = 30)
    private String title;

    /** Ngày tạo kế hoạch */
    @Column(nullable = false)
    private LocalDate creatDate;

    /** Trạng thái: Pending, Approved, Rejected */
    @Column(length = 10)
    private String status;

    /** Số lượng cần tuyển */
    @Column(nullable = false)
    private Integer quantity;

    /** Điểm CPA tối thiểu yêu cầu */
    @Column(nullable = false)
    private Float cpa;

    /** Vị trí tuyển dụng */
    @Column(nullable = false, length = 50)
    private String position;

    /** Trường/Khoa/Phòng ban cần tuyển */
    @Column(nullable = false, length = 255)
    private String school;

    /** Ngày phê duyệt/từ chối */
    @Column(nullable = true)
    private LocalDate approvDate;

    /** Lý do từ chối (nếu bị reject) */
    @Column(length = 500)
    private String rejectReason;

    /** Trưởng đơn vị tạo kế hoạch */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "createdBy", nullable = false)
    private UnitManager createdBy;

    /** Hiệu trưởng phê duyệt (nullable nếu chưa duyệt) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approvedBy")
    private Rector approvedBy;
}
