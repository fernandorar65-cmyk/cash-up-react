import { Navigate, Route, Routes } from 'react-router-dom'
import { TokenGuard } from '../shared/hooks/TokenGuard'
import { AuthGuard } from '../shared/hooks/AuthGuard'
import { LoginPage, RegisterPage } from '../features/auth'
import { NotFoundPage } from '../shared/components/NotFoundPage'
import { RootLayout } from '../shared/components/RootLayout'
import { StaffLayout } from '../shared/components/StaffLayout'
import { StaffDashboardPage } from '../features/dashboard/pages/StaffDashboardPage'
import { ClientsPage } from '../features/clients/pages/ClientsPage'
import { NewCreditRequestPage } from '../features/credit-requests/pages/NewCreditRequestPage'
import { ApproveCreditRequestPage } from '../features/credit-requests/pages/ApproveCreditRequestPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Navigate to="/staff/dashboard" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route element={<TokenGuard />}>
          <Route element={<AuthGuard />}>
            <Route path="staff" element={<StaffLayout />}>
              <Route path="dashboard" element={<StaffDashboardPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="credit-requests">
                <Route path="new" element={<NewCreditRequestPage />} />
                <Route path="approve" element={<ApproveCreditRequestPage />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

