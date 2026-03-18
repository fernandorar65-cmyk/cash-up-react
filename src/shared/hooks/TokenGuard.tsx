import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth'
import { isJwtExpired } from '../../features/auth/services/jwt'

export function TokenGuard() {
  const { token, refresh, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!token) return
    if (!isJwtExpired(token)) return
    refresh({ access_token: token }).catch(() => logout())
  }, [location.key, logout, refresh, token])

  return <Outlet />
}

