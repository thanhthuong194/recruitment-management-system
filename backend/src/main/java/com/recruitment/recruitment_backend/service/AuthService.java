package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;

    public AuthService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * ✅ Chức năng ĐĂNG NHẬP
     * @param request chứa username & password
     * @return Thông báo thành công hoặc JWT (nếu sau này dùng JWT)
     */
    public String login(LoginRequest request) {
        try {
            // 1️⃣ Xác thực người dùng bằng AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            // 2️⃣ Lưu Authentication vào SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3️⃣ Trả kết quả (sau này có thể trả JWT)
            return "✅ User logged in successfully: " + request.getUsername();

        } catch (BadCredentialsException ex) {
            // ❌ Nếu sai username hoặc password
            return "❌ Invalid username or password";
        } catch (Exception e) {
            // ❌ Các lỗi khác (vd: user bị disable, error config,…)
            return "❌ Login failed: " + e.getMessage();
        }
    }

    /**
     * ✅ Chức năng QUÊN MẬT KHẨU (tạm thời log ra console)
     */
    public void initiatePasswordReset(String email) {
        // TODO: Có thể kết nối UserRepository để lấy thông tin người dùng
        System.out.println("Password reset initiated for email: " + email);
    }
}
