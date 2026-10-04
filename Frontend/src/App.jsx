import { useState } from "react";
import "./App.css";

function App() {
  const [jobText, setJobText] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const investigateJob = async () => {
    if (!jobText.trim()) {
      alert("Please paste a job posting first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "https://hireshield-c326.onrender.com/api/jobs/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobTitle: "",
            companyName: "",
            jobDescription: jobText,
            recruiterDetails: "",
            applicationUrl: jobUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setResult(data);

    } catch (error) {
      alert("Unable to connect to HireShield server.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await fetch(
        "https://hireshield-c326.onrender.com/api/jobs/history"
      );

      if (!response.ok) {
        throw new Error("History error");
      }

      const data = await response.json();

      setHistory(data);
      setShowHistory(true);

    } catch (error) {
      alert("Unable to load history.");
    }
  };

  const analyzeAnother = () => {
    setJobText("");
    setJobUrl("");
    setResult(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="logo">
          🛡️ HireShield
        </div>

        <div className="nav-right">

          <span className="tagline">
            Job Posting Intelligence
          </span>

          <button
            className="history-button"
            onClick={loadHistory}
          >
            History
          </button>

        </div>

      </header>


      <main className="hero">

        {/* INTRO */}

        <div className="hero-text">

          <p className="eyebrow">
            JOB SAFETY CHECK
          </p>

          <h1>
            Investigate a job
            <br />
            <span>before you trust it.</span>
          </h1>

          <p className="description">
            Paste a job posting below and HireShield will examine
            suspicious patterns and generate an explainable risk report.
          </p>

        </div>


        {/* INPUT */}

        {!result && !showHistory && (

          <div className="analysis-card">

            <div className="card-header">

              <div>
                <h2>Job Posting</h2>

                <p>
                  Paste the complete job description
                </p>
              </div>

              <span className="secure">
                ● Analysis Ready
              </span>

            </div>


            <textarea
              value={jobText}
              onChange={(e) =>
                setJobText(e.target.value)
              }
              placeholder="Paste the complete job posting here..."
            />


            <div className="input-row">

              <input
                type="text"
                value={jobUrl}
                onChange={(e) =>
                  setJobUrl(e.target.value)
                }
                placeholder="Optional: Job URL"
              />


              <button
                onClick={investigateJob}
                disabled={loading}
              >
                {loading
                  ? "Analyzing..."
                  : "🔍 Investigate Job"}
              </button>

            </div>


            <div className="privacy-note">
              🔒 Job posting is analyzed for suspicious patterns.
            </div>

          </div>

        )}


        {/* RESULT */}

        {result && !showHistory && (

          <div className="result-dashboard">

            <div className="result-heading">

              <p className="eyebrow">
                ANALYSIS COMPLETE
              </p>

              <h2>
                HireShield Investigation Report
              </h2>

              <p>
                Here is what we found in the submitted job posting.
              </p>

            </div>


            {/* SCORE */}

            <div className="score-card">

              <div>

                <span className="small-label">
                  RISK SCORE
                </span>

                <div className="big-score">

                  {result.riskScore}

                  <span>
                    /100
                  </span>

                </div>

              </div>


              <div
                className={`risk ${result.riskLevel.toLowerCase()}`}
              >
                {result.riskLevel}
              </div>

            </div>


            {/* FINGERPRINT */}

            <div className="fingerprint-card">

              <div className="section-title">

                <h3>
                  Scam Fingerprint
                </h3>

                <span>
                  {result.signals.length} signals detected
                </span>

              </div>


              <div className="fingerprint-grid">

                {result.signals.map(
                  (signal, index) => (

                    <div
                      className="fingerprint-item"
                      key={index}
                    >

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <strong>
                        {signal}
                      </strong>

                      <p>
                        Suspicious pattern detected in this category.
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* REASONS */}

            <div className="reason-card">

              <h3>
                Why was this posting flagged?
              </h3>


              <div className="reasons">

                {result.reason
                  .split(".")
                  .filter(
                    (reason) => reason.trim()
                  )
                  .map(
                    (reason, index) => (

                      <div
                        className="reason"
                        key={index}
                      >

                        <span>
                          ⚠
                        </span>

                        <p>
                          {reason.trim()}.
                        </p>

                      </div>

                    )
                  )}

              </div>

            </div>


            {/* RECOMMENDATION */}

            <div className="recommendation">

              <span>
                🛡️
              </span>

              <div>

                <h3>
                  Safety Recommendation
                </h3>

                <p>
                  Review the flagged signals carefully and
                  independently verify the employer before
                  sharing sensitive information or making any payment.
                </p>

              </div>

            </div>


            <button
              className="another-button"
              onClick={analyzeAnother}
            >
              ← Analyze Another Job
            </button>

          </div>

        )}


        {/* HISTORY */}

        {showHistory && (

          <div className="history-panel">

            <div className="history-header">

              <div>

                <p className="eyebrow">
                  YOUR ACTIVITY
                </p>

                <h2>
                  Analysis History
                </h2>

                <p>
                  Previously analyzed job postings.
                </p>

              </div>


              <button
                className="close-history"
                onClick={() =>
                  setShowHistory(false)
                }
              >
                ✕ Close
              </button>

            </div>


            {history.length === 0 ? (

              <div className="empty-history">

                <div className="empty-icon">
                  🗂️
                </div>

                <h3>
                  No analyses yet
                </h3>

                <p>
                  Investigate a job posting and your
                  result will appear here.
                </p>

              </div>

            ) : (

              <div className="history-list">

                {history
                  .slice()
                  .reverse()
                  .map((item) => (

                    <div
                      className="history-item"
                      key={item.id}
                    >

                      <div className="history-content">

                        <h3>
                          {item.jobText
                            ? item.jobText.substring(
                                0,
                                90
                              ) + "..."
                            : "Job Analysis"}
                        </h3>

                        {item.jobUrl && (
                          <p>
                            {item.jobUrl}
                          </p>
                        )}

                        <span>
                          ID #{item.id}
                        </span>

                      </div>


                      <div className="history-score">

                        <strong>
                          {item.riskScore}/100
                        </strong>

                        <span
                          className={`risk-small ${item.riskLevel.toLowerCase()}`}
                        >
                          {item.riskLevel}
                        </span>

                      </div>

                    </div>

                  ))}

              </div>

            )}

          </div>

        )}


      </main>

    </div>
  );
}

export default App;