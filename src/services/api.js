// src/services/api.js
import axios from 'axios'

// Apne Node.js backend ka URL yahan daal do
const API_URL = 'http://localhost:3000'  // ← apna port change karna agar alag hai

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Optional: Agar token chahiye future mein (login ke baad)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api