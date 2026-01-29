package com.recruitment.recruitment_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recruitment.recruitment_backend.model.User;

/**
 * Repository interface chính cho entity User.
 * 
 * <p>Cung cấp các phương thức truy vấn User trong hệ thống,
 * bao gồm cả kiểm tra tồn tại (exists methods).
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(User) - Lưu/cập nhật user</li>
 *   <li>findById(Integer) - Tìm theo userID</li>
 *   <li>findAll() - Lấy tất cả users</li>
 *   <li>deleteById(Integer) - Xóa user</li>
 * </ul>
 * 
 * <p>Lưu ý: Repository này sử dụng ID kiểu Integer, 
 * khác với UserRepository (Long).
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.User
 * @see com.recruitment.recruitment_backend.service.UserService
 */
@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {
    
    /**
     * Tìm user theo tên đăng nhập.
     * 
     * @param username Tên đăng nhập cần tìm
     * @return Optional chứa User nếu tìm thấy
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Tìm user theo email.
     * 
     * @param email Email cần tìm
     * @return Optional chứa User nếu tìm thấy
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Tìm user theo số điện thoại.
     * 
     * @param phoneNumber Số điện thoại cần tìm
     * @return Optional chứa User nếu tìm thấy
     */
    Optional<User> findByPhoneNumber(String phoneNumber);

    /**
     * Kiểm tra username đã tồn tại chưa.
     * 
     * <p>Dùng khi validate tạo user mới.
     * 
     * @param username Tên đăng nhập cần kiểm tra
     * @return true nếu đã tồn tại, false nếu chưa
     */
    boolean existsByUsername(String username);
    
    /**
     * Kiểm tra email đã tồn tại chưa.
     * 
     * <p>Dùng khi validate tạo user mới.
     * 
     * @param email Email cần kiểm tra
     * @return true nếu đã tồn tại, false nếu chưa
     */
    boolean existsByEmail(String email);
    
    /**
     * Kiểm tra số điện thoại đã tồn tại chưa.
     * 
     * <p>Dùng khi validate tạo user mới.
     * 
     * @param phoneNumber Số điện thoại cần kiểm tra
     * @return true nếu đã tồn tại, false nếu chưa
     */
    boolean existsByPhoneNumber(String phoneNumber);
}
