import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { authApi, type LoginBody, type RegisterBody } from '../services/authApi'
import { clearToken, getToken, setToken } from '../services/token.storage'
import type { AuthSession, Role } from '../types/auth.types'
import { getJwtRoles, getJwtSubject, isJwtExpired } from '../services/jwt'
import { AuthContext, type AuthContextValue } from './authContext'

function buildSession(token: string): AuthSession {
  const roles = getJwtRoles(token)
    .map((r) => r.toUpperCase())
    .filter((r): r is Role => r === 'ADMIN' || r === 'ANALYST' || r === 'CLIENT')
  return { token, userId: getJwtSubject(token), roles }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(() => {
    const token = getToken()
    return token ? buildSession(token) : null
  })

  const logout = useCallback(() => {
    clearToken()
    setSessionState(null)
  }, [])

  const login = useCallback(async (body: LoginBody) => {
    const { token } = await authApi.login(body)
    setToken(token)
    setSessionState(buildSession(token))
  }, [])

  const register = useCallback(async (body: RegisterBody) => {
    await authApi.register(body)
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const token = session?.token ?? null
    return {
      session,
      token,
      userId: session?.userId ?? null,
      roles: session?.roles ?? [],
      isAuthenticated: Boolean(token),
      isTokenExpired: token ? isJwtExpired(token) : false,
      login,
      register,
      logout,
    }
  }, [login, logout, register, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

