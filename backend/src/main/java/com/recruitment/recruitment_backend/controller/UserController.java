package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.UserSelfUpdateRequest;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByUsername(userDetails.getUsername());
        user.setPassword(null); // Don't send password back
        return ResponseEntity.ok(user);
    }

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