package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.RecruitmentPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentPlanRepository extends JpaRepository<RecruitmentPlan, Integer> {
}
