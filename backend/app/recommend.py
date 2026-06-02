from pydantic import BaseModel
from typing import List
from app.database import supabase

class UserInput(BaseModel):
    categories: List[str]
    monthly_spend: int
    priority: str
    fee_tolerance: str
    income: str

def generate_recommendation(data: UserInput):

    category = data.categories[0]

    result = (
        supabase.table("cards")
        .select("*")
        .eq("category", category)
        .execute()
    )

    cards = result.data

    if not cards:
        return {
            "recommended_card": "No Match Found",
            "reason": "No cards available",
            "confidence": 0
        }

    best_card = cards[0]

    return {
        "recommended_card": best_card["card_name"],
        "reason": best_card["description"],
        "confidence": 95
    }