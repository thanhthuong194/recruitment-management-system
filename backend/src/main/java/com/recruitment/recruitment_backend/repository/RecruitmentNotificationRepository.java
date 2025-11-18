package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.RecruitmentNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentNotificationRepository extends JpaRepository<RecruitmentNotification, Integer> {
    List<RecruitmentNotification> findByIsActiveTrueOrderByCreatedDateDesc();
}
