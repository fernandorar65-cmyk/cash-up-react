import { Navigate, Route, Routes } from 'react-router-dom'
import { TokenGuard } from '../shared/hooks/TokenGuard'
import { AuthGuard } from '../shared/hooks/AuthGuard'
import { LoginPage, RegisterPage } from '../features/auth'
import { NotFoundPage } from '../shared/components/NotFoundPage'
import { RootLayout } from '../shared/components/RootLayout'

import { StaffLayout } from '../shared/components/StaffLayout'
import { ForbiddenPage } from '../shared/components/ForbiddenPage'
import { PendingCreditRequestsPage } from '../features/credit-requests/pages/PendingCreditRequestsPage'
import { ReviewCreditRequestPage } from '../features/credit-requests/pages/ReviewCreditRequestPage'
import { RoleGuard } from '../shared/hooks/RoleGuard'
import { ClientLayout } from '../shared/components/ClientLayout'
import { ClientProfilePage } from '../features/client/pages/ClientProfilePage'
import { ClientNewCreditRequestPage } from '../features/client/pages/ClientNewCreditRequestPage'
import { ClientLoansPage } from '../features/client/pages/ClientLoansPage'
import { ClientLoanDetailPage } from '../features/client/pages/ClientLoanDetailPage'
import { IndexRedirect } from './IndexRedirect'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<IndexRedirect />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forbidden" element={<ForbiddenPage />} />

        <Route element={<TokenGuard />}>
          <Route element={<AuthGuard />}>
            <Route element={<RoleGuard allow={['CLIENT']} />}>
              <Route path="client" element={<ClientLayout />}>
                <Route index element={<Navigate to="/client/profile" replace />} />
                <Route path="profile" element={<ClientProfilePage />} />
                <Route path="credit-requests">
                  <Route path="new" element={<ClientNewCreditRequestPage />} />
                </Route>
                <Route path="loans">
                  <Route index element={<ClientLoansPage />} />
                  <Route path=":loanId" element={<ClientLoanDetailPage />} />
                </Route>
              </Route>
            </Route>

            <Route element={<RoleGuard allow={['ANALYST']} />}>
              <Route path="staff" element={<StaffLayout />}>
                <Route path="credit-requests">
                  <Route path="pending" element={<PendingCreditRequestsPage />} />
                  <Route path="review/:id" element={<ReviewCreditRequestPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

