from pydantic import BaseModel
from typing import List
from app.database import supabase
import time


class UserInput(BaseModel):
    categories: List[str]
    monthly_spend: int
    priority: str
    fee_tolerance: str
    income: str


def generate_recommendation(data: UserInput):

    start = time.time()

    category = data.categories[0]

    result = (
        supabase.table("cards")
        .select("*")
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

        # Dynamic reward column
        reward_col = f"{category}_reward"
        reward = float(card.get(reward_col, 0) or 0)

        score += int(reward * 5)

        # Lounge bonus
        if card["lounge_access"]:
            score += 15

        # Fee preference
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

        alt_card = item["card"]

        reward_col = f"{category}_reward"
        alt_reward = float(
            alt_card.get(reward_col, 0) or 0
        )

        alts.append({
            "card": {
                "id": str(alt_card["id"]),
                "name": alt_card["card_name"],
                "annualFee": alt_card["annual_fee"],
                "joiningFee": alt_card["joining_fee"],
                "feeWaiverSpend": alt_card["fee_waiver_spend"],
                "minIncome": alt_card["min_income"],
                "forexMarkup": float(alt_card["forex_markup"]),
                "topPerks": alt_card["top_perks"] or [],
                "accent": alt_card["accent"],
                "rewardCurrency": alt_card["reward_currency"],
                "loungeDomestic": alt_card["lounge_domestic"],
                "loungeIntl": alt_card["lounge_intl"]
            },
            "score": item["score"],
            "confidence": item["score"],
            "reasons": [
                f"{alt_reward}% rewards on {category} spends",
                f"₹{alt_card['annual_fee']} annual fee",
                f"{alt_card['lounge_domestic']} lounge visits included"
            ],
            "estAnnualReward": int(
                data.monthly_spend * 12 * (alt_reward / 100)
            )
        })

    card = top["card"]

    reward_col = f"{category}_reward"

    top_reward = float(
        card.get(reward_col, 0) or 0
    )

    insert_result = (
        supabase.table("recommendations")
        .insert({
            "card_id": card["id"],
            "score": top["score"]
        })
        .execute()
    )

    print("TOP CARD =", card["card_name"])
    print("CATEGORY =", category)
    print("TOP REWARD =", top_reward)
    print("INSERT RESULT =", insert_result)
    print("TIME TAKEN =", time.time() - start)

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
            "reasons": [
                f"{top_reward}% rewards on {category} spends",
                f"₹{card['annual_fee']} annual fee",
                f"{card['lounge_domestic']} lounge visits included"
            ],
            "estAnnualReward": int(
                data.monthly_spend * 12 * (top_reward / 100)
            )
        },
        "alts": alts
    }