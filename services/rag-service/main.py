import logging
from fastapi import FastAPI
from pydantic import BaseModel

from rag_service import ask_rag

app = FastAPI(title="RAG Service")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


class RAGRequest(BaseModel):
    question: str


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/rag")
def rag_query(data: RAGRequest):

    logger.info(f"Question received: {data.question}")

    answer = ask_rag(data.question)

    logger.info("RAG answer generated")

    return {
        "answer": answer
    }
