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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity đại diện cho Thông báo kết quả gửi đến Ứng viên.
 * 
 * <p>Thông báo cá nhân được HR gửi đến từng ứng viên về kết quả tuyển dụng.
 * Khác với {@link RecruitmentNotification} - thông báo tuyển dụng công khai.
 * 
 * <p>Quan hệ:
 * <ul>
 *   <li>OneToOne với Candidate (người nhận)</li>
 *   <li>ManyToOne với PersonnelManager (người gửi)</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see Candidate
 * @see PersonnelManager
 * @see RecruitmentNotification
 */
@Entity
@Table(name = "Notifications")
@Getter 
@Setter 
@ToString(exclude = {"candidate", "sender"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Notification {
    /** ID thông báo (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notifID;

    /** Tiêu đề thông báo */
    @Column(nullable = false, length = 50)
    private String title;

    /** Vị trí tuyển dụng liên quan */
    @Column(nullable = false, length = 50)
    private String position;

    /** Ngày gửi thông báo */
    @Column(nullable = false)
    private LocalDate sentDate;

    /** Ứng viên nhận thông báo */
    @OneToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "candidateID", nullable = false) 
    private Candidate candidate;

    /** Nhân viên HR gửi thông báo */
    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "senderID", nullable = false)
    private PersonnelManager sender;
}
