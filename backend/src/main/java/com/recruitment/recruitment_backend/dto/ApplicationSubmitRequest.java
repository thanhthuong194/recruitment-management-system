package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationSubmitRequest {
    private String fullName;
    private LocalDate dateOfBirth;
    private String email;
    private String phone;
    private String position;
    private String department;
    private String address;
    private Float cpa;
    private String sex;
    private String cvPath; // Path to uploaded CV file
    private Integer positionID; // Job position ID (optional)
}
