package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDTO {
    private Integer candidateID;
    private String fullName;
    private LocalDate dateOfBirth;
    private String email;
    private String phone;
    private String position;
    private String department;
    private String address;
    private Float cpa;
    private String sex;
    private String cvPath;
}
