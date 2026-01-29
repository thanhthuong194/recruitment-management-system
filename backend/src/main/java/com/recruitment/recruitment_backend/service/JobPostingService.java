package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.JobPostingDTO;
import com.recruitment.recruitment_backend.model.JobPosting;
import com.recruitment.recruitment_backend.model.JobPosition;
import com.recruitment.recruitment_backend.repository.JobPostingRepository;
import com.recruitment.recruitment_backend.repository.JobPositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service xử lý các chức năng liên quan đến Tin Tuyển dụng (Job Postings).
 * 
 * <p>Cung cấp các phương thức:
 * <ul>
 *   <li>{@link #getAllJobPostings()} - Lấy tất cả tin tuyển dụng</li>
 *   <li>{@link #getActiveJobPostings()} - Lấy tin đang mở</li>
 *   <li>{@link #getJobPostingById(Integer)} - Lấy tin theo ID</li>
 *   <li>{@link #getJobPostingByPlanId(Integer)} - Lấy tin theo Plan ID</li>
 * </ul>
 * 
 * <p>Trạng thái tin tuyển dụng:
 * <ul>
 *   <li>"Đang mở" - Đang nhận hồ sơ</li>
 *   <li>"Đã đóng" - Hết hạn hoặc đã đủ ứng viên</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see JobPostingDTO
 * @see JobPostingRepository
 */
@Service
public class JobPostingService {

    /** Repository truy vấn tin tuyển dụng */
    @Autowired
    private JobPostingRepository jobPostingRepository;

    /** Repository truy vấn vị trí tuyển dụng */
    @Autowired
    private JobPositionRepository jobPositionRepository;

    /**
     * Lấy danh sách tất cả tin tuyển dụng.
     * 
     * @return Danh sách JobPostingDTO (bao gồm cả tin đã đóng)
     */
    public List<JobPostingDTO> getAllJobPostings() {
        return jobPostingRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy danh sách tin tuyển dụng đang mở.
     * 
     * <p>Chỉ trả về tin có status "Đang mở".
     * 
     * @return Danh sách JobPostingDTO đang active
     */
    public List<JobPostingDTO> getActiveJobPostings() {
        return jobPostingRepository.findByStatus("Đang mở").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy tin tuyển dụng theo ID.
     * 
     * @param id ID của tin tuyển dụng
     * @return JobPostingDTO với thông tin chi tiết
     * @throws RuntimeException nếu không tìm thấy
     */
    public JobPostingDTO getJobPostingById(Integer id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found with id: " + id));
        return convertToDTO(jobPosting);
    }

    /**
     * Lấy tin tuyển dụng theo Plan ID.
     * 
     * <p>Sử dụng để liên kết giữa kế hoạch tuyển dụng và tin đăng.
     * 
     * @param planId ID của kế hoạch tuyển dụng
     * @return JobPostingDTO hoặc null nếu không tìm thấy
     */
    public JobPostingDTO getJobPostingByPlanId(Integer planId) {
        return jobPostingRepository.findByPlanPlanID(planId)
                .map(this::convertToDTO)
                .orElse(null);
    }

    /**
     * Chuyển đổi entity JobPosting sang DTO.
     * 
     * <p>Map các trường từ JobPosting và RecruitmentPlan liên quan,
     * bao gồm cả positionID từ JobPosition.
     * 
     * @param jobPosting Entity cần chuyển đổi
     * @return JobPostingDTO đã được map
     */
    private JobPostingDTO convertToDTO(JobPosting jobPosting) {
        JobPostingDTO dto = new JobPostingDTO();
        dto.setPostid(jobPosting.getPostID());
        dto.setTitle(jobPosting.getTitle());
        dto.setStatus(jobPosting.getStatus());
        dto.setCreatedDate(jobPosting.getCreatedDate());
        dto.setDeadline(jobPosting.getDeadline());
        
        if (jobPosting.getPlan() != null) {
            dto.setPlanid(jobPosting.getPlan().getPlanID());
            dto.setPosition(jobPosting.getPlan().getPosition());
            dto.setSchool(jobPosting.getPlan().getSchool());
            dto.setQuantity(jobPosting.getPlan().getQuantity());
            dto.setRequiredCpa(jobPosting.getPlan().getCpa());
            
            // Get first job position for this plan
            List<JobPosition> positions = jobPositionRepository.findByPlanPlanID(jobPosting.getPlan().getPlanID());
            if (!positions.isEmpty()) {
                dto.setPositionID(positions.get(0).getPositionID());
            }
        }
        
        return dto;
    }
}
