package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.LoginRequest;
import com.recruitment.recruitment_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * ✅ API ĐĂNG NHẬP
     * @param loginRequest username + password
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            String response = authService.login(loginRequest);

            // Nếu AuthService trả lỗi, gửi HTTP 401
            if (response.startsWith("❌")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Login failed: " + e.getMessage());
        }
    }

    /**
     * API QUÊN MẬT KHẨU
     * @param email 
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
     * ✅ API ĐĂNG XUẤT (tạm thời mock, sau này nếu dùng JWT sẽ chỉ cần xóa token client)
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("✅ Logged out successfully");
    }
}
