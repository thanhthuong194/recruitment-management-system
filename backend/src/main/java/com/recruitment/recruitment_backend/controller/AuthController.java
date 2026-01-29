package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.LoginRequest;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.repository.UserRepository;
import com.recruitment.recruitment_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

/**
 * Controller xử lý các chức năng xác thực người dùng.
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>Đăng nhập (Login)</li>
 *   <li>Quên mật khẩu (Forgot Password)</li>
 *   <li>Đăng xuất (Logout)</li>
 * </ul>
 * 
 * <p>Base URL: /api/auth
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see AuthService
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    /** Service xử lý logic xác thực */
    private final AuthService authService;
    
    /** Repository truy vấn thông tin người dùng */
    private final UserRepository userRepository;

    /**
     * Constructor khởi tạo AuthController với dependency injection.
     * 
     * @param authService Service xử lý xác thực
     * @param userRepository Repository truy vấn User
     */
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    /**
     * ✅ API ĐĂNG NHẬP - Xác thực người dùng và trả về thông tin đăng nhập.
     * 
     * <p>Endpoint: POST /api/auth/login
     * 
     * <p>Luồng xử lý:
     * <ol>
     *   <li>Nhận username và password từ request body</li>
     *   <li>Xác thực thông tin đăng nhập qua AuthService</li>
     *   <li>Nếu thành công, trả về access token và thông tin user</li>
     *   <li>Nếu thất bại, trả về mã lỗi 401 Unauthorized</li>
     * </ol>
     * 
     * @param loginRequest Đối tượng chứa username và password
     * @return ResponseEntity chứa:
     *         - Thành công: accessToken, tokenType, expiresIn, user info
     *         - Thất bại: Thông báo lỗi với HTTP 401/500
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        try {
            String response = authService.login(loginRequest);

            if (response.startsWith("❌")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Get user from database to retrieve actual role
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Build a JSON response compatible with the frontend ApiClient's AuthResponse model
            Map<String, Object> body = new HashMap<>();
            body.put("accessToken", "dummy-token-for-" + loginRequest.getUsername());
            body.put("tokenType", "Bearer");
            body.put("expiresIn", 3600);

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("username", user.getUsername());
            userMap.put("name", user.getFullName());
            userMap.put("role", user.getRole()); // Use actual role from database

            body.put("user", userMap);

            return ResponseEntity.ok(body);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Login failed: " + e.getMessage());
        }
    }

    /**
     * API QUÊN MẬT KHẨU - Gửi link reset mật khẩu qua email.
     * 
     * <p>Endpoint: POST /api/auth/forgot-password?email=xxx
     * 
     * <p>Luồng xử lý:
     * <ol>
     *   <li>Nhận email từ query parameter</li>
     *   <li>Gọi AuthService để khởi tạo quá trình reset password</li>
     *   <li>Gửi email chứa link reset (TODO: implement email service)</li>
     * </ol>
     * 
     * @param email Địa chỉ email của người dùng cần reset mật khẩu
     * @return ResponseEntity với thông báo:
     *         - Thành công: "Password reset link sent to: {email}"
     *         - Thất bại: Thông báo lỗi với HTTP 500
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        try {
            authService.initiatePasswordReset(email);
            return ResponseEntity.ok("✅ Password reset link sent to: " + email);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Failed to process password reset: " + e.getMessage());
        }
    }

    /**
     * API ĐĂNG XUẤT - Kết thúc phiên đăng nhập của người dùng.
     * 
     * <p>Endpoint: POST /api/auth/logout
     * 
     * <p>Lưu ý: Hiện tại sử dụng stateless authentication nên endpoint này
     * chỉ trả về thông báo thành công. Client cần tự xóa token ở phía client.
     * 
     * @return ResponseEntity với thông báo đăng xuất thành công
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("✅ Logged out successfully");
    }
}
