from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.recommend import generate_recommendation

router = APIRouter()


class UserInput(BaseModel):
    categories: List[str]
    monthly_spend: int
    priority: str
    fee_tolerance: str
    income: str


@router.post("/recommend")
def recommend(user: UserInput):
    result = generate_recommendation(user)
    return result
