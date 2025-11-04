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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Applications")
@Getter 
@Setter 
@ToString(exclude = {"candidate", "position"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer applicationID;

    @Column(nullable = false)
    private LocalDate applyDate;

    @Column(length = 20)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "candidateID", nullable = false) 
    private Candidate candidate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "positionID", nullable = false)
    private JobPosition position;
}
