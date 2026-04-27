from langchain_ollama import OllamaEmbeddings
from functools import lru_cache

@lru_cache()
def get_embeddings():
    return OllamaEmbeddings(model="nomic-embed-text")