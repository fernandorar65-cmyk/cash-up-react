import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'
import { useAuth } from '../../features/auth'
import type { Role } from '../../features/auth/types/auth.types'

type Item = { to: string; label: string; icon: string; filled?: boolean; roles: Role[] }

const items: Item[] = [
  { to: '/staff/dashboard', label: 'Dashboard', icon: 'dashboard', roles: ['ANALYST'] },
  { to: '/staff/clients', label: 'Clientes', icon: 'groups', roles: ['ANALYST'] },
  {
    to: '/staff/credit-requests/new',
    label: 'Solicitudes',
    icon: 'description',
    filled: true,
    roles: ['ANALYST'],
  },
  { to: '/staff/credit-requests/approve', label: 'Aprobar', icon: 'rule', roles: ['ANALYST'] },
  { to: '/staff/users/new', label: 'Crear usuario', icon: 'person_add', roles: ['ANALYST'] },
  { to: '/staff/profile', label: 'Perfil', icon: 'person', roles: ['ANALYST'] },
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
    <aside className="hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-2 text-white">
            <Icon name="account_balance_wallet" className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {visibleItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary dark:text-slate-100'
                  : 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }
            >
              <Icon name={it.icon} filled={it.filled} />
              <span className="text-sm font-medium">{it.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
            <Icon name="person" className="text-primary" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-none text-slate-900 dark:text-white">Carlos Ruiz</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Analista Sr.</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

