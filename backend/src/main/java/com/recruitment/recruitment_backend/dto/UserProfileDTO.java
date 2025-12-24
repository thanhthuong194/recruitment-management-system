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
public class UserProfileDTO {
    private Integer userID;
    private String username;
    private String fullName;
    private LocalDate dateOfBirth;
    private String sex;
    private String phoneNumber;
    private String email;
    private String address;
    private String role;
    
    // Additional fields for UNIT_MANAGER
    private String department;
    private String position;
}
