from chains.base_chain import run_prompt
import json

class GapAgent:

    def run(self, resume_json, transcript_json, job_description):

        prompt = f"""
You are Skill Gap and Consistency Agent.

You are given:

1. Resume Structured Data:
{resume_json}

2. Transcript Structured Data:
{transcript_json}

3. Job Description:
{job_description}

Your task:

1. Identify skills strongly matching the job.
2. Identify partially matching skills.
3. Identify missing required skills.
4. Detect overstated claims (skills claimed in resume but not demonstrated in transcript).
5. Detect verified claims (skills both claimed and demonstrated).
6. Calculate a skill_match_score (0–100).

Return STRICT JSON:

{{
  "strong_matches": [],
  "partial_matches": [],
  "missing_required_skills": [],
  "overstated_claims": [],
  "verified_claims": [],
  "skill_match_score": 0
}}

Rules:
- Output only valid JSON.
- No explanation.
- No markdown.
"""

        response = run_prompt(prompt)

        try:
            return json.loads(response)
        except:
            return {"error": "Invalid JSON returned", "raw_output": response}