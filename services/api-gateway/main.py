from fastapi import FastAPI
import httpx

app = FastAPI(title="CardWise API Gateway")


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/recommend-health")
async def recommendation_health():

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8001/health"
        )

    return response.json()


@app.get("/rag-health")
async def rag_health():

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "http://localhost:8002/health"
        )

    return response.json()
@app.post("/recommend")
async def recommend():

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8001/recommend"
        )

    return response.json()

