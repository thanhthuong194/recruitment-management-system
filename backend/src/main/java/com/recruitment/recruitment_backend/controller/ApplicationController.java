package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.ApplicationDTO;
import com.recruitment.recruitment_backend.dto.ApplicationSubmitRequest;
import com.recruitment.recruitment_backend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller quản lý Hồ sơ Ứng tuyển (Applications).
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>POST /api/applications/submit - Nộp hồ sơ ứng tuyển (Public)</li>
 *   <li>GET /api/applications - Lấy tất cả hồ sơ (HR/Admin/Rector)</li>
 *   <li>GET /api/applications/status/{status} - Lọc hồ sơ theo trạng thái</li>
 *   <li>PUT /api/applications/{id}/status - Cập nhật trạng thái hồ sơ</li>
 * </ul>
 * 
 * <p>Workflow trạng thái hồ sơ:
 * <pre>
 * Đang xét → Đạt / Không đạt
 * </pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see ApplicationService
 * @see ApplicationDTO
 */
@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    /** Service xử lý logic nghiệp vụ hồ sơ ứng tuyển */
    @Autowired
    private ApplicationService applicationService;

    /**
     * Nộp hồ sơ ứng tuyển (Public API - không cần đăng nhập).
     * 
     * <p>Endpoint: POST /api/applications/submit
     * 
     * <p>Quy trình:
     * <ol>
     *   <li>Tạo hoặc lấy thông tin Candidate từ email</li>
     *   <li>Liên kết với JobPosition</li>
     *   <li>Tạo Application với status "Đang xét"</li>
     * </ol>
     * 
     * @param request Thông tin hồ sơ ứng tuyển (fullName, email, phone, cvPath, etc.)
     * @return ResponseEntity chứa:
     *         - Thành công: { message, data: ApplicationDTO }
     *         - Thất bại: { error: message } với HTTP 400
     */
    @PostMapping(value = "/submit", produces = "application/json; charset=UTF-8", consumes = "application/json; charset=UTF-8")
    public ResponseEntity<?> submitApplication(@RequestBody ApplicationSubmitRequest request) {
        try {
            ApplicationDTO application = applicationService.submitApplication(request);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Nộp hồ sơ thành công!");
            response.put("data", application);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Lấy danh sách tất cả hồ sơ ứng tuyển (HR/Admin/Rector).
     * 
     * <p>Endpoint: GET /api/applications
     * 
     * @return ResponseEntity chứa danh sách ApplicationDTO
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    /**
     * Lấy danh sách hồ sơ theo trạng thái.
     * 
     * <p>Endpoint: GET /api/applications/status/{status}
     * 
     * <p>Các trạng thái: "Đang xét", "Đạt", "Không đạt"
     * 
     * @param status Trạng thái cần lọc
     * @return ResponseEntity chứa danh sách ApplicationDTO theo trạng thái
     */
    @GetMapping(value = "/status/{status}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStatus(@PathVariable String status) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }

    /**
     * Cập nhật trạng thái hồ sơ ứng tuyển (Chỉ HR).
     * 
     * <p>Endpoint: PUT /api/applications/{id}/status
     * 
     * <p>Sử dụng để đánh giá hồ sơ: chuyển từ "Đang xét" sang "Đã duyệt" hoặc "Từ chối"
     * 
     * @param id ID của hồ sơ cần cập nhật
     * @param request Request body chứa { status: "Đã duyệt" | "Từ chối", rejectionReason?: "Lý do từ chối" }
     * @return ResponseEntity chứa:
     *         - Thành công: ApplicationDTO đã cập nhật
     *         - Thất bại: { error: message } với HTTP 400
     */
    @PutMapping(value = "/{id}/status", produces = "application/json; charset=UTF-8", consumes = "application/json; charset=UTF-8")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Integer id,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            String rejectionReason = request.get("rejectionReason");
            ApplicationDTO updated = applicationService.updateApplicationStatus(id, status, rejectionReason);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
