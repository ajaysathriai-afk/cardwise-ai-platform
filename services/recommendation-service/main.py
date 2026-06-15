from fastapi import FastAPI

app = FastAPI(title="Recommendation Service")


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/recommend")
def recommend():
    return {
        "message": "recommendation service working"
    }
