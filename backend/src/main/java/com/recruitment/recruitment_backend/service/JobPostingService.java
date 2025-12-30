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

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private JobPositionRepository jobPositionRepository;

    public List<JobPostingDTO> getAllJobPostings() {
        return jobPostingRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<JobPostingDTO> getActiveJobPostings() {
        return jobPostingRepository.findByStatus("Đang mở").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public JobPostingDTO getJobPostingById(Integer id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found with id: " + id));
        return convertToDTO(jobPosting);
    }

    public JobPostingDTO getJobPostingByPlanId(Integer planId) {
        return jobPostingRepository.findByPlanPlanID(planId)
                .map(this::convertToDTO)
                .orElse(null);
    }

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
