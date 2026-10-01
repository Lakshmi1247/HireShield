package com.jobguard.jobguard.modell;

import java.util.List;

public class RiskResult {

    private int riskScore;
    private String riskLevel;
    private String reason;
    private List<String> signals;

    public RiskResult(
            int riskScore,
            String riskLevel,
            String reason,
            List<String> signals) {

        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
        this.reason = reason;
        this.signals = signals;
    }

    public int getRiskScore() {
        return riskScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public String getReason() {
        return reason;
    }

    public List<String> getSignals() {
        return signals;
    }
}