package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanResponse {
    private Integer planid;
    private String title;
    private String position;
    private String school;
    private Integer quantity;
    private Double cpa;
    private String status;
    private LocalDate creatDate;
    private LocalDate approvDate;
    private String createdBy;
    private String approvedBy;
    private String rejectReason;
}
