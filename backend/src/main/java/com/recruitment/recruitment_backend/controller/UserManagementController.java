package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.CreateUserRequest;
import com.recruitment.recruitment_backend.dto.UserDTO;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.repository.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserManagementController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UserManagementController(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Get all users (Admin only)
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = usersRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        return usersRepository.findById(id)
                .map(user -> ResponseEntity.ok(convertToDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create new user (Admin only - can only create UNIT_MANAGER)
     */
    @PostMapping(consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<Object> createUser(@RequestBody CreateUserRequest request) {
        try {
            // Validate: Only allow creating UNIT_MANAGER
            if (!"UNIT_MANAGER".equals(request.getRole())) {
                return ResponseEntity.badRequest().body("Chỉ được tạo tài khoản UNIT_MANAGER");
            }

            // Check if username already exists
            if (usersRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.badRequest().body("Tên đăng nhập đã tồn tại");
            }

            // Check if email already exists
            if (usersRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest().body("Email đã tồn tại");
            }

            // Check if phone number already exists
            if (usersRepository.existsByPhoneNumber(request.getPhoneNumber())) {
                return ResponseEntity.badRequest().body("Số điện thoại đã tồn tại");
            }

            // Create new user
            User newUser = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .fullName(request.getFullName())
                    .dateOfBirth(request.getDateOfBirth())
                    .phoneNumber(request.getPhoneNumber())
                    .email(request.getEmail())
                    .address(request.getAddress())
                    .role(request.getRole())
                    .sex(request.getSex())
                    .build();

            User savedUser = usersRepository.save(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi tạo người dùng: " + e.getMessage());
        }
    }

    /**
     * Update user
     */
    @PutMapping(value = "/{id}", consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody CreateUserRequest request) {
        try {
            return usersRepository.findById(id)
                    .map(user -> {
                        // Update user fields
                        user.setFullName(request.getFullName());
                        user.setDateOfBirth(request.getDateOfBirth());
                        user.setPhoneNumber(request.getPhoneNumber());
                        user.setEmail(request.getEmail());
                        user.setAddress(request.getAddress());
                        user.setSex(request.getSex());

                        // Update password if provided
                        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
                            user.setPassword(passwordEncoder.encode(request.getPassword()));
                        }

                        User updatedUser = usersRepository.save(user);
                        return ResponseEntity.<Object>ok(convertToDTO(updatedUser));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi cập nhật người dùng: " + e.getMessage());
        }
    }

    /**
     * Delete user (Only allow deleting UNIT_MANAGER)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        try {
            return usersRepository.findById(id)
                    .map(user -> {
                        // Only allow deleting UNIT_MANAGER accounts
                        if (!"UNIT_MANAGER".equals(user.getRole())) {
                            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                    .body("Chỉ được phép xóa tài khoản Trưởng đơn vị (UNIT_MANAGER)");
                        }
                        usersRepository.deleteById(id);
                        return ResponseEntity.ok("Xóa người dùng thành công");
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi xóa người dùng: " + e.getMessage());
        }
    }

    /**
     * Convert User entity to DTO (without password)
     */
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .userID(user.getUserID())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .dateOfBirth(user.getDateOfBirth())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .address(user.getAddress())
                .role(user.getRole())
                .sex(user.getSex())
                .build();
    }
}
