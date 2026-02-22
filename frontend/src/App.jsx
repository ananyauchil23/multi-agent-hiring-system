import { useState } from "react";
import extractText from "react-pdftotext";

function App() {
  const [resume, setResume] = useState("");
  const [transcript, setTranscript] = useState("");
  const [jd, setJd] = useState("");
  const [roles, setRoles] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    try {
      setPdfLoading(true);
      setError(null);
      
      const text = await extractText(file);
      setResume(text);
    } catch (err) {
      console.error("PDF Error:", err);
      setError("Failed to extract text from PDF.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleEvaluate = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch("http://localhost:8000/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          resume,
          transcript,
          job_description: jd,
          available_roles: roles.split(",").map(r => r.trim())
        })
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      setResult(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong while evaluating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Autonomous Technical Interview Panel</h1>

      <h3>Resume</h3>
      <input
        type="file"
        accept=".pdf"
        onChange={handlePdfUpload}
        style={{ marginBottom: "0.5rem" }}
      />
      {pdfLoading && <p style={{ fontSize: "0.8rem" }}>Extracting text from PDF...</p>}
      <textarea
        rows="5"
        style={{ width: "100%" }}
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <h3>Transcript</h3>
      <textarea
        rows="5"
        style={{ width: "100%" }}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <h3>Job Description</h3>
      <textarea
        rows="5"
        style={{ width: "100%" }}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
      />

      <h3>Available Roles (comma separated)</h3>
      <input
        type="text"
        style={{ width: "100%" }}
        value={roles}
        onChange={(e) => setRoles(e.target.value)}
      />

      <br /><br />

      <button onClick={handleEvaluate} disabled={loading}>
        {loading ? "Evaluating..." : "Evaluate Candidate"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}

      {result && result.final_decision && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Final Decision</h2>
          <p><strong>Verdict:</strong> {result.final_decision.verdict}</p>
          <p><strong>Overall Score:</strong> {result.final_decision.overall_score}</p>
          <p><strong>Confidence:</strong> {result.final_decision.confidence_score}</p>

          <h3>Strengths</h3>
          <p>{result.final_decision.strength_summary}</p>

          <h3>Weaknesses</h3>
          <p>{result.final_decision.weakness_summary}</p>

          {result.role_recommendation && (
            <>
              <h3>Recommended Roles</h3>

              {result.role_recommendation.recommended_roles &&
              result.role_recommendation.recommended_roles.length > 0 ? (
                result.role_recommendation.recommended_roles.map((role, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <strong>{role.role_name}</strong> — {role.match_score}%
                    <p>{role.reason}</p>
                  </div>
                ))
              ) : (
                <p>No alternative roles recommended.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
