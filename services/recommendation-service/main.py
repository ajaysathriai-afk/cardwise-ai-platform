import logging
from fastapi import FastAPI
from recommend import UserInput, generate_recommendation

app = FastAPI(title="Recommendation Service")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/recommend")
def recommend_endpoint(data: UserInput):

    logger.info("Generating recommendation")

    result = generate_recommendation(data)

    logger.info("Recommendation generated successfully")

    return result
