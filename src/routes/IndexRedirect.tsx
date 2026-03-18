import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth'
import { getRole } from '../features/auth/services/token.storage.ts'

export function IndexRedirect() {
  const { isAuthenticated, roles } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (roles.includes('ANALYST')) return <Navigate to="/staff/credit-requests/pending" replace />
  if (roles.includes('CLIENT')) return <Navigate to="/client/profile" replace />

  const stored = (getRole() ?? '').trim().toUpperCase()
  if (stored === 'ANALYST') return <Navigate to="/staff/credit-requests/pending" replace />
  if (stored === 'CLIENT') return <Navigate to="/client/profile" replace />

  return <Navigate to="/login" replace />
}

