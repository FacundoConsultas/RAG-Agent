# RAG Agent — Enterprise Document Q&A System

Sistema RAG (Retrieval-Augmented Generation) completo con evaluación de calidad en tiempo real.

## Stack
- **Backend:** Python 3.14, FastAPI, LangChain, ChromaDB, Ollama
- **Frontend:** React, Vite, Tailwind CSS
- **LLM local:** llama3.2 (gratis, sin API keys)
- **Embeddings:** nomic-embed-text

## Features
- Ingesta de PDFs con chunking inteligente
- Búsqueda semántica con ChromaDB
- Respuestas con citación de fuentes
- Métricas: Faithfulness, Answer Relevancy, Context Precision
- 100% local, sin costos de API

## Setup
### Backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

### Frontend
npm install
npm run dev
