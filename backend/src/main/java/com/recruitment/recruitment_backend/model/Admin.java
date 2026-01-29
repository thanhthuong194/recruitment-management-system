package com.recruitment.recruitment_backend.model;

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
 * Entity đại diện cho Quản trị viên hệ thống (Admin).
 * 
 * <p>Admin có quyền cao nhất trong hệ thống:
 * <ul>
 *   <li>Quản lý tất cả người dùng</li>
 *   <li>Tạo/xóa tài khoản Trưởng đơn vị (UnitManager)</li>
 *   <li>Xem tất cả dữ liệu trong hệ thống</li>
 * </ul>
 * 
 * <p>Quan hệ: OneToOne với User (chia sẻ ID)
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see User
 */
@Entity
@Table(name = "Admin")
@Getter
@Setter
@ToString(exclude = {"user"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Admin {
    /** ID admin (shared với User.userID) */
    @Id
    private Integer userID;

    /** Thông tin User liên kết */
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "userID")
    private User user;
}
