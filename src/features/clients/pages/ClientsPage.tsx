import { Icon } from '../../../shared/components/Icon'

type ClientRow = {
  name: string
  dni: string
  score: number
  status: 'good' | 'warn' | 'bad'
}

const rows: ClientRow[] = [
  { name: 'Maria Rodriguez', dni: '40.231.554', score: 750, status: 'good' },
  { name: 'Juan Pérez', dni: '38.990.122', score: 420, status: 'warn' },
  { name: 'Lucas Gomez', dni: '42.112.908', score: 210, status: 'bad' },
]

function ScorePill({ score }: { score: number }) {
  const meta =
    score >= 650
      ? { c: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-300' }
      : score >= 350
        ? { c: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300' }
        : { c: 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300' }
  return <span className={`rounded px-2 py-1 text-xs font-bold ${meta.c}`}>{score}</span>
}

export function ClientsPage() {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-primary dark:text-slate-100">Gestión de Clientes</h2>
          <p className="text-sm text-slate-500">Monitoreo de cartera y evaluación de scoring crediticio.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-bold text-white shadow-lg transition-opacity hover:opacity-90">
          <Icon name="person_add" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <div className="rounded-xl border border-primary/5 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white">Todos</button>
                <button className="rounded-full bg-primary/5 px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-primary/10 dark:text-slate-300">
                  Activos
                </button>
                <button className="rounded-full bg-primary/5 px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-primary/10 dark:text-slate-300">
                  En Mora
                </button>
                <button className="rounded-full bg-primary/5 px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-primary/10 dark:text-slate-300">
                  Revision
                </button>
              </div>

              <div className="relative">
                <Icon name="search" className="absolute left-3 top-2.5 text-[20px] text-slate-400" />
                <input
                  className="w-full rounded-lg border-none bg-background-light py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 dark:bg-white/5"
                  placeholder="Nombre o documento..."
                  type="text"
                />
              </div>
            </div>

            <div className="mt-6 overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b border-primary/5">
                  <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="pb-3 pl-2">Cliente</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3 pr-2 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {rows.map((r, idx) => (
                    <tr
                      key={r.dni}
                      className={`${idx === 0 ? 'bg-primary/5' : ''} cursor-pointer transition-colors hover:bg-primary/5`}
                    >
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-200" />
                          <div>
                            <p className="text-sm font-bold text-primary dark:text-slate-100">{r.name}</p>
                            <p className="text-[10px] text-slate-500">DNI: {r.dni}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <ScorePill score={r.score} />
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <span
                          className={`inline-block size-2 rounded-full ${
                            r.status === 'good' ? 'bg-emerald-500' : r.status === 'warn' ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-7">
          <div className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between bg-primary p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-xl border-2 border-white/20 bg-white/10" />
                <div>
                  <h3 className="text-xl font-bold leading-tight">Maria Rodriguez</h3>
                  <p className="text-sm text-white/60">Cliente Premium • Desde Octubre 2021</p>
                </div>
              </div>
              <button className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold transition-colors hover:bg-white/20">
                Editar Perfil
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 p-6 lg:grid-cols-4">
              {[
                ['DNI / Documento', '40.231.554'],
                ['Teléfono', '+54 9 11 5543-2210'],
                ['Email', 'maria.rodr@email.com'],
                ['Ocupación', 'Ing. de Software'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">{k}</p>
                  <p className="text-sm font-semibold text-primary dark:text-slate-100">{v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-between rounded-xl border border-primary/5 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-slate-100">Credit Scoring</h4>
                  <p className="text-xs text-slate-500">Última actualización: hace 2 horas</p>
                </div>
                <button className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/5">
                  <Icon name="refresh" />
                </button>
              </div>
              <div className="flex flex-col items-center py-4">
                <div className="relative flex items-center justify-center">
                  <svg className="size-40 -rotate-90 transform">
                    <circle
                      className="text-slate-100 dark:text-slate-800"
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                    />
                    <circle
                      className="text-emerald-500"
                      cx="80"
                      cy="80"
                      r="70"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeDasharray="439.8"
                      strokeDashoffset="110"
                    />
                  </svg>
                  <div className="absolute inset-0 flex rotate-90 flex-col items-center justify-center">
                    <span className="text-3xl font-black text-emerald-600">750</span>
                    <span className="text-[10px] font-bold uppercase text-slate-400">de 1000</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                    RIESGO BAJO
                  </span>
                </div>
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white shadow-md">
                <Icon name="bolt" className="text-[18px]" />
                Recalcular Scoring
              </button>
            </div>

            <div className="rounded-xl border border-primary/5 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary dark:text-slate-100">
                Historial de Pagos
              </h4>
              <div className="flex h-full items-center gap-8">
                <div className="relative size-32 shrink-0">
                  <div className="absolute inset-0 rounded-full border-[14px] border-slate-100 dark:border-slate-800" />
                  <div
                    className="absolute inset-0 rounded-full border-[14px] border-emerald-500"
                    style={{
                      clipPath:
                        'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xl font-bold">85%</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  {[
                    ['A tiempo', '42', 'bg-emerald-500'],
                    ['Atrasado < 30d', '5', 'bg-amber-500'],
                    ['Mora grave', '1', 'bg-red-500'],
                  ].map(([label, val, dot]) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${dot}`} />
                        <span className="text-xs font-medium text-slate-500">{label}</span>
                      </div>
                      <span className="text-xs font-bold">{val}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-primary/5 pt-2">
                    <span className="text-xs font-bold uppercase text-slate-400">Total cuotas</span>
                    <span className="text-xs font-black">48</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-primary/5 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-slate-100">
                Estado de Deuda Total
              </h4>
              <span className="rounded bg-primary/10 px-3 py-1 text-xs font-bold text-primary dark:text-white">$ USD</span>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-primary/5 bg-background-light p-4 dark:bg-white/5">
                <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">Deuda Capital</p>
                <p className="text-2xl font-black text-primary dark:text-slate-100">$24,500.00</p>
              </div>
              <div className="rounded-xl border border-primary/5 bg-background-light p-4 dark:bg-white/5">
                <p className="mb-2 text-[10px] font-bold uppercase text-slate-400">Intereses Acumulados</p>
                <p className="text-2xl font-black text-primary dark:text-slate-100">$3,240.50</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                <p className="mb-2 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Próximo Vencimiento</p>
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">$1,150.00</p>
                <p className="mt-1 text-[10px] font-medium text-emerald-600/70">12 Oct, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

