package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.UserProfileDTO;
import com.recruitment.recruitment_backend.dto.UserSelfUpdateRequest;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.model.UnitManager;
import com.recruitment.recruitment_backend.repository.UserRepository;
import com.recruitment.recruitment_backend.repository.UnitManagerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service xử lý các chức năng liên quan đến thông tin người dùng.
 * 
 * <p>Cung cấp các phương thức:
 * <ul>
 *   <li>{@link #getUserByUsername(String)} - Lấy User entity theo username</li>
 *   <li>{@link #getUserProfile(String)} - Lấy profile DTO của user</li>
 *   <li>{@link #updateUserProfile(String, UserSelfUpdateRequest)} - Cập nhật thông tin cá nhân</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see UserProfileDTO
 * @see UserRepository
 */
@Service
public class UserService {
    
    /** Repository truy vấn thông tin người dùng */
    private final UserRepository userRepository;
    
    /** Repository truy vấn thông tin trưởng đơn vị */
    private final UnitManagerRepository unitManagerRepository;

    /**
     * Constructor khởi tạo UserService với dependency injection.
     * 
     * @param userRepository Repository xử lý User
     * @param unitManagerRepository Repository xử lý UnitManager
     */
    public UserService(UserRepository userRepository, UnitManagerRepository unitManagerRepository) {
        this.userRepository = userRepository;
        this.unitManagerRepository = unitManagerRepository;
    }

    /**
     * Lấy User entity theo username.
     * 
     * @param username Tên đăng nhập của user
     * @return User entity
     * @throws RuntimeException nếu không tìm thấy user
     */
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

    /**
     * Lấy thông tin profile của người dùng dưới dạng DTO.
     * 
     * <p>Nếu user có role UNIT_MANAGER, sẽ bổ sung thêm:
     * <ul>
     *   <li>department - Phòng ban</li>
     *   <li>position - Chức vụ</li>
     * </ul>
     * 
     * @param username Tên đăng nhập của user
     * @return UserProfileDTO chứa thông tin profile
     */
    public UserProfileDTO getUserProfile(String username) {
        User user = getUserByUsername(username);
        
        UserProfileDTO.UserProfileDTOBuilder builder = UserProfileDTO.builder()
                .userID(user.getUserID())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .dateOfBirth(user.getDateOfBirth())
                .sex(user.getSex())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .address(user.getAddress())
                .role(user.getRole());
        
        // If user is UNIT_MANAGER, get department and position
        if ("UNIT_MANAGER".equals(user.getRole())) {
            unitManagerRepository.findById(user.getUserID()).ifPresent(um -> {
                builder.department(um.getDepartment());
                builder.position(um.getPosition());
            });
        }
        
        return builder.build();
    }

    /**
     * Cập nhật thông tin cá nhân của người dùng.
     * 
     * <p>Các trường có thể cập nhật:
     * <ul>
     *   <li>email - Kiểm tra không trùng với user khác</li>
     *   <li>phone - Kiểm tra không trùng với user khác</li>
     *   <li>address - Địa chỉ</li>
     * </ul>
     * 
     * <p>Lưu ý: Phương thức này chạy trong transaction.
     * 
     * @param username Tên đăng nhập của user cần cập nhật
     * @param updateRequest Thông tin cần cập nhật
     * @return User entity đã được cập nhật
     * @throws RuntimeException nếu email hoặc phone đã được sử dụng
     */
    @Transactional
    public User updateUserProfile(String username, UserSelfUpdateRequest updateRequest) {
        User user = getUserByUsername(username);

        // Validate email uniqueness if changed
        if (!user.getEmail().equals(updateRequest.getEmail())) {
            userRepository.findByEmail(updateRequest.getEmail()).ifPresent(u -> {
                throw new RuntimeException("Email đã được sử dụng");
            });
        }

        // Validate phone uniqueness if changed
        if (!user.getPhoneNumber().equals(updateRequest.getPhone())) {
            userRepository.findByPhoneNumber(updateRequest.getPhone()).ifPresent(u -> {
                throw new RuntimeException("Số điện thoại đã được sử dụng");
            });
        }

        // Update fields
        user.setEmail(updateRequest.getEmail());
        user.setPhoneNumber(updateRequest.getPhone());
        user.setAddress(updateRequest.getAddress());

        return userRepository.save(user);
    }
}