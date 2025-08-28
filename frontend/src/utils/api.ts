import axios from 'axios'

// API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
})

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('API 요청 타임아웃')
    }
    return Promise.reject(error)
  }
)

export default api