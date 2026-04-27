import time
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.core.vectorstore import get_retriever
from app.core.llm import get_llm
from app.models import QueryResponse, SourceDocument

PROMPT_TEMPLATE = """Eres un asistente experto que responde preguntas basándose ÚNICAMENTE en el contexto proporcionado.

Si la información no está en el contexto, di exactamente: "No encontré información sobre esto en los documentos cargados."

Contexto:
{context}

Pregunta: {question}

Respuesta detallada y precisa:"""

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

def query_documents(question: str, collection_name: str = "default") -> QueryResponse:
    start = time.time()
    retriever = get_retriever(collection_name, k=4)
    llm = get_llm()

    prompt = PromptTemplate(
        template=PROMPT_TEMPLATE,
        input_variables=["context", "question"]
    )

    docs = retriever.invoke(question)
    context = format_docs(docs)
    chain = prompt | llm | StrOutputParser()
    answer = chain.invoke({"context": context, "question": question})

    elapsed = round((time.time() - start) * 1000, 2)

    sources = []
    seen = set()
    for doc in docs:
        source = doc.metadata.get("source", "unknown")
        page = doc.metadata.get("page", None)
        key = f"{source}-{page}"
        if key not in seen:
            seen.add(key)
            sources.append(SourceDocument(
                content=doc.page_content[:300] + "..." if len(doc.page_content) > 300 else doc.page_content,
                source=source,
                page=page,
            ))

    return QueryResponse(answer=answer, sources=sources, query_time_ms=elapsed)