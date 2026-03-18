import { useAuth } from '../../auth'

export function DashboardPage() {
  const { userId, roles, isTokenExpired } = useAuth()

  return (
    <div className="grid gap-4">
      <section className="rounded-3xl bg-slate-950 p-6 ring-1 ring-slate-800">
        <h1 className="text-xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          Esta página está protegida por <code className="rounded bg-slate-900 px-1.5 py-0.5">AuthGuard</code> y{' '}
          <code className="rounded bg-slate-900 px-1.5 py-0.5">TokenGuard</code>.
        </p>
      </section>

      <section className="rounded-3xl bg-slate-950 p-6 ring-1 ring-slate-800">
        <div className="text-sm text-slate-300">
          <div>
            <span className="text-slate-400">userId/sub:</span> {userId ?? '—'}
          </div>
          <div className="mt-1">
            <span className="text-slate-400">roles:</span> {roles.join(', ') || '—'}
          </div>
          <div className="mt-1">
            <span className="text-slate-400">token expirado:</span> {isTokenExpired ? 'sí' : 'no'}
          </div>
        </div>
      </section>
    </div>
  )
}

