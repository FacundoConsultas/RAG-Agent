import { useState } from 'react'
import { FileText, Type } from 'lucide-react'
import UploadZone from '../components/UploadZone'
import { api } from '../api'

export default function Upload() {
  const [tab, setTab] = useState('pdf')
  const [text, setText] = useState('')
  const [sourceName, setSourceName] = useState('')
  const [collection, setCollection] = useState('default')
  const [textStatus, setTextStatus] = useState('idle')
  const [textResult, setTextResult] = useState(null)

  const handleTextUpload = async () => {
    if (!text.trim()) return
    setTextStatus('uploading')
    try {
      const res = await api.uploadText(text, sourceName || 'manual_input', collection)
      setTextResult(res.data.data)
      setTextStatus('success')
    } catch { setTextStatus('error') }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Subir documentos</h1>
        <p className="text-slate-400 text-sm">Ingesta de PDFs o texto al vector store</p>
      </div>
      <div className="flex gap-2">
        {[{ id: 'pdf', icon: FileText, label: 'PDF' }, { id: 'text', icon: Type, label: 'Texto' }].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === id ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
            <Icon size={14} />{label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 p-6" style={{ background: '#111320' }}>
        {tab === 'pdf' ? <UploadZone /> : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Nombre de fuente</label>
                <input value={sourceName} onChange={e => setSourceName(e.target.value)} placeholder="mi-documento"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Colección</label>
                <input value={collection} onChange={e => setCollection(e.target.value)} placeholder="default"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Pegá el texto a indexar..." rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none" />
            <button onClick={handleTextUpload} disabled={!text.trim() || textStatus === 'uploading'}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm disabled:opacity-40 transition-all">
              {textStatus === 'uploading' ? 'Procesando...' : 'Indexar texto'}
            </button>
            {textStatus === 'success' && textResult && (
              <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                ✓ {textResult.chunks} chunks generados en {textResult.processing_time_ms}ms
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}