package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Service xử lý các chức năng xác thực người dùng.
 * 
 * <p>Cung cấp các phương thức:
 * <ul>
 *   <li>{@link #login(LoginRequest)} - Xác thực đăng nhập</li>
 *   <li>{@link #initiatePasswordReset(String)} - Khởi tạo reset password</li>
 * </ul>
 * 
 * <p>Sử dụng Spring Security's AuthenticationManager để xác thực.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see AuthenticationManager
 * @see LoginRequest
 */
@Service
public class AuthService {

    /** Spring Security Authentication Manager */
    private final AuthenticationManager authenticationManager;

    /**
     * Constructor khởi tạo AuthService với dependency injection.
     * 
     * @param authenticationManager Manager xử lý xác thực từ Spring Security
     */
    public AuthService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * ✅ Chức năng ĐĂNG NHẬP - Xác thực người dùng.
     * 
     * <p>Quy trình xác thực:
     * <ol>
     *   <li>Tạo UsernamePasswordAuthenticationToken từ credentials</li>
     *   <li>AuthenticationManager xác thực với UserDetailsService</li>
     *   <li>Nếu thành công, lưu Authentication vào SecurityContext</li>
     *   <li>Trả về thông báo thành công (sau này có thể trả JWT)</li>
     * </ol>
     * 
     * <p>Ví dụ sử dụng:
     * <pre>{@code
     * LoginRequest request = new LoginRequest();
     * request.setUsername("admin");
     * request.setPassword("password123");
     * String result = authService.login(request);
     * // result = "✅ User logged in successfully: admin"
     * }</pre>
     * 
     * @param request Đối tượng chứa username và password
     * @return Thông báo kết quả:
     *         - "✅ User logged in successfully: {username}" nếu thành công
     *         - "❌ Invalid username or password" nếu sai credentials
     *         - "❌ Login failed: {error}" nếu có lỗi khác
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
     * ✅ Chức năng QUÊN MẬT KHẨU - Khởi tạo quy trình reset password.
     * 
     * <p>Hiện tại chỉ log ra console. Trong production cần:
     * <ol>
     *   <li>Kiểm tra email tồn tại trong hệ thống</li>
     *   <li>Tạo reset token với thời hạn</li>
     *   <li>Gửi email chứa link reset password</li>
     * </ol>
     * 
     * <p>TODO: Implement email service và token generation.
     * 
     * @param email Địa chỉ email của người dùng cần reset password
     */
    public void initiatePasswordReset(String email) {
        // TODO: Có thể kết nối UserRepository để lấy thông tin người dùng
        System.out.println("Password reset initiated for email: " + email);
    }
}
