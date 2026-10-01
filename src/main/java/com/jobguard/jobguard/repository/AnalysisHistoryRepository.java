package com.jobguard.jobguard.repository;

import com.jobguard.jobguard.modell.AnalysisHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalysisHistoryRepository
        extends JpaRepository<AnalysisHistory, Long> {

}