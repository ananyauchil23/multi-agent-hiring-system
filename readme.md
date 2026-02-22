# 🚀    MULTI-AGENT-HIRING-SYSTEM

ResuMe is an AI-powered multi-agent system that simulates a real technical hiring panel.

Instead of simple keyword matching, it performs structured reasoning across resumes, interview transcripts, and job descriptions to deliver intelligent hiring decisions and role recommendations.

---

## 🧠 Problem Statement

Traditional AI interview tools:
- Rely heavily on keyword matching
- Cannot detect contradictions between resume and interview
- Fail to evaluate actual technical depth
- Do not simulate real hiring committee reasoning
- Do not suggest alternative roles

ResuMe solves this by building a multi-agent AI evaluation system that mimics a real technical hiring panel.

---

## ⚙️ How It Works

### 1️⃣ Resume Analysis Agent
Extracts:
- Claimed skills
- Experience level
- Strong claims
- Risk flags

---

### 2️⃣ Transcript Evaluation Agent
Analyzes:
- Demonstrated skills
- Technical depth
- Communication clarity
- Memorization risk

---

### 3️⃣ Skill Gap Agent
Cross-validates:
- Resume vs Transcript
- Candidate vs Job Description
- Identifies missing skills
- Detects overstated claims
- Generates skill match score

---

### 4️⃣ Committee Agent
Simulates a hiring panel discussion:
- Balances strengths and weaknesses
- Produces final verdict
- Assigns overall score
- Provides confidence score
- Generates structured reasoning

---

### 5️⃣ Role Recommendation Agent
If the candidate is not fit for the applied role:
- Suggests alternative roles
- Assigns match scores
- Provides reasoning

---

## 🏗 System Architecture

Frontend (React + Vite)  
⬇  
FastAPI Backend  
⬇  
LangChain Orchestration  
⬇  
Multi-Agent LLM System  
⬇  
Structured JSON Output  

---

## 🛠 Tech Stack

### Backend
- FastAPI
- LangChain
- OpenRouter (LLM Provider)
- Pydantic
- Python

### Frontend
- React (Vite)
- SVG Score Visualization
- Responsive SaaS Layout

---




## 🚀 Running the Project Locally

### 🔹 Backend
```bash
##create virtual environment
python -m venv venv
Activate it:

##Windows:
venv\Scripts\activate
Mac/Linux:
source venv/bin/activate

##Install dependencies:

pip install -r requirements.txt

##Create a .env file inside backend folder and add your API key:

OPENROUTER_API_KEY=your_api_key_here

##Run backend server:

uvicorn main:app --reload

##Backend runs at:

http://localhost:8000



