from chains.base_chain import run_prompt
import json

class TranscriptAgent:

    def run(self, transcript_text: str):

        prompt = f"""
You are Transcript Evaluation Agent.

The transcript may contain:
- Technical questions
- Candidate answers
- Follow-up discussions
- System design explanations

Analyze the candidate's responses and return STRICT JSON:

{{
  "demonstrated_skills": [],
  "strong_answers": [],
  "weak_answers": [],
  "depth_score": 0,
  "communication_clarity_score": 0,
  "memorization_risk": ""
}}

Rules:
- Only output valid JSON.
- No explanations.
- No markdown.
- No extra text.

Transcript:
{transcript_text}
"""

        response = run_prompt(prompt)

        try:
            return json.loads(response)
        except:
            return {"error": "Invalid JSON returned", "raw_output": response}