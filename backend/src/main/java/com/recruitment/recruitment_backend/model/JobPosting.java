package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "JobPostings")
@Getter
@Setter
@ToString(exclude = {"plan", "createdBy"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postID;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(nullable = false)
    private LocalDate createdDate; 

    @Column(length = 20)
    private String status;

    @OneToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "planID", nullable = false) 
    private RecruitmentPlan plan;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "createdBy", nullable = false)
    private PersonnelManager createdBy;
}
