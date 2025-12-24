package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByCandidateCandidateID(Integer candidateID);
    List<Application> findByStatus(String status);
}
