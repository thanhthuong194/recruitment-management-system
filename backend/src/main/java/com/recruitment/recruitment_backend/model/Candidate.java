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

@Entity
@Table(name = "Candidates")
@Getter
@Setter 
@ToString 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer candidateID;

    @Column(nullable = false, length = 50)
    private String fullName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 15, unique = true)
    private String phone;

    @Column(nullable = false, length = 50)
    private String position;

    @Column(nullable = false, length = 50)
    private String department;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false)
    private Float cpa;

    @Column(nullable = false, length = 10)
    private String sex;

    @Column(nullable = false, length = 255)
    private String cvPath;
}
