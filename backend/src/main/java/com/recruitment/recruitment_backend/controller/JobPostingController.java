package com.recruitment.recruitment_backend.controller;

import com.recruitment.recruitment_backend.dto.JobPostingDTO;
import com.recruitment.recruitment_backend.service.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    // Public endpoint - Get all active job postings (no authentication required)
    @GetMapping(value = "/public", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<JobPostingDTO>> getActiveJobPostings() {
        List<JobPostingDTO> jobs = jobPostingService.getActiveJobPostings();
        return ResponseEntity.ok(jobs);
    }

    // Public endpoint - Get job posting by ID
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

    // Public endpoint - Get job posting by Plan ID
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

    // Get all job postings (authenticated)
    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<JobPostingDTO>> getAllJobPostings() {
        List<JobPostingDTO> jobs = jobPostingService.getAllJobPostings();
        return ResponseEntity.ok(jobs);
    }
}
