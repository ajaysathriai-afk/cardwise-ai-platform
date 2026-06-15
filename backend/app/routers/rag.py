from fastapi import APIRouter
from pydantic import BaseModel
from app.rag.rag_service import ask_rag

router = APIRouter()


class RAGRequest(BaseModel):
    question: str


@router.post("/ask-card-question")
def ask_card_question(data: RAGRequest):
    answer = ask_rag(data.question)
    return {
        "answer": answer
    }
