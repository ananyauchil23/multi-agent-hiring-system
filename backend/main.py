from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents.resume_agent import ResumeAgent
from agents.transcript_agent import TranscriptAgent
from agents.gap_agent import GapAgent
from agents.committee_agent import CommitteeAgent

app = FastAPI()

# ---------------------------
# Enable CORS (for React frontend)
# ---------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Request Models
# ---------------------------

class ResumeRequest(BaseModel):
    resume: str

class TranscriptRequest(BaseModel):
    transcript: str

class GapRequest(BaseModel):
    resume: str
    transcript: str
    job_description: str

class FullEvaluationRequest(BaseModel):
    resume: str
    transcript: str
    job_description: str

# ---------------------------
# Health Check
# ---------------------------

@app.get("/")
def root():
    return {"message": "Backend running successfully 🚀"}

# ---------------------------
# Resume Analysis
# ---------------------------

@app.post("/analyze-resume")
def analyze_resume(data: ResumeRequest):
    agent = ResumeAgent()
    return agent.run(data.resume)

# ---------------------------
# Transcript Analysis
# ---------------------------

@app.post("/analyze-transcript")
def analyze_transcript(data: TranscriptRequest):
    agent = TranscriptAgent()
    return agent.run(data.transcript)

# ---------------------------
# Gap Analysis (Pipeline)
# ---------------------------

@app.post("/analyze-gap")
def analyze_gap(data: GapRequest):

    resume_agent = ResumeAgent()
    transcript_agent = TranscriptAgent()
    gap_agent = GapAgent()

    resume_result = resume_agent.run(data.resume)
    transcript_result = transcript_agent.run(data.transcript)

    gap_result = gap_agent.run(
        resume_result,
        transcript_result,
        data.job_description
    )

    return {
        "resume_analysis": resume_result,
        "transcript_analysis": transcript_result,
        "gap_analysis": gap_result
    }

# ---------------------------
# Full Evaluation Pipeline
# ---------------------------

@app.post("/evaluate")
def full_evaluation(data: FullEvaluationRequest):

    resume_agent = ResumeAgent()
    transcript_agent = TranscriptAgent()
    gap_agent = GapAgent()
    committee_agent = CommitteeAgent()

    # Stage 1
    resume_result = resume_agent.run(data.resume)

    # Stage 2
    transcript_result = transcript_agent.run(data.transcript)

    # Stage 3
    gap_result = gap_agent.run(
        resume_result,
        transcript_result,
        data.job_description
    )

    # Stage 4
    committee_result = committee_agent.run(
        resume_result,
        transcript_result,
        gap_result
    )

    return {
        "resume_analysis": resume_result,
        "transcript_analysis": transcript_result,
        "gap_analysis": gap_result,
        "final_decision": committee_result
    }