import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { authApi, type LoginBody, type RefreshBody, type RegisterBody } from '../services/authApi'
import { clearToken, getRole, getToken, onTokenChange, setRole, setToken } from '../services/token.storage'
import type { AuthSession, Role } from '../types/auth.types'
import { getJwtRoles, getJwtSubject, isJwtExpired } from '../services/jwt'
import { AuthContext, type AuthContextValue } from './authContext'

function normalizeRole(role: string | null): Role[] {
  const r = (role ?? '').trim().toUpperCase()
  if (r === 'ADMIN' || r === 'ANALYST' || r === 'CLIENT') return [r]
  return []
}

function buildSession(token: string): AuthSession {
  const fromJwt = getJwtRoles(token)
    .map((r) => r.toUpperCase())
    .filter((r): r is Role => r === 'ADMIN' || r === 'ANALYST' || r === 'CLIENT')
  const fromStorage = normalizeRole(getRole())
  const roles = fromJwt.length ? fromJwt : fromStorage
  return { token, userId: getJwtSubject(token), roles }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(() => {
    const token = getToken()
    return token ? buildSession(token) : null
  })

  useEffect(() => {
    return onTokenChange((token) => {
      setSessionState(token ? buildSession(token) : null)
    })
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setSessionState(null)
  }, [])

  const login = useCallback(async (body: LoginBody) => {
    const { token, role } = await authApi.login(body)
    if (role) setRole(role)
    setToken(token)
    setSessionState(buildSession(token))
  }, [])

  const register = useCallback(async (body: RegisterBody) => {
    await authApi.register(body)
  }, [])

  const refresh = useCallback(async (body: RefreshBody) => {
    const { token } = await authApi.refresh(body)
    setToken(token)
    setSessionState(buildSession(token))
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
      refresh,
      logout,
    }
  }, [login, logout, refresh, register, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

