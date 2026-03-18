import { Link, useNavigate } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { Icon } from '../../../shared/components/Icon'

export function RegisterPage() {
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
          <h1 className="text-3xl font-black tracking-tight text-slate-900 lg:text-4xl">Crea tu cuenta</h1>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Regístrate para simular solicitudes de crédito, calcular cuotas y revisar escenarios desde el panel de
            staff.
          </p>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-slate-700">
          <div className="flex items-start gap-3">
            <Icon name="account_circle" className="mt-0.5 text-lg text-primary" filled />
            <div>
              <div className="font-semibold text-slate-900">Tu acceso en minutos</div>
              <div className="text-slate-600">Crea tu cuenta y entra al panel.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="calculate" className="mt-0.5 text-lg text-emerald-700" filled />
            <div>
              <div className="font-semibold text-slate-900">Simulación rápida</div>
              <div className="text-slate-600">Explora montos, plazos y cuotas.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Icon name="lock" className="mt-0.5 text-lg text-slate-700" filled />
            <div>
              <div className="font-semibold text-slate-900">Privacidad primero</div>
              <div className="text-slate-600">Credenciales y sesión controladas.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur md:p-10">
          <div className="mb-7 space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Icon name="person_add" className="text-lg text-slate-700" />
              Registro
            </div>
            <p className="text-sm text-slate-600">Crea una cuenta para continuar.</p>
          </div>

          <RegisterForm onSuccess={() => navigate('/login', { replace: true })} />

          <p className="mt-5 text-sm text-slate-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-semibold text-slate-900 underline underline-offset-4 hover:text-black">
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

