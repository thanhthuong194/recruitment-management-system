package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.UserProfileDTO;
import com.recruitment.recruitment_backend.dto.UserSelfUpdateRequest;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

/**
 * Controller xử lý các chức năng liên quan đến thông tin người dùng hiện tại.
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>Lấy thông tin profile người dùng đang đăng nhập</li>
 *   <li>Cập nhật thông tin cá nhân</li>
 * </ul>
 * 
 * <p>Base URL: /api/users
 * 
 * <p>Lưu ý: Controller này xử lý thông tin của người dùng HIỆN TẠI (đang đăng nhập).
 * Để quản lý tất cả users (Admin), xem {@link UserManagementController}.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see UserService
 * @see UserManagementController
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    
    /** Service xử lý logic nghiệp vụ người dùng */
    private final UserService userService;

    /**
     * Constructor khởi tạo UserController với dependency injection.
     * 
     * @param userService Service xử lý nghiệp vụ User
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Lấy thông tin profile của người dùng đang đăng nhập.
     * 
     * <p>Endpoint: GET /api/users/me
     * 
     * <p>Cách xác định user hiện tại:
     * <ol>
     *   <li>Ưu tiên lấy từ SecurityContext (nếu đã authenticated)</li>
     *   <li>Fallback: Parse từ Basic Auth header</li>
     * </ol>
     * 
     * @param authHeader Header Authorization (Basic Auth), tùy chọn
     * @return ResponseEntity chứa:
     *         - Thành công: UserProfileDTO với thông tin user
     *         - Thất bại: HTTP 401 nếu chưa đăng nhập
     */
    @GetMapping(value = "/me", produces = "application/json; charset=UTF-8")
    public ResponseEntity<UserProfileDTO> getMyProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        // Try to get authentication from SecurityContext first
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = null;
        
        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getPrincipal())) {
            username = authentication.getName();
        } else if (authHeader != null && authHeader.startsWith("Basic ")) {
            // Parse Basic Auth header manually
            try {
                String base64Credentials = authHeader.substring(6);
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));
                String[] parts = credentials.split(":", 2);
                if (parts.length == 2) {
                    username = parts[0];
                }
            } catch (Exception e) {
                return ResponseEntity.status(401).build();
            }
        }
        
        if (username == null) {
            return ResponseEntity.status(401).build();
        }
        
        UserProfileDTO profile = userService.getUserProfile(username);
        return ResponseEntity.ok(profile);
    }

    /**
     * Cập nhật thông tin cá nhân của người dùng đang đăng nhập.
     * 
     * <p>Endpoint: PUT /api/users/me
     * 
     * <p>Các trường có thể cập nhật:
     * <ul>
     *   <li>Email (kiểm tra unique)</li>
     *   <li>Số điện thoại (kiểm tra unique)</li>
     *   <li>Địa chỉ</li>
     * </ul>
     * 
     * <p>Lưu ý: Không thể thay đổi username, role, hoặc thông tin nhạy cảm khác.
     * 
     * @param userDetails Thông tin xác thực từ Spring Security
     * @param updateRequest Đối tượng chứa các trường cần cập nhật
     * @return ResponseEntity chứa:
     *         - Thành công: User entity đã được cập nhật (không bao gồm password)
     *         - Thất bại: Thông báo lỗi với HTTP 400
     */
    @PutMapping("/me")
    public ResponseEntity<Object> updateMyProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserSelfUpdateRequest updateRequest) {
        try {
            User updated = userService.updateUserProfile(userDetails.getUsername(), updateRequest);
            updated.setPassword(null); // Don't send password back
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body("❌ Không thể cập nhật thông tin: " + e.getMessage());
        }
    }
}