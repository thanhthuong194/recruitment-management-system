package com.recruitment.recruitment_backend.dto;

import lombok.Data;

@Data
public class UserSelfUpdateRequest {
    private String username;
    private String email;
    private String phone;
    private String address;
}