package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.NotificationRequest;
import com.recruitment.recruitment_backend.dto.NotificationResponse;
import com.recruitment.recruitment_backend.model.RecruitmentNotification;
import com.recruitment.recruitment_backend.model.RecruitmentPlan;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.repository.RecruitmentNotificationRepository;
import com.recruitment.recruitment_backend.repository.RecruitmentPlanRepository;
import com.recruitment.recruitment_backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final RecruitmentNotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final RecruitmentPlanRepository planRepository;

    public NotificationController(RecruitmentNotificationRepository notificationRepository,
                                   UserRepository userRepository,
                                   RecruitmentPlanRepository planRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
    }

    // GET all active notifications (public - for landing page)
    @GetMapping(value = "/public", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<NotificationResponse>> getPublicNotifications() {
        List<RecruitmentNotification> notifications = notificationRepository.findByIsActiveTrueOrderByCreatedDateDesc();
        List<NotificationResponse> response = notifications.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    // GET all notifications (authenticated users)
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {
        List<RecruitmentNotification> notifications = notificationRepository.findAll();
        List<NotificationResponse> response = notifications.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    // CREATE new notification (HR only)
    @PostMapping(consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> createNotification(@RequestBody NotificationRequest request) {
        try {
            // For now, we'll use a default HR user since we don't have JWT authentication yet
            // In production, you should get this from the authentication token
            User user = userRepository.findByUsername("hr")
                    .orElseThrow(() -> new RuntimeException("HR user not found"));
            
            // Check if user is HR (PERSONNEL_MANAGER)
            if (!"PERSONNEL_MANAGER".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Chỉ nhân viên HR mới có quyền đăng thông báo");
            }

            RecruitmentPlan plan = null;
            if (request.getPlanID() != null) {
                plan = planRepository.findById(request.getPlanID())
                        .orElseThrow(() -> new RuntimeException("Kế hoạch tuyển dụng không tồn tại"));
                
                // Kiểm tra xem kế hoạch đã được đăng tin chưa
                if (notificationRepository.existsByPlanPlanID(request.getPlanID())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Kế hoạch này đã được đăng tin rồi");
                }
            }

            RecruitmentNotification notification = RecruitmentNotification.builder()
                    .title(request.getTitle())
                    .content(request.getContent())
                    .createdDate(LocalDateTime.now())
                    .isActive(true)
                    .createdBy(user)
                    .plan(plan)
                    .build();

            RecruitmentNotification saved = notificationRepository.save(notification);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToResponse(saved));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi tạo thông báo: " + e.getMessage());
        }
    }

    // UPDATE notification
    @PutMapping(value = "/{id}", consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> updateNotification(@PathVariable Integer id, @RequestBody NotificationRequest request) {
        try {
            // For now, we'll use a default HR user since we don't have JWT authentication yet
            User user = userRepository.findByUsername("hr")
                    .orElseThrow(() -> new RuntimeException("HR user not found"));
            
            if (!"PERSONNEL_MANAGER".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Chỉ nhân viên HR mới có quyền chỉnh sửa thông báo");
            }

            return notificationRepository.findById(id)
                    .map(notification -> {
                        notification.setTitle(request.getTitle());
                        notification.setContent(request.getContent());
                        RecruitmentNotification updated = notificationRepository.save(notification);
                        return ResponseEntity.ok(convertToResponse(updated));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi cập nhật thông báo: " + e.getMessage());
        }
    }

    // DELETE notification (permanent delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Integer id) {
        try {
            // For now, we'll use a default HR user since we don't have JWT authentication yet
            User user = userRepository.findByUsername("hr")
                    .orElseThrow(() -> new RuntimeException("HR user not found"));
            
            if (!"PERSONNEL_MANAGER".equals(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Chỉ nhân viên HR mới có quyền xóa thông báo");
            }

            return notificationRepository.findById(id)
                    .map(notification -> {
                        notificationRepository.delete(notification);
                        return ResponseEntity.noContent().build();
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private NotificationResponse convertToResponse(RecruitmentNotification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .content(notification.getContent())
                .createdDate(notification.getCreatedDate())
                .isActive(notification.getIsActive())
                .createdBy(notification.getCreatedBy() != null ? notification.getCreatedBy().getUsername() : null)
                .planID(notification.getPlan() != null ? notification.getPlan().getPlanID() : null)
                .build();
    }

    // CHECK if plan is already posted
    @GetMapping("/check-plan/{planId}")
    public ResponseEntity<Boolean> isPlanPosted(@PathVariable Integer planId) {
        boolean isPosted = notificationRepository.existsByPlanPlanID(planId);
        return ResponseEntity.ok(isPosted);
    }
}
