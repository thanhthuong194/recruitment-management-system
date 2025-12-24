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

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Public endpoint - Submit application (no authentication required)
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

    // Get all applications (HR/Admin/Rector only)
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    // Get applications by status
    @GetMapping(value = "/status/{status}", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStatus(@PathVariable String status) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }

    // Update application status (HR/Admin/Rector only)
    @PutMapping(value = "/{id}/status", produces = "application/json; charset=UTF-8", consumes = "application/json; charset=UTF-8")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Integer id,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            ApplicationDTO updated = applicationService.updateApplicationStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
