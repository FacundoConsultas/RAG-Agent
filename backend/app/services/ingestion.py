import os
import time
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from app.core.vectorstore import get_vectorstore
from app.config import get_settings

settings = get_settings()

def process_pdf(file_path: str, collection_name: str = "default") -> dict:
    start = time.time()
    loader = PyPDFLoader(file_path)
    pages = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
        separators=["\n\n", "\n", ".", "!", "?", ",", " ", ""],
        length_function=len
    )
    chunks = splitter.split_documents(pages)

    filename = os.path.basename(file_path)
    for i, chunk in enumerate(chunks):
        chunk.metadata["source"] = filename
        chunk.metadata["chunk_index"] = i
        chunk.metadata["total_chunks"] = len(chunks)

    vectorstore = get_vectorstore(collection_name)
    vectorstore.add_documents(chunks)

    elapsed = round((time.time() - start) * 1000, 2)
    return {"filename": filename, "pages": len(pages), "chunks": len(chunks), "collection": collection_name, "processing_time_ms": elapsed}

def process_text(text: str, source_name: str, collection_name: str = "default") -> dict:
    start = time.time()
    doc = Document(page_content=text, metadata={"source": source_name})

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
    )
    chunks = splitter.split_documents([doc])

    for i, chunk in enumerate(chunks):
        chunk.metadata["chunk_index"] = i
        chunk.metadata["total_chunks"] = len(chunks)

    vectorstore = get_vectorstore(collection_name)
    vectorstore.add_documents(chunks)

    elapsed = round((time.time() - start) * 1000, 2)
    return {"filename": source_name, "pages": 1, "chunks": len(chunks), "collection": collection_name, "processing_time_ms": elapsed}