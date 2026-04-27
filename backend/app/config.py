from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_name: str = "RAG Agent"
    debug: bool = True
    openai_api_key: str
    chroma_path: str = "./chroma_db"
    chunk_size: int = 1000
    chunk_overlap: int = 200
    embedding_model: str = "text-embedding-3-small"
    llm_model: str = "gpt-4o-mini"
    retriever_k: int = 4

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()