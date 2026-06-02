from app.recommend import generate_recommendation
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="CardWise AI Backend",
    description="AI-powered fintech recommendation backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    categories: List[str]
    monthly_spend: int
    priority: str
    fee_tolerance: str
    income: str

@app.get("/")
def home():
    return {
        "message": "CardWise AI Backend Running 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.post("/recommend")
def recommend(user: UserInput):

    recommendation = generate_recommendation(user)

    return recommendation