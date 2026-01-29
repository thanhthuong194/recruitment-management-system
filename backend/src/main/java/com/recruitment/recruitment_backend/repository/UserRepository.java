package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface cho entity User.
 * 
 * <p>Kế thừa JpaRepository cung cấp sẵn các phương thức CRUD:
 * <ul>
 *   <li>save(User) - Lưu/cập nhật user</li>
 *   <li>findById(Long) - Tìm theo ID</li>
 *   <li>findAll() - Lấy tất cả users</li>
 *   <li>deleteById(Long) - Xóa theo ID</li>
 * </ul>
 * 
 * <p>Lưu ý: Repository này sử dụng ID kiểu Long, khác với UsersRepository (Integer).
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.User
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Tìm user theo tên đăng nhập.
     * 
     * @param username Tên đăng nhập cần tìm
     * @return Optional chứa User nếu tìm thấy, empty nếu không
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Tìm user theo email.
     * 
     * @param email Email cần tìm
     * @return Optional chứa User nếu tìm thấy, empty nếu không
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Tìm user theo số điện thoại.
     * 
     * @param phoneNumber Số điện thoại cần tìm
     * @return Optional chứa User nếu tìm thấy, empty nếu không
     */
    Optional<User> findByPhoneNumber(String phoneNumber);
}