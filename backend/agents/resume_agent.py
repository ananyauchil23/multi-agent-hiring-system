from chains.base_chain import run_prompt
import json

class ResumeAgent:

    def run(self, resume_text: str):

        prompt = f"""
You are Resume Analyzer Agent.

Extract the following information in STRICT JSON format:

{{
  "claimed_skills": [],
  "years_of_experience": "",
  "strong_claims": [],
  "risk_flags": []
}}

Rules:
- Only output valid JSON.
- Do not include explanations.
- Do not include markdown.
- Do not include extra text.

Resume:
{resume_text}
"""

        response = run_prompt(prompt)

        # Try parsing to ensure valid JSON
        try:
            return json.loads(response)
        except:
            return {"error": "Invalid JSON returned", "raw_output": response}