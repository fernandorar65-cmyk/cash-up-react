import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth'
import { isJwtExpired } from '../../features/auth/services/jwt'

export function TokenGuard() {
  const { token, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!token) return
    if (!isJwtExpired(token)) return
    logout()
  }, [location.key, logout, token])

  return <Outlet />
}

