import { Navigate, Route, Routes } from 'react-router-dom'
import { TokenGuard } from '../shared/hooks/TokenGuard'
import { AuthGuard } from '../shared/hooks/AuthGuard'
import { LoginPage, RegisterPage } from '../features/auth'
import { DashboardPage } from '../features/loans/pages/DashboardPage'
import { NotFoundPage } from '../shared/components/NotFoundPage'
import { RootLayout } from '../shared/components/RootLayout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<TokenGuard />}>
          <Route element={<AuthGuard />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

