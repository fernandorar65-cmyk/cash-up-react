import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { Icon } from '../../../shared/components/Icon'

export function LoginPage() {
  const navigate = useNavigate()
  return (
    <div className="relative grid min-h-[calc(100svh-120px)] items-stretch gap-6 overflow-hidden md:grid-cols-2 md:gap-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(900px circle at 20% 20%, rgba(23, 36, 54, 0.16), transparent 55%), radial-gradient(700px circle at 80% 30%, rgba(16, 185, 129, 0.12), transparent 55%)',
        }}
      />

      <section className="relative hidden rounded-3xl border border-slate-200 bg-background-light/90 p-8 shadow-sm ring-1 ring-black/5 md:flex md:flex-col md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-white shadow-sm ring-1 ring-black/5">
            <Icon name="account_balance_wallet" className="text-[22px]" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">CashUp</div>
            <div className="text-xs text-slate-600">Simulador de préstamos</div>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">
            Accede a tu panel de simulación
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Evalúa montos, cuotas y escenarios. Mantén el control del flujo de solicitudes y decisiones con una
            experiencia rápida y segura.
          </p>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <Icon name="verified" className="mt-0.5 text-lg text-emerald-700" filled />
            <div>
              <div className="font-semibold text-slate-900">Escenarios claros</div>
              <div className="text-slate-600">Proyección de cuotas y resumen del crédito.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="bolt" className="mt-0.5 text-lg text-primary" filled />
            <div>
              <div className="font-semibold text-slate-900">Flujo ágil</div>
              <div className="text-slate-600">Navegación por staff: dashboard, clientes y solicitudes.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="shield_lock" className="mt-0.5 text-lg text-slate-700" filled />
            <div>
              <div className="font-semibold text-slate-900">Sesión segura</div>
              <div className="text-slate-600">Tokens y expiración controlada.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur md:p-10">
          <div className="mb-7 space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Icon name="login" className="text-lg text-slate-700" />
              Iniciar sesión
            </div>
            <p className="text-sm text-slate-600">Ingresa tus credenciales para continuar.</p>
          </div>

          <LoginForm onSuccess={() => navigate('/staff/dashboard', { replace: true })} />
        </div>
      </section>
    </div>
  )
}

