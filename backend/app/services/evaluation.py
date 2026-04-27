from app.models import EvaluationRequest, EvaluationResult

def evaluate_response(req: EvaluationRequest) -> EvaluationResult:
    answer = req.answer.lower()
    question = req.question.lower()
    contexts = [c.lower() for c in req.contexts]
    full_context = " ".join(contexts)

    stop_words = {"el","la","los","las","un","una","de","en","y","a","que","es","se","no","con","por","su","lo"}

    answer_words = set(answer.split()) - stop_words
    context_words = set(full_context.split()) - stop_words
    question_words = set(question.split()) - stop_words

    faithfulness = round(min(len(answer_words & context_words) / len(answer_words), 1.0), 3) if answer_words else 0.0
    answer_relevancy = round(min(len(question_words & answer_words) / len(question_words), 1.0), 3) if question_words else 0.0
    context_precision = round(min(len(question_words & context_words) / len(question_words), 1.0), 3) if question_words and context_words else 0.0
    overall = round((faithfulness * 0.4 + answer_relevancy * 0.4 + context_precision * 0.2), 3)

    return EvaluationResult(
        faithfulness=faithfulness,
        answer_relevancy=answer_relevancy,
        context_precision=context_precision,
        overall_score=overall
    )