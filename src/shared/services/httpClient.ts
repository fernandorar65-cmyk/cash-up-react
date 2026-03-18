import axios from 'axios'
import { config } from '../../app/config'
import { getToken, clearToken } from '../../features/auth/services/token.storage'

type UnauthorizedHandler = () => void

let onUnauthorized: UnauthorizedHandler | null = null

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler
}

export const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
})

httpClient.interceptors.request.use((req) => {
  const token = getToken()
  if (token) {
    req.headers = req.headers ?? {}
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken()
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)

