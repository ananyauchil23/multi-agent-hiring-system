import React, { useEffect, useRef } from 'react';

export default function Hero({ onStart }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    requestAnimationFrame(() => el && el.classList.add('show'));
  }, []);

  return (
    <header className="hero-section" ref={ref}>
      <div className="hero-bg" aria-hidden />
      <div className="hero-card glass-card">
        <h1 className="hero-title">ResuMe — Intelligent Hiring Powered by AI</h1>
        <p className="hero-sub">Multi-agent evaluation combining resume, transcript, skill-gap detection and committee scoring for confident hiring decisions.</p>
        <div className="hero-actions">
          <button className="cta-btn" onClick={onStart}>Start Evaluation</button>
        </div>
      </div>
    </header>
  );
}