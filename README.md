# CardWise AI — AI-Powered Fintech Recommendation Platform

CardWise AI is a full-stack AI-powered fintech recommendation platform that helps users discover the most suitable credit cards based on spending behavior, lifestyle preferences, fee sensitivity, and reward optimization goals.

The platform delivers a conversational onboarding experience, explainable AI recommendations, interactive reward simulation, card comparison workflows, and application flows through a premium fintech-inspired UI.

---

## Features

* AI-powered credit card recommendation engine
* Personalized reward optimization logic
* Conversational multi-step onboarding journey
* Explainable recommendation reasoning
* Interactive reward simulator
* Side-by-side card comparison engine
* OTP-based application workflow
* Responsive fintech dashboard
* Premium UI animations using Framer Motion
* FastAPI backend integration
* Modular scalable architecture

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Zustand

### Backend

* FastAPI
* Python
* REST APIs
* Pydantic

---

## Architecture

```text
Frontend (React + Tailwind)
        ↓
FastAPI Backend APIs
        ↓
Recommendation Engine
        ↓
AI Scoring + Ranking Logic
```

---

## Project Structure

```text
cardwise-ai/
├── frontend/
├── backend/
├── screenshots/
├── architecture/
└── README.md
```

---

## Screenshots

### Landing Page

![Landing](./screenshots/landing.png)

### Recommendation Engine

![Recommendation](./screenshots/recommendation.png)

### Compare Cards

![Compare](./screenshots/compare.png)

### OTP Flow

![OTP](./screenshots/otp.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

---

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

---

## Future Enhancements

* PostgreSQL/Supabase persistence
* OpenAI/Gemini integration
* Vector search + RAG pipelines
* Microservices architecture
* Docker + CI/CD
* AWS/Azure deployment

---

## Author

Ajay Kumar Sathri
