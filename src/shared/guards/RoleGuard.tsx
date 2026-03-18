import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { Role } from '../../features/auth/types/auth.types'
import { useAuth } from '../../features/auth'
import { getRole } from '../../features/auth/services/token.storage'

export function RoleGuard({ allow }: { allow: Role[] }) {
  const { roles } = useAuth()
  const location = useLocation()

  const stored = (getRole() ?? '').trim().toUpperCase()
  const ok = allow.some((r) => roles.includes(r) || r === stored)
  if (!ok) return <Navigate to="/forbidden" replace state={{ from: location.pathname }} />

  return <Outlet />
}
