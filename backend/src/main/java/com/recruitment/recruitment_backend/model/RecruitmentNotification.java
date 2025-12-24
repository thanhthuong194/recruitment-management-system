package com.recruitment.recruitment_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recruitment_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentNotification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String content;
    
    @Column(nullable = false)
    private LocalDateTime createdDate;
    
    @Column(nullable = false)
    private Boolean isActive;
    
    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "userid")
    private User createdBy;
    
    @ManyToOne
    @JoinColumn(name = "planID", referencedColumnName = "planID")
    private RecruitmentPlan plan;
}
