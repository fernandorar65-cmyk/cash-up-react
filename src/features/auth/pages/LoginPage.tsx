import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { Icon } from '../../../shared/components/Icon'
import { getRole } from '../services/token.storage'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(900px circle at 20% 15%, rgba(15, 23, 42, 0.06), transparent 60%), radial-gradient(700px circle at 85% 25%, rgba(20, 184, 166, 0.08), transparent 60%)',
        }}
      />

      <div className="relative grid items-stretch md:grid-cols-2">
        <section className="border-b border-slate-200 bg-background-light/70 p-8 md:border-b-0 md:border-r">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm ring-1 ring-black/5">
              <Icon name="account_balance_wallet" className="text-[22px]" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900">CashUp</div>
              <div className="text-xs text-slate-600">Simulador de préstamos</div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Acceso al panel
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Ingresa para revisar clientes, simular cuotas y gestionar solicitudes de crédito.
            </p>
          </div>

          <div className="mt-8 grid gap-3 text-sm">
            <div className="flex items-start gap-3">
              <Icon name="calculate" className="mt-0.5 text-lg text-slate-700" filled />
              <div>
                <div className="font-semibold text-slate-900">Simulación clara</div>
                <div className="text-slate-600">Cuotas, plazos y escenarios en segundos.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="folder_shared" className="mt-0.5 text-lg text-slate-700" filled />
              <div>
                <div className="font-semibold text-slate-900">Gestión centralizada</div>
                <div className="text-slate-600">Dashboard, clientes y solicitudes en un solo lugar.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="shield_lock" className="mt-0.5 text-lg text-slate-700" filled />
              <div>
                <div className="font-semibold text-slate-900">Sesión segura</div>
                <div className="text-slate-600">Control de token y expiración.</div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} CashUp</span>
            <button className="font-semibold text-slate-700 hover:text-slate-900" type="button">
              Soporte
            </button>
          </div>
        </section>

        <section className="p-8">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-6 space-y-1">
              <div className="text-sm font-semibold text-slate-900">Iniciar sesión</div>
              <p className="text-sm text-slate-600">Usa tus credenciales para continuar.</p>
            </div>

            <LoginForm
              onSuccess={() => {
                const role = (getRole() ?? '').trim().toUpperCase()
                if (role === 'ANALYST') navigate('/staff', { replace: true })
                else if (role === 'CLIENT') navigate('/client/profile', { replace: true })
                else navigate('/forbidden', { replace: true })
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}