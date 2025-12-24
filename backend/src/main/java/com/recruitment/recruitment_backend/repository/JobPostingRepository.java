package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Integer> {
    List<JobPosting> findByStatus(String status);
    Optional<JobPosting> findByPlanPlanID(Integer planId);
}
