from langchain_ollama import ChatOllama
from functools import lru_cache

@lru_cache()
def get_llm():
    return ChatOllama(model="llama3.2", temperature=0)