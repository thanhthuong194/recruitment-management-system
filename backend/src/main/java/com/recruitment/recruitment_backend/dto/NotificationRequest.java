package com.recruitment.recruitment_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationRequest {
    private String title;
    private String content;
    private Integer planID; // ID của kế hoạch tuyển dụng (nếu đăng từ kế hoạch)
}
