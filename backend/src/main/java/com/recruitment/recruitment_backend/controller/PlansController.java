package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.PlanCreateRequest;
import com.recruitment.recruitment_backend.dto.PlanResponse;
import com.recruitment.recruitment_backend.dto.PlanUpdateRequest;
import com.recruitment.recruitment_backend.model.RecruitmentPlan;
import com.recruitment.recruitment_backend.model.UnitManager;
import com.recruitment.recruitment_backend.repository.RecruitmentPlanRepository;
import com.recruitment.recruitment_backend.repository.UnitManagerRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*")
public class PlansController {

    private final RecruitmentPlanRepository planRepository;
    private final UnitManagerRepository unitManagerRepository;

    public PlansController(RecruitmentPlanRepository planRepository, 
                          UnitManagerRepository unitManagerRepository) {
        this.planRepository = planRepository;
        this.unitManagerRepository = unitManagerRepository;
    }

    // GET all plans
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<PlanResponse>> getAllPlans() {
        List<RecruitmentPlan> plans = planRepository.findAll();
        List<PlanResponse> response = plans.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    // GET plan by ID
    @GetMapping(value = "/{id}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> getPlanById(@PathVariable Integer id) {
        return planRepository.findById(id)
                .map(plan -> ResponseEntity.ok(convertToResponse(plan)))
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE new plan
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

    // UPDATE existing plan
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

    // DELETE plan
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

    // DELETE PERMANENTLY approved/rejected plans (HR only)
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

    // APPROVE plan
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

    // REJECT plan
    @PutMapping(value = "/{id}/reject", produces = "application/json; charset=UTF-8")
    public ResponseEntity<PlanResponse> rejectPlan(@PathVariable Integer id) {
        return planRepository.findById(id)
                .map(plan -> {
                    plan.setStatus("Rejected");
                    plan.setApprovDate(LocalDate.now());
                    // TODO: Set approvedBy to current logged-in rector
                    RecruitmentPlan updated = planRepository.save(plan);
                    return ResponseEntity.ok(convertToResponse(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Helper method to convert entity to DTO
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
                .build();
    }
    
    // Error response class
    private static class ErrorResponse {
        private final String error;
        
        public ErrorResponse(String error) {
            this.error = error;
        }
        
        public String getError() {
            return error;
        }
    }
}
