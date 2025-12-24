package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Optional<Candidate> findByEmail(String email);
    Optional<Candidate> findByPhone(String phone);
}
