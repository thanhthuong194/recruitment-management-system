package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface cho entity JobPosition (Vị trí Tuyển dụng).
 * 
 * <p>Cung cấp các phương thức truy vấn vị trí tuyển dụng.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(JobPosition) - Lưu vị trí</li>
 *   <li>findById(Integer) - Tìm theo positionID</li>
 *   <li>findAll() - Lấy tất cả vị trí</li>
 * </ul>
 * 
 * <p>JobPosition liên kết với RecruitmentPlan và được sử dụng
 * khi ứng viên nộp đơn ứng tuyển.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.JobPosition
 */
@Repository
public interface JobPositionRepository extends JpaRepository<JobPosition, Integer> {
    
    /**
     * Tìm tất cả vị trí thuộc một kế hoạch tuyển dụng.
     * 
     * <p>Một kế hoạch có thể có nhiều vị trí tuyển dụng khác nhau.
     * 
     * @param planID ID của kế hoạch tuyển dụng
     * @return Danh sách các vị trí thuộc kế hoạch
     */
    List<JobPosition> findByPlanPlanID(Integer planID);
}
