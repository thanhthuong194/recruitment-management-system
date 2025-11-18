package com.recruitment.recruitment_backend.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {
    private Integer id;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private Boolean isActive;
    private String createdBy;
}
