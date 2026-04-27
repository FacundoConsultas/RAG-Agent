import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.ingestion import process_pdf, process_text

router = APIRouter()
UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    collection_name: str = Form(default="default")
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Solo se aceptan archivos PDF por ahora")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    try:
        result = process_pdf(file_path, collection_name)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-text")
async def upload_text(
    text: str = Form(...),
    source_name: str = Form(default="manual_input"),
    collection_name: str = Form(default="default")
):
    try:
        result = process_text(text, source_name, collection_name)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/collections/{collection_name}/stats")
async def get_collection_stats(collection_name: str):
    from app.core.vectorstore import get_vectorstore
    try:
        vs = get_vectorstore(collection_name)
        count = vs._collection.count()
        return {"collection": collection_name, "total_chunks": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))