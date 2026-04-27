from fastapi import APIRouter, HTTPException
from app.models import EvaluationRequest, EvaluationResult
from app.services.evaluation import evaluate_response

router = APIRouter()

@router.post("/", response_model=EvaluationResult)
async def evaluate(req: EvaluationRequest):
    try:
        result = evaluate_response(req)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))