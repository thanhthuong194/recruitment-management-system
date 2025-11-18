package com.recruitment.recruitment_backend.repository;

import com.recruitment.recruitment_backend.model.UnitManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitManagerRepository extends JpaRepository<UnitManager, Integer> {
}
