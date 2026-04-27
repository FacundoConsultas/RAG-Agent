from fastapi import APIRouter, HTTPException
from app.models import QueryRequest, QueryResponse
from app.services.retrieval import query_documents

router = APIRouter()

@router.post("/", response_model=QueryResponse)
async def query(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="La pregunta no puede estar vacía")
    try:
        result = query_documents(req.question, req.collection_name)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))