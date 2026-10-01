package com.jobguard.jobguard.modell;

public class JobDetails {

    private String jobTitle;
    private String companyName;
    private String jobDescription;
    private String recruiterDetails;
    private String applicationUrl;

    public JobDetails() {
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getRecruiterDetails() {
        return recruiterDetails;
    }

    public void setRecruiterDetails(String recruiterDetails) {
        this.recruiterDetails = recruiterDetails;
    }

    public String getApplicationUrl() {
        return applicationUrl;
    }

    public void setApplicationUrl(String applicationUrl) {
        this.applicationUrl = applicationUrl;
    }
}