import { httpClient } from '../../../shared/services/httpClient'

export type LoginBody = { email: string; password: string }
export type RegisterBody = { email: string; name: string; password: string }

type LoginResponse = { access_token?: string; token?: string; jwt?: string; [k: string]: unknown }

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

  async login(body: LoginBody) {
    const { data } = await httpClient.post<LoginResponse>('/auth/login', body)
    const token = normalizeToken(data)
    if (!token) throw new Error('El login no devolvió un token (JWT).')
    return { token }
  },
} as const

