import { Outlet } from 'react-router-dom'
import { StaffSidebar } from './StaffSidebar'

export function StaffLayout() {
  return (
    <div className="flex min-h-svh overflow-hidden bg-background-light text-slate-900">
      <StaffSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

