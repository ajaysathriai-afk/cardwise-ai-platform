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

    top = {
        "card": {
            "id": "sapphire-reserve",
            "name": "Sapphire Reserve Black",
            "annualFee": 5000,
            "accent": "#7c5cff",
            "rewardCurrency": "Miles",
            "loungeDomestic": 99,
            "loungeIntl": 12
        },
        "score": 92,
        "confidence": 96,
        "reasons": [
            "Best-in-class travel rewards for frequent flyers.",
            "High lounge access aligns with your travel lifestyle.",
            "Premium milestone benefits offset the annual fee."
        ],
        "estAnnualReward": 48000
    }

    alts = [
        {
            "card": {
                "id": "zenith-plus",
                "name": "Zenith Plus",
                "annualFee": 3000,
                "accent": "#00c2ff",
            },
            "score": 84,
            "confidence": 88,
            "reasons": [
                "Strong cashback across shopping and dining."
            ],
            "estAnnualReward": 32000
        },
        {
            "card": {
                "id": "travel-max",
                "name": "Travel Max Signature",
                "annualFee": 10000,
                "accent": "#ff6b6b",
            },
            "score": 81,
            "confidence": 85,
            "reasons": [
                "Luxury-focused premium travel benefits."
            ],
            "estAnnualReward": 51000
        }
    ]

    return {
        "top": top,
        "alts": alts
    }