package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.RecruitmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface cho entity RecruitmentPlan (Kế hoạch Tuyển dụng).
 * 
 * <p>Cung cấp các phương thức truy vấn kế hoạch tuyển dụng.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(RecruitmentPlan) - Lưu/cập nhật kế hoạch</li>
 *   <li>findById(Integer) - Tìm theo planID</li>
 *   <li>findAll() - Lấy tất cả kế hoạch</li>
 *   <li>deleteById(Integer) - Xóa kế hoạch</li>
 * </ul>
 * 
 * <p>Workflow trạng thái kế hoạch:
 * <ol>
 *   <li>Pending - Vừa tạo, chờ phê duyệt</li>
 *   <li>Approved - Hiệu trưởng đã duyệt</li>
 *   <li>Rejected - Hiệu trưởng từ chối</li>
 * </ol>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.RecruitmentPlan
 * @see com.recruitment.recruitment_backend.controller.PlansController
 */
@Repository
public interface RecruitmentPlanRepository extends JpaRepository<RecruitmentPlan, Integer> {
}
