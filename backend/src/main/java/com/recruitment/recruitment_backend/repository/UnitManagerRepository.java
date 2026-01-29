package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.UnitManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface cho entity UnitManager (Trưởng Đơn vị).
 * 
 * <p>Cung cấp các phương thức truy vấn thông tin Trưởng đơn vị.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(UnitManager) - Lưu thông tin</li>
 *   <li>findById(Integer) - Tìm theo ID</li>
 *   <li>findAll() - Lấy tất cả</li>
 * </ul>
 * 
 * <p>UnitManager có quyền tạo Kế hoạch Tuyển dụng và quản lý 
 * nhân sự trong đơn vị/khoa của mình.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.UnitManager
 */
@Repository
public interface UnitManagerRepository extends JpaRepository<UnitManager, Integer> {
}
