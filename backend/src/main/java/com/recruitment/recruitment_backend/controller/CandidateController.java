package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.CandidateDTO;
import com.recruitment.recruitment_backend.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller quản lý Ứng viên (Candidates).
 * 
 * <p>Cung cấp các API endpoint cho:
 * <ul>
 *   <li>GET /api/candidates - Lấy danh sách tất cả ứng viên</li>
 *   <li>GET /api/candidates/{id} - Lấy thông tin ứng viên theo ID</li>
 *   <li>DELETE /api/candidates/{id} - Xóa ứng viên (Admin only)</li>
 * </ul>
 * 
 * <p>Lưu ý: Ứng viên được tạo tự động khi nộp hồ sơ ứng tuyển.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see CandidateService
 * @see CandidateDTO
 */
@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "*")
public class CandidateController {

    /** Service xử lý logic nghiệp vụ ứng viên */
    @Autowired
    private CandidateService candidateService;

    /**
     * Lấy danh sách tất cả ứng viên (HR/Admin/Rector).
     * 
     * <p>Endpoint: GET /api/candidates
     * 
     * @return ResponseEntity chứa danh sách CandidateDTO
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<CandidateDTO>> getAllCandidates() {
        List<CandidateDTO> candidates = candidateService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

    /**
     * Lấy thông tin chi tiết ứng viên theo ID.
     * 
     * <p>Endpoint: GET /api/candidates/{id}
     * 
     * @param id ID của ứng viên cần lấy
     * @return ResponseEntity chứa:
     *         - Thành công: CandidateDTO với thông tin ứng viên
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @GetMapping(value = "/{id}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getCandidateById(@PathVariable Integer id) {
        try {
            CandidateDTO candidate = candidateService.getCandidateById(id);
            return ResponseEntity.ok(candidate);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Xóa ứng viên khỏi hệ thống (Admin only).
     * 
     * <p>Endpoint: DELETE /api/candidates/{id}
     * 
     * <p>Lưu ý: Cần cẩn thận khi xóa vì có thể ảnh hưởng đến dữ liệu Applications liên quan.
     * 
     * @param id ID của ứng viên cần xóa
     * @return ResponseEntity chứa:
     *         - Thành công: { message: "Xóa ứng viên thành công" }
     *         - Thất bại: { error: message } với HTTP 400
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCandidate(@PathVariable Integer id) {
        try {
            candidateService.deleteCandidate(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Xóa ứng viên thành công");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
