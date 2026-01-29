package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.CreateUserRequest;
import com.recruitment.recruitment_backend.dto.UserDTO;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.model.UnitManager;
import com.recruitment.recruitment_backend.repository.UsersRepository;
import com.recruitment.recruitment_backend.repository.UnitManagerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller quản lý Người dùng hệ thống (Admin Functions).
 * 
 * <p>Cung cấp các API endpoint CRUD cho quản lý user:
 * <ul>
 *   <li>GET /api/users - Lấy danh sách tất cả users (Admin)</li>
 *   <li>GET /api/users/{id} - Lấy user theo ID</li>
 *   <li>POST /api/users - Tạo user mới (chỉ UNIT_MANAGER)</li>
 *   <li>PUT /api/users/{id} - Cập nhật user</li>
 *   <li>DELETE /api/users/{id} - Xóa user (chỉ UNIT_MANAGER)</li>
 * </ul>
 * 
 * <p>Quyền hạn:
 * <ul>
 *   <li>Admin: Quản lý tất cả users</li>
 *   <li>Giới hạn: Chỉ được tạo/xóa tài khoản UNIT_MANAGER</li>
 * </ul>
 * 
 * <p>Lưu ý: Controller này khác với {@link UserController} - xử lý thông tin cá nhân.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see UserController
 * @see UserDTO
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserManagementController {

    /** Repository truy vấn users */
    private final UsersRepository usersRepository;
    
    /** Repository truy vấn UnitManager */
    private final UnitManagerRepository unitManagerRepository;
    
    /** Encoder để mã hóa password */
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor khởi tạo UserManagementController với dependency injection.
     * 
     * @param usersRepository Repository xử lý User
     * @param unitManagerRepository Repository xử lý UnitManager
     * @param passwordEncoder Password encoder cho BCrypt
     */
    public UserManagementController(UsersRepository usersRepository, 
                                   UnitManagerRepository unitManagerRepository,
                                   PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.unitManagerRepository = unitManagerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Lấy danh sách tất cả người dùng (Admin only).
     * 
     * <p>Endpoint: GET /api/users
     * 
     * @return ResponseEntity chứa danh sách UserDTO (không bao gồm password)
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = usersRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    /**
     * Lấy thông tin người dùng theo ID.
     * 
     * <p>Endpoint: GET /api/users/{id}
     * 
     * @param id ID của user cần lấy
     * @return ResponseEntity chứa:
     *         - Thành công: UserDTO
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
        return usersRepository.findById(id)
                .map(user -> ResponseEntity.ok(convertToDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Tạo người dùng mới (Admin only - chỉ tạo được UNIT_MANAGER).
     * 
     * <p>Endpoint: POST /api/users
     * 
     * <p>Quy trình:
     * <ol>
     *   <li>Validate role = UNIT_MANAGER</li>
     *   <li>Validate các trường bắt buộc (department, position)</li>
     *   <li>Kiểm tra trùng username, email, phone</li>
     *   <li>Mã hóa password với BCrypt</li>
     *   <li>Tạo User và UnitManager record</li>
     * </ol>
     * 
     * @param request Thông tin user cần tạo
     * @return ResponseEntity chứa:
     *         - Thành công: UserDTO đã tạo với HTTP 201
     *         - Thất bại: Thông báo lỗi với HTTP 400/500
     */
    @PostMapping(consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<Object> createUser(@RequestBody CreateUserRequest request) {
        try {
            // Validate: Only allow creating UNIT_MANAGER
            if (!"UNIT_MANAGER".equals(request.getRole())) {
                return ResponseEntity.badRequest().body("Chỉ được tạo tài khoản UNIT_MANAGER");
            }

            // Validate required fields for UNIT_MANAGER
            if (request.getDepartment() == null || request.getDepartment().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Phòng ban là bắt buộc");
            }
            if (request.getPosition() == null || request.getPosition().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Chức vụ là bắt buộc");
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

            // Create UnitManager record
            UnitManager unitManager = UnitManager.builder()
                    .user(savedUser)
                    .department(request.getDepartment())
                    .position(request.getPosition())
                    .build();
            unitManagerRepository.save(unitManager);

            return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi tạo người dùng: " + e.getMessage());
        }
    }

    /**
     * Cập nhật thông tin người dùng.
     * 
     * <p>Endpoint: PUT /api/users/{id}
     * 
     * <p>Có thể cập nhật: fullName, dateOfBirth, phoneNumber, email, address, sex
     * <p>Password chỉ được cập nhật nếu có giá trị mới trong request
     * 
     * @param id ID của user cần cập nhật
     * @param request Thông tin cần cập nhật
     * @return ResponseEntity chứa:
     *         - Thành công: UserDTO đã cập nhật
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     *         - Thất bại: Thông báo lỗi với HTTP 500
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
     * Xóa người dùng (chỉ được xóa UNIT_MANAGER).
     * 
     * <p>Endpoint: DELETE /api/users/{id}
     * 
     * <p>Giới hạn: Chỉ có thể xóa tài khoản có role = UNIT_MANAGER.
     * Không thể xóa Admin, Rector, HR để đảm bảo tính toàn vẹn hệ thống.
     * 
     * @param id ID của user cần xóa
     * @return ResponseEntity chứa:
     *         - Thành công: "Xóa người dùng thành công"
     *         - Thất bại: HTTP 403 nếu không phải UNIT_MANAGER
     *         - Thất bại: HTTP 404 nếu không tìm thấy
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
     * Chuyển đổi entity User sang DTO (loại bỏ password).
     * 
     * <p>Phương thức helper để map các trường từ entity sang response DTO,
     * đảm bảo không trả về password cho client.
     * 
     * @param user Entity User cần chuyển đổi
     * @return UserDTO đã được map (không có password)
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
