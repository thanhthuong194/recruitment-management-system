package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.CandidateDTO;
import com.recruitment.recruitment_backend.model.Candidate;
import com.recruitment.recruitment_backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public List<CandidateDTO> getAllCandidates() {
        return candidateRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CandidateDTO getCandidateById(Integer id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
        return convertToDTO(candidate);
    }

    @Transactional
    public CandidateDTO createCandidate(Candidate candidate) {
        // Check if email or phone already exists
        if (candidateRepository.findByEmail(candidate.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + candidate.getEmail());
        }
        if (candidateRepository.findByPhone(candidate.getPhone()).isPresent()) {
            throw new RuntimeException("Phone number already exists: " + candidate.getPhone());
        }
        
        Candidate saved = candidateRepository.save(candidate);
        return convertToDTO(saved);
    }

    @Transactional
    public void deleteCandidate(Integer id) {
        if (!candidateRepository.existsById(id)) {
            throw new RuntimeException("Candidate not found with id: " + id);
        }
        candidateRepository.deleteById(id);
    }

    private CandidateDTO convertToDTO(Candidate candidate) {
        CandidateDTO dto = new CandidateDTO();
        dto.setCandidateID(candidate.getCandidateID());
        dto.setFullName(candidate.getFullName());
        dto.setDateOfBirth(candidate.getDateOfBirth());
        dto.setEmail(candidate.getEmail());
        dto.setPhone(candidate.getPhone());
        dto.setPosition(candidate.getPosition());
        dto.setDepartment(candidate.getDepartment());
        dto.setAddress(candidate.getAddress());
        dto.setCpa(candidate.getCpa());
        dto.setSex(candidate.getSex());
        dto.setCvPath(candidate.getCvPath());
        return dto;
    }
}
