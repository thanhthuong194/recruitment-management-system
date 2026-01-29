package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.PlanCreateRequest;
import com.recruitment.recruitment_backend.dto.PlanResponse;
import com.recruitment.recruitment_backend.dto.PlanUpdateRequest;
import com.recruitment.recruitment_backend.model.RecruitmentPlan;
import com.recruitment.recruitment_backend.model.UnitManager;
import com.recruitment.recruitment_backend.model.JobPosition;
import com.recruitment.recruitment_backend.repository.RecruitmentPlanRepository;
import com.recruitment.recruitment_backend.repository.UnitManagerRepository;
import com.recruitment.recruitment_backend.repository.JobPositionRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller quản lý Kế hoạch Tuyển dụng (Recruitment Plans).
 * 
 * <p>Cung cấp các API endpoint CRUD cho kế hoạch tuyển dụng:
 * <ul>
 *   <li>GET /api/plans - Lấy danh sách tất cả kế hoạch</li>
 *   <li>GET /api/plans/{id} - Lấy kế hoạch theo ID</li>
 *   <li>POST /api/plans - Tạo kế hoạch mới (Unit Manager)</li>
 *   <li>PUT /api/plans/{id} - Cập nhật kế hoạch</li>
 *   <li>DELETE /api/plans/{id} - Xóa kế hoạch</li>
 *   <li>PUT /api/plans/{id}/approve - Duyệt kế hoạch (Rector)</li>
 *   <li>PUT /api/plans/{id}/reject - Từ chối kế hoạch (Rector)</li>
 * </ul>
 * 
 * <p>Workflow trạng thái kế hoạch:
 * <pre>
 * Pending → Approved → (Đăng tin tuyển dụng)
 *        ↘ Rejected
 * </pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see RecruitmentPlan
 * @see PlanResponse
 */
