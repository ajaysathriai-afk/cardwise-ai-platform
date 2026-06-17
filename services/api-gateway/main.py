import logging
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
import httpx

app = FastAPI(title="CardWise API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/recommend-health")
async def recommendation_health():

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.get(
            "http://recommendation-service:8001/health"
        )

    return response.json()


@app.get("/rag-health")
async def rag_health():

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.get(
            "http://rag-service:8002/health"
        )

    return response.json()

@app.post("/recommend")
async def recommend(request: Request):

    payload = await request.json()
    
    logger.info("Recommendation request received")
       
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "http://recommendation-service:8001/recommend",
            json=payload
        )

    logger.info("Recommendation response returned")
    
    return response.json()

@app.post("/rag")
async def rag(request: Request):

    payload = await request.json()

    logger.info("RAG request received")

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "http://rag-service:8002/rag",
            json=payload
        )

    logger.info("RAG response returned")

    return response.json()
