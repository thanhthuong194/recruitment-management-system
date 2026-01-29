package com.recruitment.recruitment_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Kết quả Tuyển dụng cuối cùng.
 * 
 * <p>Lưu trữ quyết định cuối cùng của quá trình tuyển dụng cho mỗi kế hoạch.
 * Mỗi kế hoạch tuyển dụng chỉ có một kết quả cuối cùng.
 * 
 * <p>Quan hệ: OneToOne với RecruitmentPlan
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see RecruitmentPlan
 */
@Entity
@Table(name = "RecruitmentResults")
@Getter 
@Setter
@ToString(exclude = {"plan"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RecruitmentResult {
    /** ID kết quả (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resultID;

    /** Quyết định cuối cùng (ví dụ: "Hoàn thành", "Hủy bỏ") */
    @Column(nullable = false, length = 20) 
    private String finalDecision;

    /** Kế hoạch tuyển dụng liên kết */
    @OneToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "planID", nullable = false)
    private RecruitmentPlan plan;
}
