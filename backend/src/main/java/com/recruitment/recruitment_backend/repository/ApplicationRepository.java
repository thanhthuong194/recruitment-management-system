package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface cho entity Application (Đơn Ứng tuyển).
 * 
 * <p>Cung cấp các phương thức truy vấn đơn ứng tuyển.
 * 
 * <p>Các phương thức CRUD cơ bản được kế thừa từ JpaRepository:
 * <ul>
 *   <li>save(Application) - Lưu đơn ứng tuyển</li>
 *   <li>findById(Integer) - Tìm theo applicationID</li>
 *   <li>findAll() - Lấy tất cả đơn</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see com.recruitment.recruitment_backend.model.Application
 * @see com.recruitment.recruitment_backend.service.ApplicationService
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    
    /**
     * Tìm tất cả đơn ứng tuyển của một ứng viên.
     * 
     * <p>Sử dụng query method naming convention để truy vấn nested property.
     * 
     * @param candidateID ID của ứng viên
     * @return Danh sách đơn ứng tuyển của ứng viên
     */
    List<Application> findByCandidateCandidateID(Integer candidateID);
    
    /**
     * Tìm tất cả đơn ứng tuyển theo trạng thái.
     * 
     * <p>Các trạng thái hợp lệ: Pending, Reviewing, Accepted, Rejected.
     * 
     * @param status Trạng thái cần lọc
     * @return Danh sách đơn ứng tuyển có trạng thái tương ứng
     */
    List<Application> findByStatus(String status);
    
    /**
     * Xóa tất cả đơn ứng tuyển của một ứng viên.
     * 
     * @param candidateID ID của ứng viên
     */
    void deleteByCandidateCandidateID(Integer candidateID);
}