@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class PlansController {

    /** Repository truy vấn kế hoạch tuyển dụng */
    private final RecruitmentPlanRepository planRepository;
    
    /** Repository truy vấn thông tin trưởng đơn vị */
    private final UnitManagerRepository unitManagerRepository;
    
    /** Repository truy vấn vị trí tuyển dụng */
    private final JobPositionRepository jobPositionRepository;

    /**
     * Constructor khởi tạo PlansController với dependency injection.
     * 
     * @param planRepository Repository xử lý RecruitmentPlan
     * @param unitManagerRepository Repository xử lý UnitManager
     * @param jobPositionRepository Repository xử lý JobPosition
     */
    public PlansController(RecruitmentPlanRepository planRepository, 
                          UnitManagerRepository unitManagerRepository,
                          JobPositionRepository jobPositionRepository) {
        this.planRepository = planRepository;
        this.unitManagerRepository = unitManagerRepository;
        this.jobPositionRepository = jobPositionRepository;
    }

    /**
     * Lấy danh sách tất cả kế hoạch tuyển dụng.
     * 
     * <p>Endpoint: GET /api/plans
     * 
     * @return ResponseEntity chứa danh sách PlanResponse
     */
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<PlanResponse>> getAllPlans() {
        List<RecruitmentPlan> plans = planRepository.findAll();
        List<PlanResponse> response = plans.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    /**
     * Lấy thông tin kế hoạch tuyển dụng theo ID.
     * 
     * <p>Endpoint: GET /api/plans/{id}
     * 
     * @param id ID của kế hoạch cần lấy
     * @return ResponseEntity chứa:
     *         - Thành công: PlanResponse với thông tin kế hoạch
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @GetMapping(value = "/{id}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> getPlanById(@PathVariable Integer id) {
        return planRepository.findById(id)
                .map(plan -> ResponseEntity.ok(convertToResponse(plan)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Tạo kế hoạch tuyển dụng mới.
     * 
     * <p>Endpoint: POST /api/plans
     * 
     * <p>Quy trình:
     * <ol>
     *   <li>Lấy UnitManager đầu tiên làm người tạo (tạm thời)</li>
     *   <li>Tạo kế hoạch với trạng thái "Pending"</li>
     *   <li>Lưu vào database</li>
     * </ol>
     * 
     * @param request Thông tin kế hoạch cần tạo (title, position, school, quantity, cpa)
     * @return ResponseEntity với PlanResponse đã được tạo, HTTP 201 Created
     */
    @PostMapping(consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> createPlan(@RequestBody PlanCreateRequest request) {
        // Get first UnitManager as default creator (simplified)
        UnitManager creator = unitManagerRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No unit manager found"));
        
        RecruitmentPlan plan = RecruitmentPlan.builder()
                .title(request.getTitle())
                .position(request.getPosition())
                .school(request.getSchool())
                .quantity(request.getQuantity())
                .cpa(request.getCpa().floatValue())
                .creatDate(request.getCreatDate() != null ? request.getCreatDate() : LocalDate.now())
                .createdBy(creator)
                .status("Pending")
                .build();

        RecruitmentPlan saved = planRepository.save(plan);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToResponse(saved));
    }

    /**
     * Cập nhật thông tin kế hoạch tuyển dụng.
     * 
     * <p>Endpoint: PUT /api/plans/{id}
     * 
     * <p>Có thể cập nhật các trường: title, position, school, quantity, cpa, status, approvDate
     * 
     * @param id ID của kế hoạch cần cập nhật
     * @param request Thông tin cần cập nhật (các trường null sẽ không thay đổi)
     * @return ResponseEntity chứa:
     *         - Thành công: PlanResponse đã cập nhật
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @PutMapping(value = "/{id}", consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> updatePlan(@PathVariable Integer id, 
                                                    @RequestBody PlanUpdateRequest request) {
        return planRepository.findById(id)
                .map(plan -> {
                    if (request.getTitle() != null) plan.setTitle(request.getTitle());
                    if (request.getPosition() != null) plan.setPosition(request.getPosition());
                    if (request.getSchool() != null) plan.setSchool(request.getSchool());
                    if (request.getQuantity() != null) plan.setQuantity(request.getQuantity());
                    if (request.getCpa() != null) plan.setCpa(request.getCpa().floatValue());
                    if (request.getStatus() != null) plan.setStatus(request.getStatus());
                    if (request.getApprovDate() != null) plan.setApprovDate(request.getApprovDate());
                    
                    RecruitmentPlan updated = planRepository.save(plan);
                    return ResponseEntity.ok(convertToResponse(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Xóa kế hoạch tuyển dụng.
     * 
     * <p>Endpoint: DELETE /api/plans/{id}
     * 
     * <p>Lưu ý: Không thể xóa kế hoạch đã có dữ liệu liên quan (ví dụ: kết quả tuyển dụng)
     * 
     * @param id ID của kế hoạch cần xóa
     * @return ResponseEntity chứa:
     *         - Thành công: HTTP 204 No Content
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     *         - Lỗi: HTTP 409 Conflict nếu có dữ liệu liên quan
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Integer id) {
        if (!planRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        try {
            planRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException e) {
            // Foreign key constraint violation
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Không thể xóa kế hoạch này vì đã có kết quả tuyển dụng hoặc dữ liệu liên quan"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Lỗi khi xóa kế hoạch: " + e.getMessage()));
        }
    }

    /**
     * Xóa vĩnh viễn kế hoạch đã duyệt hoặc từ chối (chỉ dành cho HR).
     * 
     * <p>Endpoint: DELETE /api/plans/{id}/permanent
     * 
     * <p>Điều kiện:
     * <ul>
     *   <li>Chỉ HR (PERSONNEL_MANAGER) mới có quyền</li>
     *   <li>Chỉ xóa được kế hoạch có status "Approved" hoặc "Rejected"</li>
     * </ul>
     * 
     * @param id ID của kế hoạch cần xóa vĩnh viễn
     * @return ResponseEntity chứa:
     *         - Thành công: HTTP 204 No Content
     *         - Thất bại: HTTP 403 nếu không phải Approved/Rejected
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<?> deletePlanPermanently(@PathVariable Integer id) {
        // For now, we allow HR to delete (in production, check authentication)
        // TODO: Add authentication check for PERSONNEL_MANAGER role
        
        return planRepository.findById(id)
                .map(plan -> {
                    // Only allow deleting approved or rejected plans
                    if (!"Approved".equals(plan.getStatus()) && !"Rejected".equals(plan.getStatus())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(new ErrorResponse("Chỉ có thể xóa vĩnh viễn kế hoạch đã duyệt hoặc từ chối"));
                    }
                    
                    try {
                        // Delete the plan - cascade will handle related data
                        planRepository.deleteById(id);
                        return ResponseEntity.noContent().build();
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ErrorResponse("Lỗi khi xóa kế hoạch: " + e.getMessage()));
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Phê duyệt kế hoạch tuyển dụng (dành cho Rector).
     * 
     * <p>Endpoint: PUT /api/plans/{id}/approve
     * 
     * <p>Hành động:
     * <ul>
     *   <li>Cập nhật status thành "Approved"</li>
     *   <li>Ghi nhận ngày phê duyệt (approvDate = today)</li>
     *   <li>TODO: Ghi nhận người phê duyệt (approvedBy)</li>
     * </ul>
     * 
     * @param id ID của kế hoạch cần phê duyệt
     * @return ResponseEntity chứa:
     *         - Thành công: PlanResponse đã cập nhật
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @PutMapping(value = "/{id}/approve", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> approvePlan(@PathVariable Integer id) {
        return planRepository.findById(id)
                .map(plan -> {
                    plan.setStatus("Approved");
                    plan.setApprovDate(LocalDate.now());
                    // TODO: Set approvedBy to current logged-in rector
                    RecruitmentPlan updated = planRepository.save(plan);
                    return ResponseEntity.ok(convertToResponse(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Lấy thông tin kế hoạch đã duyệt theo ID (Public API cho form ứng tuyển).
     * 
     * <p>Endpoint: GET /api/plans/public/{id}
     * 
     * <p>Lưu ý: Chỉ trả về kế hoạch có status "Approved"
     * 
     * @param id ID của kế hoạch
     * @return ResponseEntity chứa:
     *         - Thành công: PlanResponse của kế hoạch đã duyệt
     *         - Thất bại: HTTP 404 nếu không tìm thấy hoặc chưa được duyệt
     */
    @GetMapping(value = "/public/{id}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> getApprovedPlanById(@PathVariable Integer id) {
        return planRepository.findById(id)
                .map(plan -> {
                    if (!"Approved".equals(plan.getStatus())) {
                        return ResponseEntity.notFound().build();
                    }
                    // Return plan info with positionID if available
                    PlanResponse response = convertToResponse(plan);
                    // Try to find job position for this plan
                    List<JobPosition> positions = jobPositionRepository.findByPlanPlanID(id);
                    if (!positions.isEmpty()) {
                        // Add positionID to response - we'll need to create a new response object
                    }
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Từ chối kế hoạch tuyển dụng (dành cho Rector).
     * 
     * <p>Endpoint: PUT /api/plans/{id}/reject
     * 
     * <p>Hành động:
     * <ul>
     *   <li>Cập nhật status thành "Rejected"</li>
     *   <li>Ghi nhận ngày từ chối (approvDate = today)</li>
     *   <li>Lưu lý do từ chối (nếu có)</li>
     * </ul>
     * 
     * @param id ID của kế hoạch cần từ chối
     * @param rejectRequest Request body chứa lý do từ chối (tùy chọn)
     * @return ResponseEntity chứa:
     *         - Thành công: PlanResponse đã cập nhật
     *         - Thất bại: HTTP 404 nếu không tìm thấy
     */
    @PutMapping(value = "/{id}/reject", consumes = "application/json; charset=UTF-8", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> rejectPlan(@PathVariable Integer id, @RequestBody(required = false) RejectRequest rejectRequest) {
        return planRepository.findById(id)
                .map(plan -> {
                    plan.setStatus("Rejected");
                    plan.setApprovDate(LocalDate.now());
                    if (rejectRequest != null && rejectRequest.getRejectReason() != null) {
                        plan.setRejectReason(rejectRequest.getRejectReason());
                    }
                    // TODO: Set approvedBy to current logged-in rector
                    RecruitmentPlan updated = planRepository.save(plan);
                    return ResponseEntity.ok(convertToResponse(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Lớp inner chứa thông tin lý do từ chối kế hoạch.
     */
    public static class RejectRequest {
        /** Lý do từ chối kế hoạch */
        private String rejectReason;
        
        /**
         * Lấy lý do từ chối.
         * @return Chuỗi lý do từ chối
         */
        public String getRejectReason() {
            return rejectReason;
        }
        
        /**
         * Đặt lý do từ chối.
         * @param rejectReason Lý do từ chối mới
         */
        public void setRejectReason(String rejectReason) {
            this.rejectReason = rejectReason;
        }
    }

    /**
     * Chuyển đổi entity RecruitmentPlan sang DTO PlanResponse.
     * 
     * <p>Phương thức helper để map các trường từ entity sang response DTO,
     * bao gồm cả thông tin người tạo và người duyệt.
     * 
     * @param plan Entity RecruitmentPlan cần chuyển đổi
     * @return PlanResponse DTO đã được map
     */
    private PlanResponse convertToResponse(RecruitmentPlan plan) {
        return PlanResponse.builder()
                .planid(plan.getPlanID())
                .title(plan.getTitle())
                .position(plan.getPosition())
                .school(plan.getSchool())
                .quantity(plan.getQuantity())
                .cpa(plan.getCpa().doubleValue())
                .status(plan.getStatus())
                .creatDate(plan.getCreatDate())
                .approvDate(plan.getApprovDate())
                .createdBy(plan.getCreatedBy() != null ? plan.getCreatedBy().getUser().getUsername() : null)
                .approvedBy(plan.getApprovedBy() != null ? plan.getApprovedBy().getUser().getUsername() : null)
                .rejectReason(plan.getRejectReason())
                .build();
    }
    
    /**
     * Lớp inner đại diện cho response lỗi.
     * 
     * <p>Sử dụng để trả về thông báo lỗi dạng JSON có cấu trúc.
     */
    private static class ErrorResponse {
        /** Thông báo lỗi */
        private final String error;
        
        /**
         * Constructor khởi tạo ErrorResponse.
         * @param error Thông báo lỗi
         */
        public ErrorResponse(String error) {
            this.error = error;
        }
        
        /**
         * Lấy thông báo lỗi.
         * @return Chuỗi thông báo lỗi
         */
        public String getError() {
            return error;
        }
    }
}
