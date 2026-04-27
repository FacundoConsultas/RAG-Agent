import { Brain } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ background: 'rgba(15,17,23,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Brain size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">RAG</span>
          <span className="text-indigo-400 font-bold text-lg">Agent</span>
          <span className="ml-2 text-xs bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 px-2 py-0.5 rounded-full">v1.0</span>
        </div>
        <span className="text-xs text-slate-500">FastAPI · LangChain · ChromaDB · GPT-4o-mini</span>
      </div>
    </nav>
  )
}