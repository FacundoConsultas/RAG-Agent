from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import documents, query, evaluation
from app.config import get_settings

settings = get_settings()

app = FastAPI(
    title="RAG Agent API",
    description="Enterprise RAG system con evaluación de producción",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/api/documents", tags=["Documents"])
app.include_router(query.router, prefix="/api/query", tags=["Query"])
app.include_router(evaluation.router, prefix="/api/evaluation", tags=["Evaluation"])

@app.get("/")
def root():
    return {"status": "ok", "app": settings.app_name, "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}