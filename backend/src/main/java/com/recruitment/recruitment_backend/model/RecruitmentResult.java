package com.recruitment.recruitment_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "RecruitmentResults")
@Getter 
@Setter
@ToString(exclude = {"plan"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RecruitmentResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer resultID;

    @Column(nullable = false, length = 20) 
    private String finalDecision;

    @OneToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "planID", nullable = false)
    private RecruitmentPlan plan;
}
