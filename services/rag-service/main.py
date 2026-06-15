from fastapi import FastAPI
from pydantic import BaseModel

from rag_service import ask_rag

app = FastAPI(title="RAG Service")


class RAGRequest(BaseModel):
    question: str


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/rag")
def rag_query(data: RAGRequest):

    answer = ask_rag(data.question)

    return {
        "answer": answer
    }
