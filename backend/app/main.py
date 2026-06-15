from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, recommendations, rag

app = FastAPI(
    title="CardWise AI Backend",
    description="AI-powered fintech recommendation backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(recommendations.router)
app.include_router(rag.router)