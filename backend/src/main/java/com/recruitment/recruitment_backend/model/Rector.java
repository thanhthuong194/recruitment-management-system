package com.recruitment.recruitment_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Hiệu trưởng (Rector).
 * 
 * <p>Hiệu trưởng có quyền:
 * <ul>
 *   <li>Xem danh sách kế hoạch tuyển dụng</li>
 *   <li>Phê duyệt (Approve) kế hoạch tuyển dụng</li>
 *   <li>Từ chối (Reject) kế hoạch tuyển dụng với lý do</li>
 * </ul>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToOne với User (chia sẻ ID)</li>
 *   <li>OneToMany với RecruitmentPlan (approvedBy)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see User
 * @see RecruitmentPlan
 */
@Entity
@Table(name = "Rector")
@Getter
@Setter
@ToString(exclude = {"user"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Rector {
    /** ID rector (shared với User.userID) */
    @Id
    private Integer userID;

    /** Thông tin User liên kết */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "userID")
    private User user;
}
