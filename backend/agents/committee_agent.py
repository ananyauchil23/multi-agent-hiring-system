from chains.base_chain import run_prompt
import json

class CommitteeAgent:

    def run(self, resume_json, transcript_json, gap_json):

        prompt = f"""
You are Hiring Committee Agent.

You are simulating a technical hiring panel.

You are given:

1. Resume Analysis:
{resume_json}

2. Transcript Analysis:
{transcript_json}

3. Skill Gap Analysis:
{gap_json}

Your task:

- Evaluate overall candidate strength.
- Consider technical depth.
- Consider missing skills.
- Consider overstated claims.
- Balance strengths and weaknesses.
- Provide a final hiring verdict.

Return STRICT JSON:

{{
  "overall_score": 0,
  "verdict": "Strong Hire / Hire / Hire with Concerns / No Hire",
  "confidence_score": 0,
  "strength_summary": "",
  "weakness_summary": "",
  "panel_debate_summary": "",
  "final_reasoning": ""
}}

Rules:
- overall_score: 0–100
- confidence_score: 0–100
- Be realistic and analytical.
- Do NOT leave fields empty.
- Output ONLY JSON.
"""

        response = run_prompt(prompt)

        try:
            return json.loads(response)
        except:
            return {"error": "Invalid JSON returned", "raw_output": response}