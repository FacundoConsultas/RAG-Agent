import { useState } from 'react'
import { Loader, Send } from 'lucide-react'
import { api } from '../api'

export default function QueryBox({ onResult }) {
  const [question, setQuestion] = useState('')
  const [collection, setCollection] = useState('default')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!question.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await api.query(question, collection)
      const data = res.data
      let evalResult = null
      const contexts = data.sources.map(s => s.content)
      if (contexts.length > 0) {
        try { const er = await api.evaluate(question, data.answer, contexts); evalResult = er.data } catch {}
      }
      if (onResult) onResult({ ...data, evaluation: evalResult, question })
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al consultar')
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-2">Colección</label>
        <input value={collection} onChange={e => setCollection(e.target.value)}
          placeholder="default"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-2">Pregunta</label>
        <textarea value={question} onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && e.ctrlKey && handleSubmit()}
          placeholder="¿Qué querés saber? (Ctrl+Enter para enviar)"
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none" />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button onClick={handleSubmit} disabled={loading || !question.trim()}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all">
        {loading ? <><Loader size={16} className="animate-spin" /> Consultando...</> : <><Send size={16} /> Enviar</>}
      </button>
    </div>
  )
}