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

    income = int(data.income)

    scored_cards = []

    for card in cards:

        score = 0

        # Income eligibility
        if income >= card["min_income"]:
            score += 40

        # Reward rate
        score += int(card["reward_rate"] * 5)

        # Lounge access bonus
        if card["lounge_access"]:
            score += 15

        # Fee tolerance
        if data.fee_tolerance == "low":
            if card["annual_fee"] <= 1000:
                score += 20

        elif data.fee_tolerance == "medium":
            if card["annual_fee"] <= 3000:
                score += 20

        else:
            score += 20

        scored_cards.append({
            "card": card,
            "score": score
        })

    scored_cards.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    top = scored_cards[0]

    return {
    "top": {
        "card": {
            "id": str(top["card"]["id"]),
            "name": top["card"]["card_name"],
            "annualFee": top["card"]["annual_fee"],
            "accent": "#7c5cff",
            "rewardCurrency": "Points",
            "loungeDomestic": 12 if top["card"]["lounge_access"] else 0,
            "loungeIntl": 4 if top["card"]["lounge_access"] else 0
        },
        "score": top["score"],
        "confidence": top["score"],
        "reasons": [
            top["card"]["description"]
        ],
        "estAnnualReward": (
            data.monthly_spend *
            12 *
            top["card"]["reward_rate"] / 100
        )
    },

    "alts": [
        {
            "card": {
                "id": str(item["card"]["id"]),
                "name": item["card"]["card_name"],
                "annualFee": item["card"]["annual_fee"],
                "accent": "#00c2ff",
                "rewardCurrency": "Points",
                "loungeDomestic": 12 if item["card"]["lounge_access"] else 0,
                "loungeIntl": 4 if item["card"]["lounge_access"] else 0
            },
            "score": item["score"],
            "confidence": item["score"],
            "reasons": [
                item["card"]["description"]
            ],
            "estAnnualReward": (
                data.monthly_spend *
                12 *
                item["card"]["reward_rate"] / 100
            )
        }
        for item in scored_cards[1:3]
    ]
}