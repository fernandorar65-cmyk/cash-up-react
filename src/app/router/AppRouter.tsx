import { Routes, Route } from 'react-router-dom'
import { TokenGuard, AuthGuard } from '../../shared/guards'
import { RootLayout } from '../../shared/components/layouts'
import { NotFoundPage } from '../../shared/components/NotFoundPage'
import { IndexRedirect } from './IndexRedirect'
import { authRoutes } from '../../features/auth/routes'
import { clientRoutes } from '../../features/client-portal/routes'
import { staffRoutes } from '../../features/staff-credit-requests/routes'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<IndexRedirect />} />
        {authRoutes}
        <Route element={<TokenGuard />}>
          <Route element={<AuthGuard />}>
            {clientRoutes}
            {staffRoutes}
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
