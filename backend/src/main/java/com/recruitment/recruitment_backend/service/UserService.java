package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.UserProfileDTO;
import com.recruitment.recruitment_backend.dto.UserSelfUpdateRequest;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.model.UnitManager;
import com.recruitment.recruitment_backend.repository.UserRepository;
import com.recruitment.recruitment_backend.repository.UnitManagerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final UnitManagerRepository unitManagerRepository;

    public UserService(UserRepository userRepository, UnitManagerRepository unitManagerRepository) {
        this.userRepository = userRepository;
        this.unitManagerRepository = unitManagerRepository;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

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