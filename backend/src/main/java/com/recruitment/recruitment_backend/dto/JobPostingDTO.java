package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDTO {
    private Integer postid;
    private String title;
    private String status;
    private LocalDate createdDate;
    private LocalDate deadline;
    private Integer planid;
    private String position;
    private String school;
    private Integer quantity;
    private Float requiredCpa;
    private Integer positionID; // Job position ID for applications
}
