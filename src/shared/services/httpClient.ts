import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { config } from '../../app/config'
import { getToken, setToken, clearToken } from '../../features/auth/services/token.storage.ts'

type UnauthorizedHandler = () => void

let onUnauthorized: UnauthorizedHandler | null = null

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler
}

export const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
})

const refreshClient = axios.create({
  baseURL: config.apiBaseUrl,
})

let refreshPromise: Promise<string> | null = null

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
  async (error) => {
    const status = error?.response?.status
    const originalRequest = error?.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      if (status === 401) {
        clearToken()
        onUnauthorized?.()
      }
      return Promise.reject(error)
    }

    const token = getToken()
    if (!token) {
      clearToken()
      onUnauthorized?.()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      refreshPromise =
        refreshPromise ??
        refreshClient
          .post<{ access_token?: string; token?: string; jwt?: string }>('/auth/refresh', {
            access_token: token,
          })
          .then((res) => res.data.access_token ?? res.data.token ?? res.data.jwt ?? null)
          .then((t) => {
            if (!t) throw new Error('Refresh no devolvió un token (JWT).')
            return t
          })
          .finally(() => {
            refreshPromise = null
          })

      const newToken = await refreshPromise
      setToken(newToken)

      originalRequest.headers = originalRequest.headers ?? {}
      ;(originalRequest.headers as Record<string, unknown>)['Authorization'] = `Bearer ${newToken}`
      return await httpClient.request(originalRequest)
    } catch (e) {
      clearToken()
      onUnauthorized?.()
      return Promise.reject(e)
    }
  },
)

