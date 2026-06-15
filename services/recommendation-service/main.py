from fastapi import FastAPI
from recommend import UserInput, generate_recommendation

app = FastAPI(title="Recommendation Service")


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/recommend")
def recommend_endpoint(data: UserInput):
    return generate_recommendation(data)
