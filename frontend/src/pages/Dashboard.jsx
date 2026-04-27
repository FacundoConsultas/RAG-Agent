import { useState, useEffect } from 'react'
import { api } from '../api'
import { Database, Activity, CheckCircle, XCircle } from 'lucide-react'

export default function Dashboard() {
  const [health, setHealth] = useState(null)
  const [stats, setStats] = useState(null)
  const [collection, setCollection] = useState('default')

  useEffect(() => {
    api.health().then(r => setHealth(r.data)).catch(() => setHealth({ status: 'unhealthy' }))
  }, [])

  const isHealthy = health?.status === 'healthy'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-400 text-sm">Estado del sistema y métricas</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
          <div className="flex items-center gap-3 mb-2">
            {isHealthy ? <CheckCircle size={20} className="text-green-400" /> : <XCircle size={20} className="text-red-400" />}
            <span className="text-sm font-medium text-white">Backend API</span>
          </div>
          <p className={`text-2xl font-bold ${isHealthy ? 'text-green-400' : 'text-red-400'}`}>
            {health ? (isHealthy ? 'Online' : 'Offline') : '...'}
          </p>
          <p className="text-xs text-slate-500 mt-1">FastAPI en puerto 8000</p>
        </div>
        <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
          <div className="flex items-center gap-3 mb-2">
            <Database size={20} className="text-indigo-400" />
            <span className="text-sm font-medium text-white">Vector Store</span>
          </div>
          <p className="text-2xl font-bold text-indigo-400">{stats?.total_chunks ?? '—'}</p>
          <p className="text-xs text-slate-500 mt-1">Chunks en ChromaDB</p>
        </div>
        <div className="rounded-xl border border-white/10 p-5" style={{ background: '#111320' }}>
          <div className="flex items-center gap-3 mb-2">
            <Activity size={20} className="text-purple-400" />
            <span className="text-sm font-medium text-white">Modelo</span>
          </div>
          <p className="text-2xl font-bold text-purple-400">GPT-4o</p>
          <p className="text-xs text-slate-500 mt-1">mini · text-embedding-3-small</p>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 p-6" style={{ background: '#111320' }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Estadísticas de colección</p>
        <div className="flex gap-3">
          <input value={collection} onChange={e => setCollection(e.target.value)} placeholder="default"
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
          <button onClick={() => api.getStats(collection).then(r => setStats(r.data)).catch(() => setStats({ error: 'Error' }))}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all">
            Consultar
          </button>
        </div>
        {stats && !stats.error && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <p className="text-slate-400 text-sm">Colección: <span className="text-white font-medium">{stats.collection}</span></p>
            <p className="text-slate-400 text-sm mt-1">Total chunks: <span className="text-indigo-400 font-bold text-lg">{stats.total_chunks}</span></p>
          </div>
        )}
      </div>
    </div>
  )
}