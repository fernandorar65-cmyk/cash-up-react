import { Route } from 'react-router-dom'
import { RoleGuard } from '../../shared/guards'
import { StaffLayout } from '../../shared/components/layouts'
import { PendingCreditRequestsPage } from './pages/PendingCreditRequestsPage'
import { ReviewCreditRequestPage } from './pages/ReviewCreditRequestPage'

export const staffRoutes = (
  <Route element={<RoleGuard allow={['ANALYST']} />}>
    <Route path="staff" element={<StaffLayout />}>
      <Route path="credit-requests">
        <Route path="pending" element={<PendingCreditRequestsPage />} />
        <Route path="review/:id" element={<ReviewCreditRequestPage />} />
      </Route>
    </Route>
  </Route>
)
