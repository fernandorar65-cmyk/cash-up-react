import { Outlet } from 'react-router-dom'
import { StaffSidebar } from './StaffSidebar'

export function StaffLayout() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <StaffSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

