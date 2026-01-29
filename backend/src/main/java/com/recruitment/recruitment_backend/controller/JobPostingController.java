package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.JobPostingDTO;
import com.recruitment.recruitment_backend.service.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller quản lý Tin Tuyển dụng (Job Postings).
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>GET /api/jobs/public - Lấy tin tuyển dụng đang mở (Public)</li>
 *   <li>GET /api/jobs/public/{id} - Lấy chi tiết tin theo ID (Public)</li>
 *   <li>GET /api/jobs/public/by-plan/{planId} - Lấy tin theo Plan ID (Public)</li>
 *   <li>GET /api/jobs - Lấy tất cả tin (Authenticated)</li>
 * </ul>
 * 
 * <p>Trạng thái tin tuyển dụng:
 * <ul>
 *   <li>"Đang mở" - Tin đang tuyển</li>
 *   <li>"Đã đóng" - Hết hạn hoặc đã đủ ứng viên</li>
 * </ul>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see JobPostingService
 * @see JobPostingDTO
 */
@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobPostingController {

    /** Service xử lý logic nghiệp vụ tin tuyển dụng */
    @Autowired
    private JobPostingService jobPostingService;

    /**
     * Lấy danh sách tin tuyển dụng đang mở (Public API).
     * 
     * <p>Endpoint: GET /api/jobs/public
     * 
     * <p>Chỉ trả về tin có status "Đang mở".
     * 
     * @return ResponseEntity chứa danh sách JobPostingDTO đang active
     */
    @GetMapping(value = "/public", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<JobPostingDTO>> getActiveJobPostings() {
        List<JobPostingDTO> jobs = jobPostingService.getActiveJobPostings();
        return ResponseEntity.ok(jobs);
    }

    /**
     * Lấy chi tiết tin tuyển dụng theo ID (Public API).
     * 
     * <p>Endpoint: GET /api/jobs/public/{id}
     * 
     * @param id ID của tin tuyển dụng
     * @return ResponseEntity chứa:
     *         - Thành công: JobPostingDTO với thông tin chi tiết
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @GetMapping(value = "/public/{id}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getJobPostingById(@PathVariable Integer id) {
        try {
            JobPostingDTO job = jobPostingService.getJobPostingById(id);
            return ResponseEntity.ok(job);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Lấy tin tuyển dụng theo Plan ID (Public API).
     * 
     * <p>Endpoint: GET /api/jobs/public/by-plan/{planId}
     * 
     * <p>Sử dụng để liên kết tin tuyển dụng với kế hoạch tuyển dụng.
     * 
     * @param planId ID của kế hoạch tuyển dụng
     * @return ResponseEntity chứa:
     *         - Thành công: JobPostingDTO
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @GetMapping(value = "/public/by-plan/{planId}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getJobPostingByPlanId(@PathVariable Integer planId) {
        try {
            JobPostingDTO job = jobPostingService.getJobPostingByPlanId(planId);
            if (job != null) {
                return ResponseEntity.ok(job);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Lấy tất cả tin tuyển dụng (Authenticated API).
     * 
     * <p>Endpoint: GET /api/jobs
     * 
     * <p>Trả về toàn bộ tin, bao gồm cả tin đã đóng.
     * Dành cho người dùng đã đăng nhập (HR, Admin, Rector).
     * 
     * @return ResponseEntity chứa danh sách tất cả JobPostingDTO
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<JobPostingDTO>> getAllJobPostings() {
        List<JobPostingDTO> jobs = jobPostingService.getAllJobPostings();
        return ResponseEntity.ok(jobs);
    }
}
