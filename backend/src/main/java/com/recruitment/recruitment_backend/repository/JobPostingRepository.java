package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface cho entity JobPosting (Bài đăng Tuyển dụng).
 * 
 * <p>Cung cấp các phương thức truy vấn bài đăng tuyển dụng.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(JobPosting) - Lưu bài đăng</li>
 *   <li>findById(Integer) - Tìm theo postID</li>
 *   <li>findAll() - Lấy tất cả bài đăng</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.JobPosting
 * @see com.recruitment.recruitment_backend.service.JobPostingService
 */
@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Integer> {
    
    /**
     * Tìm tất cả bài đăng theo trạng thái.
     * 
     * <p>Các trạng thái hợp lệ: Active, Closed, Draft.
     * 
     * @param status Trạng thái cần lọc
     * @return Danh sách bài đăng có trạng thái tương ứng
     */
    List<JobPosting> findByStatus(String status);
    
    /**
     * Tìm bài đăng theo kế hoạch tuyển dụng.
     * 
     * <p>Mỗi kế hoạch chỉ có tối đa 1 bài đăng.
     * 
     * @param planId ID của kế hoạch tuyển dụng
     * @return Optional chứa JobPosting nếu tìm thấy
     */
    Optional<JobPosting> findByPlanPlanID(Integer planId);
}
