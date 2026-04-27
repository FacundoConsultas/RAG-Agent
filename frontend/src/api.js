import axios from 'axios'

const BASE = 'http://localhost:8000/api'

export const api = {
  uploadPDF: (file, collectionName = 'default') => {
    const form = new FormData()
    form.append('file', file)
    form.append('collection_name', collectionName)
    return axios.post(`${BASE}/documents/upload`, form)
  },
  uploadText: (text, sourceName = 'manual', collectionName = 'default') => {
    const form = new FormData()
    form.append('text', text)
    form.append('source_name', sourceName)
    form.append('collection_name', collectionName)
    return axios.post(`${BASE}/documents/upload-text`, form)
  },
  query: (question, collectionName = 'default') =>
    axios.post(`${BASE}/query/`, { question, collection_name: collectionName }),
  evaluate: (question, answer, contexts) =>
    axios.post(`${BASE}/evaluation/`, { question, answer, contexts }),
  getStats: (collectionName = 'default') =>
    axios.get(`${BASE}/documents/collections/${collectionName}/stats`),
  health: () => axios.get('http://localhost:8000/health'),
}