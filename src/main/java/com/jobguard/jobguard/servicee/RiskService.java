package com.jobguard.jobguard.servicee;

import com.jobguard.jobguard.modell.JobDetails;
import com.jobguard.jobguard.modell.RiskResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RiskService {

    public RiskResult checkJob(JobDetails job) {

        int score = 0;

        StringBuilder reasons = new StringBuilder();

        List<String> signals = new ArrayList<>();

        String text = (
                job.getJobTitle() + " " +
                job.getCompanyName() + " " +
                job.getJobDescription() + " " +
                job.getRecruiterDetails() + " " +
                job.getApplicationUrl()
        ).toLowerCase();

        // Payment signal
        if (text.contains("pay") ||
            text.contains("fee") ||
            text.contains("registration fee") ||
            text.contains("payment")) {

            score += 30;

            reasons.append("Payment request detected. ");

            signals.add("Payment Request");
        }

        // Guaranteed job signal
        if (text.contains("guaranteed job") ||
            text.contains("100% job") ||
            text.contains("guaranteed placement")) {

            score += 20;

            reasons.append("Guaranteed job claim detected. ");

            signals.add("Guaranteed Job Claim");
        }

        // Urgency signal
        if (text.contains("urgent") ||
            text.contains("apply immediately") ||
            text.contains("limited time")) {

            score += 15;

            reasons.append("Urgency detected. ");

            signals.add("Urgency / Pressure");
        }

        // Financial information signal
        if (text.contains("bank account") ||
            text.contains("bank details") ||
            text.contains("credit card")) {

            score += 20;

            reasons.append("Sensitive financial information request detected. ");

            signals.add("Financial Information Request");
        }

        // Maximum score
        if (score > 100) {
            score = 100;
        }

        String level;

        if (score <= 30) {
            level = "LOW";
        } else if (score <= 60) {
            level = "MEDIUM";
        } else {
            level = "HIGH";
        }

        if (reasons.length() == 0) {
            reasons.append("No major suspicious patterns detected.");
        }

        return new RiskResult(
                score,
                level,
                reasons.toString(),
                signals
        );
    }
}