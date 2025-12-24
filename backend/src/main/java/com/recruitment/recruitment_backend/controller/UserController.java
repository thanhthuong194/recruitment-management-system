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

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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