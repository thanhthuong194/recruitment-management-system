package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface cho entity Candidate (Ứng viên).
 * 
 * <p>Cung cấp các phương thức truy vấn ứng viên trong hệ thống.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(Candidate) - Lưu/cập nhật ứng viên</li>
 *   <li>findById(Integer) - Tìm theo candidateID</li>
 *   <li>findAll() - Lấy tất cả ứng viên</li>
 *   <li>deleteById(Integer) - Xóa ứng viên</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.Candidate
 * @see com.recruitment.recruitment_backend.service.CandidateService
 */
@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    
    /**
     * Tìm ứng viên theo email.
     * 
     * <p>Dùng để kiểm tra trùng lặp khi tạo mới.
     * 
     * @param email Email cần tìm
     * @return Optional chứa Candidate nếu tìm thấy
     */
    Optional<Candidate> findByEmail(String email);
    
    /**
     * Tìm ứng viên theo số điện thoại.
     * 
     * <p>Dùng để kiểm tra trùng lặp khi tạo mới.
     * 
     * @param phone Số điện thoại cần tìm
     * @return Optional chứa Candidate nếu tìm thấy
     */
    Optional<Candidate> findByPhone(String phone);
}
