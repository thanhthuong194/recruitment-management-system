package com.recruitment.recruitment_backend.model;

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
 * Entity đại diện cho Vị trí Tuyển dụng cụ thể.
 * 
 * <p>Mỗi kế hoạch tuyển dụng (RecruitmentPlan) có thể có nhiều vị trí tuyển dụng.
 * Vị trí tuyển dụng được liên kết với hồ sơ ứng tuyển (Application).
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>ManyToOne với RecruitmentPlan (kế hoạch cha)</li>
 *   <li>OneToMany với Application (các hồ sơ ứng tuyển vị trí này)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see RecruitmentPlan
 * @see Application
 */
@Entity
@Table(name = "JobPositions")
@Getter 
@Setter 
@ToString(exclude = {"plan"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class JobPosition {
    /** ID vị trí (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer positionID;

    /** Tiêu đề/Tên vị trí tuyển dụng */
    @Column(nullable = false, length = 50)
    private String title; 

    /** Mô tả vị trí công việc */
    @Column(nullable = false, length = 50)
    private String position; 

    /** Kế hoạch tuyển dụng liên kết */
    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "planID", nullable = false)
    private RecruitmentPlan plan;
}
