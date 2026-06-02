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

    income_map = {
        "lt6": 500000,
        "6to12": 900000,
        "12to25": 1800000,
        "gt25": 3000000
    }

    income = income_map.get(data.income, 500000)

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

    alts = []

    for item in scored_cards[1:3]:

        card = item["card"]

        alts.append({
            "card": {
                "id": str(card["id"]),
                "name": card["card_name"],
                "annualFee": card["annual_fee"],
                "joiningFee": card["joining_fee"],
                "feeWaiverSpend": card["fee_waiver_spend"],
                "minIncome": card["min_income"],
                "forexMarkup": float(card["forex_markup"]),
                "topPerks": card["top_perks"] or [],
                "accent": card["accent"],
                "rewardCurrency": card["reward_currency"],
                "loungeDomestic": card["lounge_domestic"],
                "loungeIntl": card["lounge_intl"]
            },
            "score": item["score"],
            "confidence": item["score"],
            "reasons": [card["description"]],
            "estAnnualReward": int(data.monthly_spend * 12 * (card["reward_rate"] / 100))
        })

    card = top["card"]

    return {
        "top": {
            "card": {
                "id": str(card["id"]),
                "name": card["card_name"],
                "annualFee": card["annual_fee"],
                "joiningFee": card["joining_fee"],
                "feeWaiverSpend": card["fee_waiver_spend"],
                "minIncome": card["min_income"],
                "forexMarkup": float(card["forex_markup"]),
                "topPerks": card["top_perks"] or [],
                "accent": card["accent"],
                "rewardCurrency": card["reward_currency"],
                "loungeDomestic": card["lounge_domestic"],
                "loungeIntl": card["lounge_intl"]
            },
            "score": top["score"],
            "confidence": top["score"],
            "reasons": [card["description"]],
            "estAnnualReward": int(data.monthly_spend * 12 * (card["reward_rate"] / 100))
        },
        "alts": alts
    }