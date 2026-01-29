package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
 * Entity đại diện cho Hồ sơ Ứng tuyển (đơn ứng tuyển).
 * 
 * <p>Hồ sơ ứng tuyển liên kết giữa Ứng viên (Candidate) và Vị trí tuyển dụng (JobPosition).
 * Mỗi ứng viên có thể nộp nhiều hồ sơ cho các vị trí khác nhau.
 * 
 * <p>Workflow trạng thái:
 * <pre>
 * "Đang xét" → "Đạt" (đủ điều kiện)
 *           ↘ "Không đạt" (không đủ điều kiện)
 * </pre>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>ManyToOne với Candidate (ứng viên)</li>
 *   <li>ManyToOne với JobPosition (vị trí ứng tuyển)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see Candidate
 * @see JobPosition
 */
@Entity
@Table(name = "Applications")
@Getter 
@Setter 
@ToString(exclude = {"candidate", "position"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Application {
    /** ID hồ sơ (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer applicationID;

    /** Ngày nộp hồ sơ */
    @Column(nullable = false)
    private LocalDate applyDate;

    /** Trạng thái: "Đang xét", "Đã duyệt", "Từ chối" */
    @Column(length = 20)
    private String status;

    /** Lý do từ chối (nếu status = "Từ chối") */
    @Column(length = 500)
    private String rejectionReason;

    /** Ứng viên nộp hồ sơ */
    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "candidateID", nullable = false) 
    private Candidate candidate;

    /** Vị trí tuyển dụng ứng tuyển */
    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "positionID", nullable = false)
    private JobPosition position;
}
