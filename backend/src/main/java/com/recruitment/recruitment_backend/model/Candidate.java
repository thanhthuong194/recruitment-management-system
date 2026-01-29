package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Ứng viên (người nộp hồ sơ tuyển dụng).
 * 
 * <p>Ứng viên được tạo tự động khi nộp hồ sơ ứng tuyển qua public form.
 * Thông tin ứng viên được liên kết với nhiều Application (nếu ứng tuyển nhiều vị trí).
 * 
 * <p>Các trường unique:
 * <ul>
 *   <li>email - Định danh ứng viên</li>
 *   <li>phone - Số điện thoại liên hệ</li>
 * </ul>
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToMany với Application (một ứng viên có thể nộp nhiều hồ sơ)</li>
 *   <li>OneToOne với Notification (thông báo kết quả)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see Application
 */
@Entity
@Table(name = "Candidates")
@Getter
@Setter 
@ToString 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Candidate {
    /** ID ứng viên (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer candidateID;

    /** Họ và tên đầy đủ */
    @Column(nullable = false, length = 50)
    private String fullName;

    /** Ngày sinh */
    @Column(nullable = false)
    private LocalDate dateOfBirth;

    /** Email (unique) - dùng để định danh ứng viên */
    @Column(nullable = false, length = 50, unique = true)
    private String email;

    /** Số điện thoại (unique) */
    @Column(nullable = false, length = 15, unique = true)
    private String phone;

    /** Vị trí ứng tuyển */
    @Column(nullable = false, length = 50)
    private String position;

    /** Phòng ban/Khoa ứng tuyển */
    @Column(nullable = false, length = 50)
    private String department;

    /** Địa chỉ liên hệ */
    @Column(nullable = false, length = 255)
    private String address;

    /** Điểm CPA/GPA của ứng viên */
    @Column(nullable = false)
    private Float cpa;

    /** Giới tính (Nam/Nữ) */
    @Column(nullable = false, length = 10)
    private String sex;

    /** Đường dẫn file CV đã upload */
    @Column(nullable = false, length = 255)
    private String cvPath;
}
