import { useState } from 'react'
import QueryBox from '../components/QueryBox'
import AnswerCard from '../components/AnswerCard'
import { MessageSquare } from 'lucide-react'

export default function Query() {
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const handleResult = (r) => {
    setResult(r)
    setHistory(h => [{ question: r.question, time: new Date().toLocaleTimeString() }, ...h].slice(0, 5))
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Consultar</h1>
          <p className="text-slate-400 text-sm">Preguntá sobre tus documentos</p>
        </div>
        <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
          <QueryBox onResult={handleResult} />
        </div>
        {history.length > 0 && (
          <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Historial</p>
            {history.map((h, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare size={12} className="text-indigo-400" />
                  <span className="text-xs text-slate-500">{h.time}</span>
                </div>
                <p className="text-xs text-slate-400 truncate">{h.question}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-2">
        {result ? <AnswerCard result={result} /> : (
          <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-white/10">
            <div className="text-center">
              <MessageSquare size={40} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">La respuesta aparecerá acá</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}