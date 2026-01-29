package com.recruitment.recruitment_backend.security;

import com.recruitment.recruitment_backend.model.User;
import com.recruitment.recruitment_backend.repository.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service tùy chỉnh để load thông tin người dùng cho Spring Security.
 * 
 * <p>Implement UserDetailsService để tích hợp với Spring Security
 * authentication mechanism.
 * 
 * <p>Quy trình xác thực:
 * <ol>
 *   <li>Người dùng gửi username/password</li>
 *   <li>Spring Security gọi loadUserByUsername()</li>
 *   <li>So sánh password với BCrypt encoder</li>
 *   <li>Trả về UserDetails nếu thành công</li>
 * </ol>
 * 
 * <p>Lưu ý: User trong hệ thống có sẵn role, không cần tải thêm
 * từ bảng role riêng.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see org.springframework.security.core.userdetails.UserDetailsService
 * @see com.recruitment.recruitment_backend.model.User
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    /** Repository để truy vấn thông tin User */
    private final UsersRepository usersRepository;

    /**
     * Constructor injection UsersRepository.
     * 
     * @param usersRepository Repository để truy vấn User
     */
    public CustomUserDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * Load thông tin người dùng theo username.
     * 
     * <p>Phương thức này được Spring Security gọi tự động
     * trong quá trình xác thực.
     * 
     * <p>Chuyển đổi User entity thành Spring Security UserDetails:
     * <ul>
     *   <li>username → username</li>
     *   <li>password (BCrypt hash) → password</li>
     *   <li>role → authorities (với prefix ROLE_)</li>
     * </ul>
     * 
     * @param username Tên đăng nhập cần tìm
     * @return UserDetails chứa thông tin xác thực
     * @throws UsernameNotFoundException Nếu không tìm thấy user
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}
