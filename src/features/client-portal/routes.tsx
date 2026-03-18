import { Navigate, Route } from 'react-router-dom'
import { RoleGuard } from '../../shared/guards'
import { ClientLayout } from '../../shared/components/layouts'
import { ClientProfilePage } from './pages/ClientProfilePage'
import { ClientNewCreditRequestPage } from './pages/ClientNewCreditRequestPage'
import { ClientLoansPage } from './pages/ClientLoansPage'
import { ClientLoanDetailPage } from './pages/ClientLoanDetailPage'

export const clientRoutes = (
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
)
