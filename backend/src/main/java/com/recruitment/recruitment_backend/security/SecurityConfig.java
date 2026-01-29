package com.recruitment.recruitment_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.io.IOException;

/**
 * Cấu hình Spring Security cho ứng dụng.
 * 
 * <p>Class này cấu hình toàn bộ các khía cạnh bảo mật:
 * <ul>
 *   <li>CORS - Cross-Origin Resource Sharing</li>
 *   <li>CSRF - Tắt vì sử dụng stateless API</li>
 *   <li>Session - Stateless (không lưu session)</li>
 *   <li>Password Encoding - BCrypt</li>
 * </ul>
 * 
 * <p>Cấu hình CORS cho phép:
 * <ul>
 *   <li>Origins: localhost:3000 (React frontend)</li>
 *   <li>Methods: GET, POST, PUT, DELETE, OPTIONS</li>
 *   <li>Headers: Authorization, Content-Type, Accept</li>
 * </ul>
 * 
 * <p>Lưu ý: Hiện tại cấu hình cho phép tất cả requests (permitAll)
 * để dễ development. Trong production cần cấu hình lại phân quyền.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Tạo bean PasswordEncoder sử dụng BCrypt.
     * 
     * <p>BCrypt là thuật toán mã hóa mật khẩu an toàn,
     * tự động thêm salt và có cost factor có thể điều chỉnh.
     * 
     * @return BCryptPasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Tạo bean AuthenticationManager từ cấu hình.
     * 
     * <p>AuthenticationManager được sử dụng trong AuthController
     * để xác thực thông tin đăng nhập.
     * 
     * @param authConfig Cấu hình authentication
     * @return AuthenticationManager instance
     * @throws Exception Nếu không thể tạo AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    /**
     * Cấu hình Security Filter Chain.
     * 
     * <p>Thiết lập các quy tắc bảo mật:
     * <ul>
     *   <li>CORS: Cho phép từ các origin đã cấu hình</li>
     *   <li>CSRF: Tắt (REST API stateless)</li>
     *   <li>Session: Stateless (không tạo HTTP session)</li>
     *   <li>Authorization: Hiện tại permitAll()</li>
     * </ul>
     * 
     * @param http HttpSecurity builder
     * @return SecurityFilterChain đã cấu hình
     * @throws Exception Nếu có lỗi cấu hình
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            .csrf(csrf -> csrf.disable())
            
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // Temporarily allow all requests
            )
            
            // Disable automatic HTTP Basic authentication since we parse it manually in UserController
            // .httpBasic(httpBasic -> {
            //     // Enable HTTP Basic authentication
            // })
            
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, ex) -> {
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write("{\"error\": \"Unauthorized\"}");
                })
            );

        return http.build();
    }

    /**
     * Cấu hình CORS (Cross-Origin Resource Sharing).
     * 
     * <p>Cho phép React frontend (localhost:3000) gọi API.
     * 
     * <p>Cấu hình chi tiết:
     * <ul>
     *   <li>Allowed Origins: localhost:3000, 127.0.0.1:3000</li>
     *   <li>Allowed Methods: GET, POST, PUT, DELETE, OPTIONS</li>
     *   <li>Allowed Headers: Authorization, Content-Type, Accept</li>
     *   <li>Allow Credentials: true (cho phép gửi cookies/auth)</li>
     *   <li>Exposed Headers: Authorization</li>
     * </ul>
     * 
     * @return CorsConfigurationSource đã cấu hình
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        )); 

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "Accept"
        )); 
        
        configuration.setAllowCredentials(true); 
        
        configuration.setExposedHeaders(Arrays.asList(
            "Authorization"
        ));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration); 
        return source;
    }
}