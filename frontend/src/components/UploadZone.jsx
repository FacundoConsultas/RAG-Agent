import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useState } from 'react'
import { api } from '../api'

export default function UploadZone({ onSuccess }) {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [collection, setCollection] = useState('default')

  const onDrop = async (files) => {
    if (!files.length) return
    setStatus('uploading')
    setError('')
    try {
      const res = await api.uploadPDF(files[0], collection)
      setResult(res.data.data)
      setStatus('success')
      if (onSuccess) onSuccess(res.data.data)
    } catch (e) {
      setError(e.response?.data?.detail || 'Error al subir el archivo')
      setStatus('error')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'] }, maxFiles: 1,
  })

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-2">Colección</label>
        <input value={collection} onChange={e => setCollection(e.target.value)}
          placeholder="default"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
      </div>
      <div {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
          isDragActive ? 'border-indigo-500 bg-indigo-600/10' : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
        }`}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          {status === 'uploading' ? <Loader size={32} className="text-indigo-400 animate-spin" /> : <Upload size={32} className="text-slate-500" />}
          <div>
            <p className="text-white font-medium">{isDragActive ? 'Soltá acá' : 'Arrastrá un PDF o hacé click'}</p>
            <p className="text-slate-500 text-sm mt-1">Solo archivos .pdf</p>
          </div>
        </div>
      </div>
      {status === 'success' && result && (
        <div className="rounded-xl p-4 border border-green-500/20 bg-green-500/10">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={16} className="text-green-400" />
            <span className="text-green-400 font-medium text-sm">Procesado exitosamente</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[['Páginas', result.pages], ['Chunks', result.chunks], ['Tiempo', `${result.processing_time_ms}ms`]].map(([label, value]) => (
              <div key={label} className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-white font-bold text-lg">{value}</p>
                <p className="text-slate-400 text-xs">{label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <FileText size={14} className="text-slate-400" />
            <span className="text-slate-400 text-sm">{result.filename}</span>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-xl p-4 border border-red-500/20 bg-red-500/10 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-400" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}
    </div>
  )
}