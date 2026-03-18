import { httpClient } from '../../../shared/services/httpClient'

export type LoginBody = { email: string; password: string }
export type RegisterBody = { email: string; name: string; password: string }
export type RefreshBody = { access_token: string }

type LoginResponse = {
  access_token?: string
  token?: string
  jwt?: string
  role?: string
  user?: { id?: string; email?: string; name?: string; [k: string]: unknown }
  [k: string]: unknown
}

function normalizeToken(res: LoginResponse): string | null {
  if (typeof res.access_token === 'string') return res.access_token
  if (typeof res.token === 'string') return res.token
  if (typeof res.jwt === 'string') return res.jwt
  return null
}

export const authApi = {
  async register(body: RegisterBody) {
    await httpClient.post('/auth/register', body)
  },

  async refresh(body: RefreshBody) {
    const { data } = await httpClient.post<LoginResponse>('/auth/refresh', body)
    const token = normalizeToken(data)
    if (!token) throw new Error('Refresh no devolvió un token (JWT).')
    return { token }
  },

  async login(body: LoginBody) {
    const { data } = await httpClient.post<LoginResponse>('/auth/login', body)
    const token = normalizeToken(data)
    if (!token) throw new Error('El login no devolvió un token (JWT).')
    const role = typeof data.role === 'string' ? data.role : null
    return { token, role }
  },
} as const

