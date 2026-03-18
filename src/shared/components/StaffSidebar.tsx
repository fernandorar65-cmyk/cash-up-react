import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'

type Item = { to: string; label: string; icon: string; filled?: boolean }

const items: Item[] = [
  { to: '/staff/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/staff/clients', label: 'Clientes', icon: 'groups' },
  { to: '/staff/credit-requests/new', label: 'Solicitudes', icon: 'description', filled: true },
  { to: '/staff/credit-requests/approve', label: 'Aprobar', icon: 'rule' },
]

export function StaffSidebar({
  title = 'CashUp Staff',
  subtitle = 'Panel Operativo',
}: {
  title?: string
  subtitle?: string
}) {
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
          {items.map((it) => (
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

