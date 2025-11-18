package com.recruitment.recruitment_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer userID;
    private String username;
    private String fullName;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String email;
    private String address;
    private String role;
    private String sex;
}
