# INFRA-PREDICT AI

### AI-Powered Predictive & Prescriptive Intelligence Layer for PAIMANA

> **Predict → Explain → Prioritize → Act**

INFRA-PREDICT AI is an AI-powered decision-support and early-warning system designed to work **on top of PAIMANA**. It analyses infrastructure project data to identify potential **cost, schedule, and execution risks**, explains the reasons behind risk, prioritizes projects requiring attention, and provides actionable recommendations.

---

## 🎯 Problem

PAIMANA provides valuable information about infrastructure projects, but analysing a large number of projects manually can make it difficult to identify:

- Which projects are becoming high-risk?
- Why is a project becoming risky?
- Which project needs attention first?
- What action should be considered?

---

## 💡 Solution

INFRA-PREDICT AI adds an intelligence layer to PAIMANA:

```text
PAIMANA Data
     ↓
Data Processing
     ↓
Cost + Time + Execution Risk
     ↓
Risk Engine
     ↓
Explainable AI (SHAP)
     ↓
Early Warning & Priority Ranking
     ↓
Recommended Action

Core Approach

Predict → Explain → Prioritize → Act

✨ Key Features
Command Center — Portfolio-level project intelligence
National Risk Map — State-wise risk visualization
AI Predictions — Cost, time and execution risk analysis
Explainable AI — Understand why a project is risky
Early Warnings — Identify emerging project risks
Decision Mode — Prioritize where action is required first
Peer Benchmarking — Compare similar projects
Portfolio Analytics — Analyse project-level and portfolio-level trends
AI Risk Briefs — Generate concise executive insights

🤖 AI/ML

The system uses structured project data such as:

Original & revised cost
Cumulative expenditure
Physical progress
Original & revised completion dates
Project duration
Progress and schedule indicators
Technologies
XGBoost — Machine Learning
SHAP — Explainable AI
Scikit-learn — ML utilities and evaluation
Pandas / NumPy — Data processing

AI is used as decision support. Final decisions remain with authorized human decision-makers.

🏗️ Technology Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
SVG India Map
Backend
Python
FastAPI
REST APIs
PostgreSQL / SQLite
Deployment
Vercel — Frontend
Render — Backend
📊 Data Source

The prototype uses official PAIMANA Flash Report data covering:

April 2026
May 2026
June 2026
July 2026

The system preserves monthly project records to support historical trend analysis.

No missing project values are fabricated.

🔄 Data Flow
PAIMANA Reports
      ↓
Extraction & Validation
      ↓
Normalized Project Data
      ↓
Feature Engineering
      ↓
AI / Risk Engine
      ↓
FastAPI Backend
      ↓
React Dashboard
📁 Project Structure
INFRA-PREDICT-AI/
├── backend/
│   ├── app/
│   ├── data/
│   ├── models/
│   ├── services/
│   ├── training/
│   └── tests/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
⚙️ Setup
Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
cd frontend
npm install
npm run dev
