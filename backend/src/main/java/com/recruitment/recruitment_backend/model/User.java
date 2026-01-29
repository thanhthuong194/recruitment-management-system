package com.recruitment.recruitment_backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

/**
 * Entity đại diện cho Người dùng trong hệ thống.
 * 
 * <p>Đây là entity chính cho xác thực và phân quyền, implement {@link UserDetails}
 * để tích hợp với Spring Security.
 * 
 * <p>Các role trong hệ thống:
 * <ul>
 *   <li>ADMIN - Quản trị viên hệ thống</li>
 *   <li>RECTOR - Hiệu trưởng (duyệt kế hoạch)</li>
 *   <li>UNIT_MANAGER - Trưởng đơn vị (tạo kế hoạch)</li>
 *   <li>PERSONNEL_MANAGER - HR (đăng tin, quản lý hồ sơ)</li>
 * </ul>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToOne với Admin, Rector, UnitManager, PersonnelManager (tùy role)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see UserDetails
 */
@Entity
@Table(name = "Users")
@Getter
@Setter
@ToString(exclude = {"password", "admin", "rector", "unitManager", "personnelManager"}) 
@EqualsAndHashCode(exclude = {"password", "admin", "rector", "unitManager", "personnelManager"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails { 

    /** ID người dùng (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    /** Tên đăng nhập (unique, max 30 ký tự) */
    @Column(nullable = false, unique = true, length = 30)
    private String username;
    
    /** Mật khẩu đã mã hóa BCrypt (max 60 ký tự) */
    @Column(nullable = false, length = 60) 
    private String password;

    /** Họ và tên đầy đủ */
    @Column(nullable = false, length = 50)
    private String fullName;

    /** Ngày sinh */
    @Column(nullable = false)
    private LocalDate dateOfBirth;

    /** Số điện thoại (unique) */
    @Column(nullable = false, unique = true, length = 15)
    private String phoneNumber;

    /** Email (unique) */
    @Column(nullable = false, unique = true, length = 50)
    private String email;

    /** Địa chỉ */
    @Column(nullable = false, length = 255) 
    private String address;

    /** Role của user (ADMIN, RECTOR, UNIT_MANAGER, PERSONNEL_MANAGER) */
    @Column(nullable = false, length = 20)
    private String role; 
    
    /** Giới tính (Nam/Nữ) */
    @Column(nullable = false, length = 10)
    private String sex;

    /** Thông tin Admin (nếu role = ADMIN) */
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Admin admin;

    /** Thông tin Hiệu trưởng (nếu role = RECTOR) */
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Rector rector;

    /** Thông tin Trưởng đơn vị (nếu role = UNIT_MANAGER) */
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UnitManager unitManager;

    /** Thông tin HR (nếu role = PERSONNEL_MANAGER) */
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private PersonnelManager personnelManager;

    /**
     * Trả về danh sách quyền của user cho Spring Security.
     * 
     * @return Collection chứa GrantedAuthority với format "ROLE_{role}"
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }
    
    /** @return true - Tài khoản không hết hạn */
    @Override
    public boolean isAccountNonExpired() { return true; }

    /** @return true - Tài khoản không bị khóa */
    @Override
    public boolean isAccountNonLocked() { return true; }

    /** @return true - Credentials không hết hạn */
    @Override
    public boolean isCredentialsNonExpired() { return true; }

    /** @return true - Tài khoản được kích hoạt */
    @Override
    public boolean isEnabled() { return true; }
}