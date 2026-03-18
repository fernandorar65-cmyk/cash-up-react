import { createContext } from 'react'
import type { LoginBody, RefreshBody, RegisterBody } from '../services/authApi'
import type { AuthSession, Role } from '../types/auth.types'

export type AuthContextValue = {
  session: AuthSession | null
  token: string | null
  userId: string | null
  roles: Role[]
  isAuthenticated: boolean
  isTokenExpired: boolean
  login: (body: LoginBody) => Promise<void>
  register: (body: RegisterBody) => Promise<void>
  refresh: (body: RefreshBody) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

