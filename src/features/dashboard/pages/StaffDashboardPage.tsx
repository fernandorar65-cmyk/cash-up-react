import { Icon } from '../../../shared/components/Icon'

function MetricCard({
  title,
  value,
  sub,
  icon,
  accentClass,
  progressPct,
}: {
  title: string
  value: string
  sub?: string
  icon: string
  accentClass: string
  progressPct?: number
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">{title}</p>
        <Icon name={icon} className={accentClass} />
      </div>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold leading-none text-slate-900">{value}</p>
        {sub ? <p className="flex items-center text-sm font-medium text-emerald-600">{sub}</p> : null}
      </div>
      {typeof progressPct === 'number' ? (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-orange-500" style={{ width: `${progressPct}%` }} />
        </div>
      ) : null}
    </div>
  )
}

function PendingTaskItem({
  color,
  icon,
  title,
  desc,
  when,
}: {
  color: 'orange' | 'blue' | 'emerald' | 'slate'
  icon: string
  title: string
  desc: string
  when: string
}) {
  const colorMap: Record<typeof color, string> = {
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    slate: 'bg-slate-100 text-slate-700',
  }
  return (
    <div className="flex items-start gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
      <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorMap[color]}`}>
        <Icon name={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-600">{desc}</p>
      </div>
      <span className="text-[10px] font-bold uppercase text-slate-400">{when}</span>
    </div>
  )
}

export function StaffDashboardPage() {
  return (
    <div>
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resumen Operativo</h2>
          <p className="text-slate-600">
            Bienvenido de nuevo, revisa los indicadores clave de hoy.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            <Icon name="calendar_today" className="text-sm" />
            Hoy, 24 May 2024
          </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
            Nuevo Crédito
          </button>
        </div>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="Mora Actual"
          value="4.2%"
          sub="0.5%"
          icon="warning"
          accentClass="text-orange-500"
          progressPct={42}
        />
        <MetricCard
          title="Créditos por Aprobar"
          value="15"
          sub="3 nuevos"
          icon="pending_actions"
          accentClass="text-slate-900"
        />
        <MetricCard
          title="Pagos Recibidos Hoy"
          value="$12,450.00"
          sub="12%"
          icon="account_balance"
          accentClass="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Desembolsos vs. Cobros</h3>
              <p className="text-sm text-slate-600">Análisis semanal comparativo</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-slate-900" />
                <span className="text-slate-700">Desembolsos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-slate-300" />
                <span className="text-slate-700">Cobros</span>
              </div>
            </div>
          </div>
          <div className="relative flex h-64 items-end gap-2 px-2">
            {[
              { day: 'Lun', a: 32, b: 40 },
              { day: 'Mar', a: 24, b: 36 },
              { day: 'Mie', a: 40, b: 48 },
              { day: 'Jue', a: 28, b: 44 },
              { day: 'Vie', a: 44, b: 52 },
              { day: 'Sab', a: 16, b: 24 },
              { day: 'Dom', a: 12, b: 16 },
            ].map((x) => (
              <div key={x.day} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div className="flex w-full items-end justify-center gap-1">
                    <div className="w-4 rounded-t bg-slate-900/15" style={{ height: `${x.a * 2}px` }} />
                    <div className="w-4 rounded-t bg-slate-900" style={{ height: `${x.b * 2}px` }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{x.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Tareas Pendientes</h3>
            <a className="text-xs font-semibold text-slate-700 hover:underline" href="#">
              Ver todo
            </a>
          </div>
          <div className="flex-1 space-y-4">
            <PendingTaskItem
              color="orange"
              icon="priority_high"
              title="Revisión de crédito: Juan Pérez"
              desc="Documentación de ingresos incompleta"
              when="Hace 2h"
            />
            <PendingTaskItem
              color="blue"
              icon="assignment"
              title="Auditoría Mensual"
              desc="Preparar reporte de cierres de Abril"
              when="Hoy"
            />
            <PendingTaskItem
              color="emerald"
              icon="call"
              title="Cobranza Preventiva"
              desc="Llamar a cartera con vencimiento en 3 días"
              when="Hoy"
            />
            <PendingTaskItem
              color="slate"
              icon="description"
              title="Firmas Pendientes"
              desc="12 contratos por digitalizar"
              when="Mañana"
            />
          </div>
          <button className="mt-4 w-full rounded-xl bg-slate-50 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100">
            Añadir Tarea
          </button>
        </section>
      </div>
    </div>
  )
}

