package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDTO {
    private Integer applicationID;
    private LocalDate applyDate;
    private String status;
    private CandidateDTO candidate;
    private String positionTitle;
    private Integer positionID;
}
