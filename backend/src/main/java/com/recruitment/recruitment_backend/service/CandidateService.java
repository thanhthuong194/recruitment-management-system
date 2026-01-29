package com.recruitment.recruitment_backend.service;

import com.recruitment.recruitment_backend.dto.CandidateDTO;
import com.recruitment.recruitment_backend.model.Candidate;
import com.recruitment.recruitment_backend.repository.ApplicationRepository;
import com.recruitment.recruitment_backend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service xử lý các chức năng liên quan đến Ứng viên (Candidates).
 * 
 * <p>Cung cấp các phương thức:
 * <ul>
 *   <li>{@link #getAllCandidates()} - Lấy danh sách tất cả ứng viên</li>
 *   <li>{@link #getCandidateById(Integer)} - Lấy ứng viên theo ID</li>
 *   <li>{@link #createCandidate(Candidate)} - Tạo ứng viên mới</li>
 *   <li>{@link #deleteCandidate(Integer)} - Xóa ứng viên</li>
 * </ul>
 * 
 * <p>Lưu ý: Ứng viên thường được tạo tự động khi nộp hồ sơ qua ApplicationService.
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see CandidateDTO
 * @see CandidateRepository
 */
@Service
public class CandidateService {

    /** Repository truy vấn ứng viên */
    @Autowired
    private CandidateRepository candidateRepository;
    
    /** Repository truy vấn đơn ứng tuyển */
    @Autowired
    private ApplicationRepository applicationRepository;

    /**
     * Lấy danh sách tất cả ứng viên.
     * 
     * @return Danh sách CandidateDTO
     */
    public List<CandidateDTO> getAllCandidates() {
        return candidateRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy thông tin ứng viên theo ID.
     * 
     * @param id ID của ứng viên
     * @return CandidateDTO với thông tin chi tiết
     * @throws RuntimeException nếu không tìm thấy ứng viên
     */
    public CandidateDTO getCandidateById(Integer id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
        return convertToDTO(candidate);
    }

    /**
     * Tạo ứng viên mới.
     * 
     * <p>Kiểm tra trùng lặp:
     * <ul>
     *   <li>Email phải unique</li>
     *   <li>Số điện thoại phải unique</li>
     * </ul>
     * 
     * @param candidate Entity Candidate cần tạo
     * @return CandidateDTO đã được tạo
     * @throws RuntimeException nếu email hoặc phone đã tồn tại
     */
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

    /**
     * Xóa ứng viên khỏi hệ thống.
     * 
     * <p>Xóa tất cả đơn ứng tuyển liên quan trước khi xóa ứng viên.
     * 
     * @param id ID của ứng viên cần xóa
     * @throws RuntimeException nếu không tìm thấy ứng viên
     */
    @Transactional
    public void deleteCandidate(Integer id) {
        if (!candidateRepository.existsById(id)) {
            throw new RuntimeException("Candidate not found with id: " + id);
        }
        // Xóa tất cả applications liên quan trước
        applicationRepository.deleteByCandidateCandidateID(id);
        // Sau đó xóa candidate
        candidateRepository.deleteById(id);
    }

    /**
     * Chuyển đổi entity Candidate sang DTO.
     * 
     * @param candidate Entity cần chuyển đổi
     * @return CandidateDTO đã được map
     */
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
