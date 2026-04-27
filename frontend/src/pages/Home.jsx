import { Brain, Upload, Search, BarChart3, Zap, Database } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const features = [
  { icon: Upload, title: 'Ingesta de PDFs', desc: 'Subí documentos y se dividen en chunks inteligentes con metadata', color: '#4f6ef7' },
  { icon: Database, title: 'Vector Database', desc: 'ChromaDB almacena embeddings de OpenAI para búsqueda semántica', color: '#8b5cf6' },
  { icon: Search, title: 'RAG Pipeline', desc: 'LangChain recupera chunks relevantes y GPT-4o-mini genera respuestas', color: '#06b6d4' },
  { icon: BarChart3, title: 'Evaluación', desc: 'Métricas de faithfulness, relevancy y precision por cada query', color: '#22c55e' },
  { icon: Zap, title: 'FastAPI Backend', desc: 'API REST con documentación automática y arquitectura por capas', color: '#f59e0b' },
  { icon: Brain, title: 'Producción-ready', desc: 'Chunking estratégico, score threshold y deduplicación de fuentes', color: '#ef4444' },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="space-y-12">
      <div className="text-center pt-8">
        <h1 className="text-5xl font-black text-white mb-4">
          Tu sistema de<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">conocimiento con IA</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Subí documentos, hacé preguntas y obtené respuestas precisas con métricas de calidad en tiempo real.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => navigate('/upload')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all text-sm">
            Subir documento →
          </button>
          <button onClick={() => navigate('/query')}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all text-sm border border-white/10">
            Hacer una consulta
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="rounded-xl border border-white/10 p-5 hover:border-white/20 transition-all" style={{ background: '#111320' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${color}20` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}