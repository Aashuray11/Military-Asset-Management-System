import axios from 'axios'

const api = axios.create({
  // Vite exposes env vars via import.meta.env in the browser
  baseURL: (import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
