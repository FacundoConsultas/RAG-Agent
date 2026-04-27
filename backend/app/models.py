from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class QueryRequest(BaseModel):
    question: str
    collection_name: str = "default"

class SourceDocument(BaseModel):
    content: str
    source: str
    page: Optional[int] = None
    score: Optional[float] = None

class QueryResponse(BaseModel):
    answer: str
    sources: List[SourceDocument]
    query_time_ms: float
    tokens_used: Optional[int] = None

class DocumentInfo(BaseModel):
    id: str
    filename: str
    collection: str
    chunks: int
    uploaded_at: datetime
    size_bytes: int

class EvaluationRequest(BaseModel):
    question: str
    answer: str
    contexts: List[str]
    ground_truth: Optional[str] = None

class EvaluationResult(BaseModel):
    faithfulness: float
    answer_relevancy: float
    context_precision: Optional[float] = None
    context_recall: Optional[float] = None
    overall_score: float