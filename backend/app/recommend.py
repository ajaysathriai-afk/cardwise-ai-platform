from pydantic import BaseModel
from typing import List

class UserInput(BaseModel):
    categories: List[str]
    monthly_spend: int
    priority: str
    fee_tolerance: str
    income: str

def generate_recommendation(data: UserInput):
    if "travel" in data.categories:
        return {
            "recommended_card": "Sapphire Reserve Black",
            "reason": "Best for travel and lounge rewards",
            "confidence": 96
        }

    if "shopping" in data.categories:
        return {
            "recommended_card": "Cashback Max Pro",
            "reason": "High cashback on shopping",
            "confidence": 93
        }

    return {
        "recommended_card": "Everyday Smart Saver",
        "reason": "Balanced lifestyle rewards",
        "confidence": 88
    }