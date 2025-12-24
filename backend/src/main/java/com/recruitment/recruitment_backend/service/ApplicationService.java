package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.ApplicationDTO;
import com.recruitment.recruitment_backend.dto.ApplicationSubmitRequest;
import com.recruitment.recruitment_backend.dto.CandidateDTO;
import com.recruitment.recruitment_backend.model.Application;
import com.recruitment.recruitment_backend.model.Candidate;
import com.recruitment.recruitment_backend.model.JobPosition;
import com.recruitment.recruitment_backend.repository.ApplicationRepository;
import com.recruitment.recruitment_backend.repository.CandidateRepository;
import com.recruitment.recruitment_backend.repository.JobPositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobPositionRepository jobPositionRepository;

    @Transactional
    public ApplicationDTO submitApplication(ApplicationSubmitRequest request) {
        // Create or get candidate
        Candidate candidate = candidateRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    Candidate newCandidate = Candidate.builder()
                            .fullName(request.getFullName())
                            .dateOfBirth(request.getDateOfBirth())
                            .email(request.getEmail())
                            .phone(request.getPhone())
                            .position(request.getPosition())
                            .department(request.getDepartment())
                            .address(request.getAddress())
                            .cpa(request.getCpa())
                            .sex(request.getSex())
                            .cvPath(request.getCvPath())
                            .build();
                    return candidateRepository.save(newCandidate);
                });

        // Get job position if provided
        JobPosition jobPosition = null;
        if (request.getPositionID() != null) {
            jobPosition = jobPositionRepository.findById(request.getPositionID())
                    .orElseThrow(() -> new RuntimeException("Job position not found with id: " + request.getPositionID()));
        } else {
            // Try to find any available position
            List<JobPosition> positions = jobPositionRepository.findAll();
            if (!positions.isEmpty()) {
                jobPosition = positions.get(0);
            } else {
                throw new RuntimeException("No job positions available");
            }
        }

        // Create application
        Application application = Application.builder()
                .candidate(candidate)
                .position(jobPosition)
                .applyDate(LocalDate.now())
                .status("Đang xét")
                .build();

        Application saved = applicationRepository.save(application);
        return convertToDTO(saved);
    }

    public List<ApplicationDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ApplicationDTO> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationDTO updateApplicationStatus(Integer applicationId, String status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));
        
        application.setStatus(status);
        Application updated = applicationRepository.save(application);
        return convertToDTO(updated);
    }

    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setApplicationID(application.getApplicationID());
        dto.setApplyDate(application.getApplyDate());
        dto.setStatus(application.getStatus());
        
        // Convert candidate
        CandidateDTO candidateDTO = new CandidateDTO();
        Candidate candidate = application.getCandidate();
        candidateDTO.setCandidateID(candidate.getCandidateID());
        candidateDTO.setFullName(candidate.getFullName());
        candidateDTO.setDateOfBirth(candidate.getDateOfBirth());
        candidateDTO.setEmail(candidate.getEmail());
        candidateDTO.setPhone(candidate.getPhone());
        candidateDTO.setPosition(candidate.getPosition());
        candidateDTO.setDepartment(candidate.getDepartment());
        candidateDTO.setAddress(candidate.getAddress());
        candidateDTO.setCpa(candidate.getCpa());
        candidateDTO.setSex(candidate.getSex());
        candidateDTO.setCvPath(candidate.getCvPath());
        dto.setCandidate(candidateDTO);
        
        // Set position info
        JobPosition position = application.getPosition();
        dto.setPositionID(position.getPositionID());
        dto.setPositionTitle(position.getTitle());
        
        return dto;
    }
}
