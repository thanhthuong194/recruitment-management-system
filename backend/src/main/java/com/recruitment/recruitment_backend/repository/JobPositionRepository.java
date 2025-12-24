package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPositionRepository extends JpaRepository<JobPosition, Integer> {
    List<JobPosition> findByPlanPlanID(Integer planID);
}
