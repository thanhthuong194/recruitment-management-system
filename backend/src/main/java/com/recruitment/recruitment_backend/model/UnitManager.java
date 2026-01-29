package com.recruitment.recruitment_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Trưởng đơn vị (Unit Manager).
 * 
 * <p>Trưởng đơn vị có quyền:
 * <ul>
 *   <li>Tạo kế hoạch tuyển dụng cho đơn vị của mình</li>
 *   <li>Xem trạng thái các kế hoạch đã tạo</li>
 *   <li>Chỉnh sửa kế hoạch chưa được duyệt</li>
 * </ul>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToOne với User (chia sẻ ID)</li>
 *   <li>OneToMany với RecruitmentPlan (createdBy)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see User
 * @see RecruitmentPlan
 */
@Entity
@Table(name = "UnitManagers")
@Getter
@Setter
@ToString(exclude = {"user"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UnitManager {
    /** ID trưởng đơn vị (shared với User.userID) */
    @Id
    private Integer useID;

    /** Thông tin User liên kết */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "userID")
    @NonNull
    private User user;

    /** Phòng ban/Khoa quản lý */
    @Column(nullable = false, length = 100)
    private String department;

    /** Chức vụ trong đơn vị */
    @Column(nullable = false, length = 100)
    private String position;
}
