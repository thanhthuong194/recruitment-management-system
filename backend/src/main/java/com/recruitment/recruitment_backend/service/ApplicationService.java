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

/**
 * Service xử lý các chức năng liên quan đến Hồ sơ Ứng tuyển (Applications).
 * 
 * <p>Cung cấp các phương thức:
 * <ul>
 *   <li>{@link #submitApplication(ApplicationSubmitRequest)} - Nộp hồ sơ mới</li>
 *   <li>{@link #getAllApplications()} - Lấy tất cả hồ sơ</li>
 *   <li>{@link #getApplicationsByStatus(String)} - Lọc theo trạng thái</li>
 *   <li>{@link #updateApplicationStatus(Integer, String)} - Cập nhật trạng thái</li>
 * </ul>
 * 
 * <p>Workflow hồ sơ:
 * <pre>
 * Submit → "Đang xét" → "Đạt" / "Không đạt"
 * </pre>
 * 
 * @author Recruitment Team
 * @version 1.0
 * @see ApplicationDTO
 * @see ApplicationRepository
 */
@Service
public class ApplicationService {

    /** Repository truy vấn hồ sơ ứng tuyển */
    @Autowired
    private ApplicationRepository applicationRepository;

    /** Repository truy vấn ứng viên */
    @Autowired
    private CandidateRepository candidateRepository;

    /** Repository truy vấn vị trí tuyển dụng */
    @Autowired
    private JobPositionRepository jobPositionRepository;

    /**
     * Nộp hồ sơ ứng tuyển mới.
     * 
     * <p>Quy trình:
     * <ol>
     *   <li>Tìm hoặc tạo Candidate dựa trên email hoặc phone</li>
     *   <li>Liên kết với JobPosition (nếu có positionID)</li>
     *   <li>Tạo Application với status "Đang xét"</li>
     * </ol>
     * 
     * <p>Lưu ý: Nếu email hoặc phone đã tồn tại, sẽ sử dụng Candidate hiện có và cập nhật thông tin.
     * 
     * @param request Thông tin hồ sơ ứng tuyển
     * @return ApplicationDTO đã được tạo
     * @throws RuntimeException nếu không tìm thấy JobPosition
     */
    @Transactional
    public ApplicationDTO submitApplication(ApplicationSubmitRequest request) {
        // Create or get candidate - check by email OR phone to avoid unique constraint violation
        Candidate candidate = candidateRepository.findByEmail(request.getEmail())
                .or(() -> candidateRepository.findByPhone(request.getPhone()))
                .map(existingCandidate -> {
                    // Update existing candidate with new information
                    existingCandidate.setFullName(request.getFullName());
                    existingCandidate.setDateOfBirth(request.getDateOfBirth());
                    existingCandidate.setEmail(request.getEmail());
                    existingCandidate.setPhone(request.getPhone());
                    existingCandidate.setPosition(request.getPosition());
                    existingCandidate.setDepartment(request.getDepartment());
                    existingCandidate.setAddress(request.getAddress());
                    existingCandidate.setCpa(request.getCpa());
                    existingCandidate.setSex(request.getSex());
                    existingCandidate.setCvPath(request.getCvPath());
                    return candidateRepository.save(existingCandidate);
                })
                .orElseGet(() -> {
                    // Create new candidate
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

    /**
     * Lấy danh sách tất cả hồ sơ ứng tuyển.
     * 
     * @return Danh sách ApplicationDTO
     */
    public List<ApplicationDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Lấy danh sách hồ sơ theo trạng thái.
     * 
     * @param status Trạng thái cần lọc ("Đang xét", "Đạt", "Không đạt")
     * @return Danh sách ApplicationDTO theo trạng thái
     */
    public List<ApplicationDTO> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Cập nhật trạng thái hồ sơ ứng tuyển.
     * 
     * <p>Sử dụng để đánh giá hồ sơ:
     * <ul>
     *   <li>"Đang xét" → "Đã duyệt": Ứng viên đủ điều kiện</li>
     *   <li>"Đang xét" → "Từ chối": Ứng viên không đủ điều kiện (cần lý do)</li>
     * </ul>
     * 
     * @param applicationId ID của hồ sơ cần cập nhật
     * @param status Trạng thái mới
     * @param rejectionReason Lý do từ chối (bắt buộc nếu status = "Từ chối")
     * @return ApplicationDTO đã cập nhật
     * @throws RuntimeException nếu không tìm thấy hồ sơ
     */
    @Transactional
    public ApplicationDTO updateApplicationStatus(Integer applicationId, String status, String rejectionReason) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));
        
        application.setStatus(status);
        
        // Lưu lý do từ chối nếu có
        if ("Từ chối".equals(status) && rejectionReason != null) {
            application.setRejectionReason(rejectionReason);
        } else if (!"Từ chối".equals(status)) {
            // Xóa lý do từ chối nếu chuyển sang trạng thái khác
            application.setRejectionReason(null);
        }
        
        Application updated = applicationRepository.save(application);
        return convertToDTO(updated);
    }

    /**
     * Chuyển đổi entity Application sang DTO.
     * 
     * <p>Map các trường:
     * <ul>
     *   <li>Thông tin Application (ID, ngày nộp, trạng thái)</li>
     *   <li>Thông tin Candidate (convert sang CandidateDTO)</li>
     *   <li>Thông tin JobPosition (ID, title)</li>
     * </ul>
     * 
     * @param application Entity cần chuyển đổi
     * @return ApplicationDTO đã được map
     */
    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setApplicationID(application.getApplicationID());
        dto.setApplyDate(application.getApplyDate());
        dto.setStatus(application.getStatus());
        dto.setRejectionReason(application.getRejectionReason());
        
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
