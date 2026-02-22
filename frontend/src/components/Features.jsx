function Features() {
  return (
    <section className="section">
      <h2>What We Offer</h2>

      <div className="features-grid">
        <div className="glass">
          <h3>Resume Intelligence</h3>
          <p>Extracts claims, experience depth, and risk flags.</p>
        </div>

        <div className="glass">
          <h3>Transcript Analyzer</h3>
          <p>Measures knowledge depth & detects memorization.</p>
        </div>

        <div className="glass">
          <h3>Multi-Agent Debate</h3>
          <p>Simulates a hiring panel discussion.</p>
        </div>

        <div className="glass">
          <h3>Role Recommendation</h3>
          <p>Suggests alternative roles if mismatch detected.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;