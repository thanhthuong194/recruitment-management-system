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

/**
 * Controller quản lý Thông báo Tuyển dụng (Recruitment Notifications).
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>GET /api/notifications/public - Lấy thông báo công khai (Landing page)</li>
 *   <li>GET /api/notifications - Lấy tất cả thông báo (authenticated)</li>
 *   <li>POST /api/notifications - Tạo thông báo mới (HR only)</li>
 *   <li>PUT /api/notifications/{id} - Cập nhật thông báo (HR only)</li>
 *   <li>DELETE /api/notifications/{id} - Xóa thông báo (HR only)</li>
 *   <li>GET /api/notifications/check-plan/{planId} - Kiểm tra kế hoạch đã đăng tin chưa</li>
 * </ul>
 * 
 * <p>Quyền truy cập:
 * <ul>
 *   <li>Public: Xem thông báo active</li>
 *   <li>HR (PERSONNEL_MANAGER): CRUD thông báo</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see RecruitmentNotification
 * @see NotificationResponse
 */
@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    /** Repository truy vấn thông báo tuyển dụng */
    private final RecruitmentNotificationRepository notificationRepository;
    
    /** Repository truy vấn thông tin người dùng */
    private final UserRepository userRepository;
    
    /** Repository truy vấn kế hoạch tuyển dụng */
    private final RecruitmentPlanRepository planRepository;

    /**
     * Constructor khởi tạo NotificationController với dependency injection.
     * 
     * @param notificationRepository Repository xử lý RecruitmentNotification
     * @param userRepository Repository xử lý User
     * @param planRepository Repository xử lý RecruitmentPlan
     */
    public NotificationController(RecruitmentNotificationRepository notificationRepository,
                                   UserRepository userRepository,
                                   RecruitmentPlanRepository planRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
    }

    /**
     * Lấy danh sách thông báo tuyển dụng công khai (cho Landing Page).
     * 
     * <p>Endpoint: GET /api/notifications/public
     * 
     * <p>Chỉ trả về các thông báo có isActive = true, sắp xếp theo ngày tạo giảm dần.
     * 
     * @return ResponseEntity chứa danh sách NotificationResponse active
     */
    @GetMapping(value = "/public", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<NotificationResponse>> getPublicNotifications() {
        List<RecruitmentNotification> notifications = notificationRepository.findByIsActiveTrueOrderByCreatedDateDesc();
        List<NotificationResponse> response = notifications.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    /**
     * Lấy tất cả thông báo tuyển dụng (cho người dùng đã đăng nhập).
     * 
     * <p>Endpoint: GET /api/notifications
     * 
     * <p>Trả về toàn bộ thông báo, bao gồm cả inactive.
     * 
     * @return ResponseEntity chứa danh sách tất cả NotificationResponse
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {
        List<RecruitmentNotification> notifications = notificationRepository.findAll();
        List<NotificationResponse> response = notifications.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    /**
     * Tạo thông báo tuyển dụng mới (chỉ dành cho HR).
     * 
     * <p>Endpoint: POST /api/notifications
     * 
     * <p>Quy trình:
     * <ol>
     *   <li>Kiểm tra quyền PERSONNEL_MANAGER</li>
     *   <li>Kiểm tra kế hoạch đã được đăng tin chưa (nếu có planID)</li>
     *   <li>Tạo thông báo với isActive = true</li>
     * </ol>
     * 
     * @param request Thông tin thông báo (title, content, planID)
     * @return ResponseEntity chứa:
     *         - Thành công: NotificationResponse đã tạo với HTTP 201
     *         - Thất bại: HTTP 403 nếu không phải HR
     *         - Thất bại: HTTP 409 nếu kế hoạch đã đăng tin
     */
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

    /**
     * Cập nhật thông báo tuyển dụng (chỉ dành cho HR).
     * 
     * <p>Endpoint: PUT /api/notifications/{id}
     * 
     * <p>Có thể cập nhật: title, content
     * 
     * @param id ID của thông báo cần cập nhật
     * @param request Thông tin cần cập nhật
     * @return ResponseEntity chứa:
     *         - Thành công: NotificationResponse đã cập nhật
     *         - Thất bại: HTTP 403 nếu không phải HR
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
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

    /**
     * Xóa vĩnh viễn thông báo tuyển dụng (chỉ dành cho HR).
     * 
     * <p>Endpoint: DELETE /api/notifications/{id}
     * 
     * @param id ID của thông báo cần xóa
     * @return ResponseEntity chứa:
     *         - Thành công: HTTP 204 No Content
     *         - Thất bại: HTTP 403 nếu không phải HR
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
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

    /**
     * Chuyển đổi entity RecruitmentNotification sang DTO NotificationResponse.
     * 
     * @param notification Entity cần chuyển đổi
     * @return NotificationResponse DTO đã được map
     */
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

    /**
     * Kiểm tra xem kế hoạch đã được đăng tin tuyển dụng chưa.
     * 
     * <p>Endpoint: GET /api/notifications/check-plan/{planId}
     * 
     * <p>Sử dụng để kiểm tra trước khi tạo thông báo mới,
     * tránh đăng tin trùng lặp cho cùng một kế hoạch.
     * 
     * @param planId ID của kế hoạch cần kiểm tra
     * @return ResponseEntity chứa true nếu đã đăng, false nếu chưa
     */
    @GetMapping("/check-plan/{planId}")
    public ResponseEntity<Boolean> isPlanPosted(@PathVariable Integer planId) {
        boolean isPosted = notificationRepository.existsByPlanPlanID(planId);
        return ResponseEntity.ok(isPosted);
    }
}
