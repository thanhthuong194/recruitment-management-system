package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.UserSelfUpdateRequest;
import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
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