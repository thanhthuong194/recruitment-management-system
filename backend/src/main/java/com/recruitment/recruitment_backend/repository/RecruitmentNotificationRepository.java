package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.RecruitmentNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface cho entity RecruitmentNotification (Thông báo Tuyển dụng).
 * 
 * <p>Cung cấp các phương thức truy vấn thông báo tuyển dụng.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(RecruitmentNotification) - Lưu thông báo</li>
 *   <li>findById(Integer) - Tìm theo ID</li>
 *   <li>findAll() - Lấy tất cả thông báo</li>
 *   <li>deleteById(Integer) - Xóa thông báo</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.RecruitmentNotification
 */
@Repository
public interface RecruitmentNotificationRepository extends JpaRepository<RecruitmentNotification, Integer> {
    
    /**
     * Lấy danh sách thông báo đang active, sắp xếp theo ngày tạo giảm dần.
     * 
     * <p>Dùng để hiển thị thông báo công khai cho người dùng.
     * 
     * @return Danh sách thông báo active, mới nhất lên đầu
     */
    List<RecruitmentNotification> findByIsActiveTrueOrderByCreatedDateDesc();
    
    /**
     * Kiểm tra xem kế hoạch đã được đăng tin chưa.
     * 
     * <p>Dùng để ngăn việc đăng trùng thông báo cho cùng kế hoạch.
     * 
     * @param planID ID của kế hoạch tuyển dụng
     * @return true nếu đã có thông báo cho kế hoạch, false nếu chưa
     */
    boolean existsByPlanPlanID(Integer planID);
}
