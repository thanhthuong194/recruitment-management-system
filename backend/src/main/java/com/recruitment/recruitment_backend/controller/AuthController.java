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

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    /**
     * ✅ API ĐĂNG NHẬP
     * @param loginRequest username + password
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

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("✅ Logged out successfully");
    }
}
