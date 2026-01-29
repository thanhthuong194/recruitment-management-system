package com.recruitment.recruitment_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Nhân viên Nhân sự (HR - Personnel Manager).
 * 
 * <p>HR có quyền:
 * <ul>
 *   <li>Đăng tin tuyển dụng từ kế hoạch đã duyệt</li>
 *   <li>Quản lý thông báo tuyển dụng công khai</li>
 *   <li>Xem và đánh giá hồ sơ ứng tuyển</li>
 *   <li>Gửi thông báo kết quả cho ứng viên</li>
 *   <li>Xóa vĩnh viễn kế hoạch đã duyệt/từ chối</li>
 * </ul>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToOne với User (chia sẻ ID)</li>
 *   <li>OneToMany với JobPosting (createdBy)</li>
 *   <li>OneToMany với Notification (sender)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see User
 * @see JobPosting
 * @see Notification
 */
@Entity
@Table(name = "PersonnelManager")
@Getter
@Setter
@ToString(exclude = {"user"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonnelManager {
    /** ID HR (shared với User.userID) */
    @Id
    private Integer userID;

    /** Thông tin User liên kết */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "userID")
    private User user;

    /** Phòng ban (thường là Phòng Nhân sự) */
    @Column(nullable = false, length = 100)
    private String department;

    /** Chức vụ trong phòng */
    @Column(nullable = false, length = 100)
    private String position;
}
