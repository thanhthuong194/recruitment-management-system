package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "RecruitmentPlan")
@Getter
@Setter
@ToString(exclude = {"createdBy", "approvedBy"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RecruitmentPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer planID;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false)
    private LocalDate creatDate;

    @Column(length = 10)
    private String status;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Float cpa;

    @Column(nullable = false, length = 50)
    private String position;

    @Column(nullable = false, length = 255)
    private String school;

    @Column(nullable = true)
    private LocalDate approvDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "createdBy", nullable = false)
    private UnitManager createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approvedBy")
    private Rector approvedBy;
}
