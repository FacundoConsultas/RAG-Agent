import { FileText, Clock, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function AnswerCard({ result }) {
  if (!result) return null
  const { answer, sources, query_time_ms, evaluation } = result

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">Respuesta generada</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={12} /><span>{query_time_ms}ms</span>
          </div>
        </div>
        <div className="text-slate-200 text-sm leading-relaxed prose prose-invert max-w-none">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>

      {evaluation && (
        <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Métricas de evaluación</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Faithfulness', evaluation.faithfulness, 'Fidelidad al contexto'],
              ['Relevancy', evaluation.answer_relevancy, 'Relevancia de respuesta'],
              ['Precision', evaluation.context_precision, 'Precisión del contexto'],
            ].map(([label, value, desc]) => {
              const pct = Math.round((value || 0) * 100)
              const color = pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444'
              return (
                <div key={label} className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className="text-lg font-bold" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{desc}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-sm text-slate-400">Score general</span>
            <span className="text-xl font-bold text-white">{Math.round(evaluation.overall_score * 100)}%</span>
          </div>
        </div>
      )}

      {sources && sources.length > 0 && (
        <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Fuentes</p>
          <div className="space-y-3">
            {sources.map((s, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={12} className="text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-400">{s.source}</span>
                  {s.page != null && <span className="text-xs text-slate-500">· Pág {s.page + 1}</span>}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}