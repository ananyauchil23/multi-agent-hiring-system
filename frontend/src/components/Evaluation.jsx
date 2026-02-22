import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState("");
  const [transcript, setTranscript] = useState("");
  const [jd, setJd] = useState("");
  const [roles, setRoles] = useState("");
  const [result, setResult] = useState(null);

  const handleEvaluate = async () => {
    const response = await fetch("http://localhost:8000/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume,
        transcript,
        job_description: jd,
        available_roles: roles.split(",").map(r => r.trim())
      })
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="app">

      {/* HERO */}
      <section className="hero">
        <h1>Autonomous Technical Interview Panel</h1>
        <p>AI-powered multi-agent hiring intelligence system</p>
      </section>

      {/* EVALUATION */}
      <section className="evaluation">

        <div className="glass form-card">
          <h2>Live Candidate Evaluation</h2>

          <textarea
            placeholder="Paste Resume..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />

          <textarea
            placeholder="Interview Transcript..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <textarea
            placeholder="Job Description..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />

          <input
            type="text"
            placeholder="Available Roles (comma separated)"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
          />

          <button className="primary-btn" onClick={handleEvaluate}>
            Evaluate Candidate
          </button>
        </div>

        {result && result.final_decision && (
          <div className="glass result-card">
            <h2>Final Decision</h2>

            <p><strong>Verdict:</strong> {result.final_decision.verdict}</p>
            <p><strong>Overall Score:</strong> {result.final_decision.overall_score}</p>
            <p><strong>Confidence:</strong> {result.final_decision.confidence_score}</p>

            <h3>Strengths</h3>
            <p>{result.final_decision.strength_summary}</p>

            <h3>Weaknesses</h3>
            <p>{result.final_decision.weakness_summary}</p>
          </div>
        )}

      </section>

    </div>
  );
}

export default App;
