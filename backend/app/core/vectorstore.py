from langchain_chroma import Chroma
from app.core.embeddings import get_embeddings
from app.config import get_settings

def get_vectorstore(collection_name: str = "default") -> Chroma:
    settings = get_settings()
    return Chroma(
        collection_name=collection_name,
        embedding_function=get_embeddings(),
        persist_directory=settings.chroma_path
    )

def get_retriever(collection_name: str = "default", k: int = 4):
    vectorstore = get_vectorstore(collection_name)
    return vectorstore.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": k, "score_threshold": 0.3}
    )