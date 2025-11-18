package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanCreateRequest {
    private String title;
    private String position;
    private String school;
    private Integer quantity;
    private Double cpa;
    private LocalDate creatDate;
}
