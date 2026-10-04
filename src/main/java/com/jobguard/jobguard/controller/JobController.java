package com.jobguard.jobguard.controller;

import com.jobguard.jobguard.modell.AnalysisHistory;
import com.jobguard.jobguard.modell.JobDetails;
import com.jobguard.jobguard.modell.RiskResult;
import com.jobguard.jobguard.repository.AnalysisHistoryRepository;
import com.jobguard.jobguard.servicee.RiskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://hire-shield-blush.vercel.app")
@RequestMapping("/api/jobs")
public class JobController {

    private final RiskService riskService;
    private final AnalysisHistoryRepository historyRepository;

    public JobController(
            RiskService riskService,
            AnalysisHistoryRepository historyRepository) {

        this.riskService = riskService;
        this.historyRepository = historyRepository;
    }

    @GetMapping("/check")
    public String test() {
        return "HireShield API is working!";
    }

    @PostMapping("/check")
    public RiskResult checkJob(@RequestBody JobDetails job) {

        RiskResult result = riskService.checkJob(job);

        AnalysisHistory history = new AnalysisHistory();

        history.setJobText(job.getJobDescription());
        history.setJobUrl(job.getApplicationUrl());
        history.setRiskScore(result.getRiskScore());
        history.setRiskLevel(result.getRiskLevel());
        history.setReasons(result.getReason());

        historyRepository.save(history);

        return result;
    }

    @GetMapping("/history")
    public List<AnalysisHistory> getHistory() {
        return historyRepository.findAll();
    }
}