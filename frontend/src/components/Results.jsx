import React from 'react';

function ScoreRing({score=0}){
  const pct = Math.max(0, Math.min(100, Math.round(score)));
  const r = 56; const c = 2*Math.PI*r; const off = c - (pct/100)*c;
  return (
    <div className="score-ring">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <g transform="translate(70,70)">
          <circle r={r} fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
          <circle r={r} fill="transparent" stroke="url(#g)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${c} ${c}`} strokeDashoffset={off} transform="rotate(-90)" style={{transition:'stroke-dashoffset 900ms ease'}} />
        </g>
        <defs>
          <linearGradient id="g" x1="0%" x2="100%"><stop offset="0%" stopColor="#7b61ff"/><stop offset="100%" stopColor="#61d4ff"/></linearGradient>
        </defs>
      </svg>
      <div className="score-value">{pct}%</div>
    </div>
  );
}

export default function Results({ result }){
  if(!result || !result.final_decision) return null;
  const fd = result.final_decision;
  const roles = (result.role_recommendation && result.role_recommendation.recommended_roles) || [];

  return (
    <section className="results-section">
      <div className="results-top">
        <ScoreRing score={fd.overall_score || 0} />

        <div className="conf-panel glass-card">
          <div className="conf-label">Confidence</div>
          <div className="conf-bar"><div className="conf-fill" style={{width:`${(fd.confidence_score||0)*100}%`}}></div></div>
          <div className="conf-num">{Math.round((fd.confidence_score||0)*100)}%</div>
        </div>
      </div>

      <div className="sw-cards">
        <div className="glass-card sw-card">
          <h4>Strengths</h4>
          <p>{fd.strength_summary}</p>
        </div>
        <div className="glass-card sw-card">
          <h4>Weaknesses</h4>
          <p>{fd.weakness_summary}</p>
        </div>
      </div>

      <div className="roles-list">
        {roles.map((r,i)=> (
          <div key={i} className="role-chip glass-card">
            <div className="role-head"><strong>{r.role_name}</strong><span className="role-score">{r.match_score}%</span></div>
            <p className="muted small">{r.reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
