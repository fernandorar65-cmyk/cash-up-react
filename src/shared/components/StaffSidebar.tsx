import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'
import { useAuth } from '../../features/auth'
import type { Role } from '../../features/auth/types/auth.types'

type Item = { to: string; label: string; icon: string; filled?: boolean; roles: Role[] }

const items: Item[] = [
  { to: '/staff/credit-requests/pending', label: 'Pendientes', icon: 'pending_actions', roles: ['ANALYST'] },
]

export function StaffSidebar({
  title = 'CashUp Staff',
  subtitle = 'Panel Operativo',
}: {
  title?: string
  subtitle?: string
}) {
  const { roles } = useAuth()
  const visibleItems = items.filter((it) => it.roles.some((r) => roles.includes(r)))

  return (
    <aside className="hidden h-screen w-72 shrink-0 flex-col justify-between border-r border-slate-200 bg-white md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-900 p-2 text-white shadow-sm">
            <Icon name="account_balance_wallet" className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight text-slate-900">{title}</h1>
            <p className="text-xs text-slate-600">{subtitle}</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {visibleItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-xl bg-slate-900 px-3 py-2.5 text-white shadow-sm'
                  : 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 transition-colors hover:bg-slate-50'
              }
            >
              <Icon name={it.icon} filled={it.filled} />
              <span className="text-sm font-medium">{it.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-900/10">
            <Icon name="person" className="text-slate-900" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-none text-slate-900">Carlos Ruiz</p>
            <p className="text-xs text-slate-600">Analista Sr.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

