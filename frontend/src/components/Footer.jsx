// import { useState } from "react";

// function Evaluation() {
//   const [resume, setResume] = useState("");
//   const [transcript, setTranscript] = useState("");
//   const [jd, setJd] = useState("");
//   const [roles, setRoles] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleEvaluate = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       setResult(null);

//       const response = await fetch("http://localhost:8000/evaluate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           resume,
//           transcript,
//           job_description: jd,
//           available_roles: roles.split(",").map(r => r.trim())
//         })
//       });

//       const data = await response.json();
//       console.log("Backend Response:", data);

//       setResult(data);
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Something went wrong while evaluating.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="evaluation" id="evaluation">
//       <div className="glass">

//         <h2>Live Candidate Evaluation</h2>
//         <p className="muted">
//           Simulate a real multi-agent hiring panel.
//         </p>

//         {/* FORM */}
//         <label>Resume</label>
//         <textarea
//           rows="5"
//           value={resume}
//           onChange={(e) => setResume(e.target.value)}
//         />

//         <label>Transcript</label>
//         <textarea
//           rows="5"
//           value={transcript}
//           onChange={(e) => setTranscript(e.target.value)}
//         />

//         <label>Job Description</label>
//         <textarea
//           rows="5"
//           value={jd}
//           onChange={(e) => setJd(e.target.value)}
//         />

//         <label>Available Roles (comma separated)</label>
//         <input
//           type="text"
//           value={roles}
//           onChange={(e) => setRoles(e.target.value)}
//         />

//         <button
//           className="primary-btn"
//           onClick={handleEvaluate}
//           disabled={loading}
//         >
//           {loading ? "Evaluating..." : "Evaluate Candidate"}
//         </button>

//         {error && <p className="error">{error}</p>}

//       </div>

//       {/* RESULTS */}
//       {result && result.final_decision && (
//         <div className="glass" style={{ marginTop: "40px" }}>

//           <h2>Final Decision</h2>

//           <p><strong>Verdict:</strong> {result.final_decision.verdict}</p>
//           <p><strong>Overall Score:</strong> {result.final_decision.overall_score}</p>
//           <p><strong>Confidence:</strong> {result.final_decision.confidence_score}</p>

//           <h3>Strengths</h3>
//           <p>{result.final_decision.strength_summary}</p>

//           <h3>Weaknesses</h3>
//           <p>{result.final_decision.weakness_summary}</p>

//           {result.role_recommendation &&
//             result.role_recommendation.recommended_roles &&
//             result.role_recommendation.recommended_roles.length > 0 && (
//               <>
//                 <h3>Recommended Roles</h3>
//                 <div className="roles-grid">
//                   {result.role_recommendation.recommended_roles.map((role, index) => (
//                     <div key={index} className="role-card">
//                       <strong>{role.role_name}</strong>
//                       <p>Match Score: {role.match_score}%</p>
//                       <p className="muted">{role.reason}</p>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//         </div>
//       )}
//     </section>
//   );
// }

// export default Evaluation;
function Footer() {
  return (
    <div className="footer">
      © 2026 Autonomous Interview Panel — Hackathon Edition 🚀
    </div>
  );
}

export default Footer;