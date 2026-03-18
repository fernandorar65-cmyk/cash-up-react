import { Icon } from '../../../shared/components/Icon'

export function ApproveCreditRequestPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="mb-2 flex gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Administración</span>
            <span>/</span>
            <span className="text-slate-900">Solicitudes de Crédito</span>
          </nav>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Aprobación y Desembolso</h1>
          <p className="text-slate-600">Expediente ID: #CSH-99283-B</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-yellow-800">
            En Revisión
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Juan Carlos Pérez</h3>
              <p className="text-sm text-slate-500">Documento: 72839441-A</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="mb-1 text-xs font-medium uppercase tracking-tight text-slate-500">Scoring Actual</p>
              <p className="text-2xl font-bold text-slate-900">750</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <p className="mb-1 text-xs font-medium uppercase tracking-tight text-slate-500">Riesgo</p>
              <p className="text-lg font-bold text-emerald-600">BAJO</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Icon name="analytics" className="text-slate-700" />
            <h3 className="text-lg font-bold text-slate-900">Propuesta de Crédito</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ['Monto', '$10,000'],
              ['Tasa (TEA)', '12.0%'],
              ['Plazo', '24 Meses'],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <p className="text-xs font-medium uppercase text-slate-500">{k}</p>
                <p className="text-xl font-bold text-slate-900">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Cuota Estimada:</span>
              <span className="font-bold text-slate-900">$470.73</span>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Icon name="rule" /> Flujo de Gestión
        </h3>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Observaciones y Motivo (Requerido para rechazo u observación)
            </label>
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              placeholder="Ingrese comentarios internos..."
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-bold text-white transition hover:bg-emerald-700">
                <Icon name="check_circle" className="text-lg" /> Aprobar Crédito
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-2.5 font-bold text-slate-700 transition hover:bg-slate-50">
                <Icon name="visibility" className="text-lg" /> Observar
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-6 py-2.5 font-bold text-rose-700 transition hover:bg-rose-100">
                <Icon name="cancel" className="text-lg" /> Rechazar
              </button>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 lg:block" />
            <button
              className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-8 py-2.5 font-bold text-slate-400"
              disabled
            >
              <Icon name="payments" className="text-lg" /> Desembolsar
            </button>
          </div>
          <p className="text-xs italic text-slate-400">
            * El botón de desembolso se activará únicamente tras la aprobación definitiva del comité de riesgos.
          </p>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 p-6">
          <h3 className="flex items-center gap-2 font-bold text-slate-900">
            <Icon name="calendar_month" /> Cronograma Final de Cuotas (Vista Previa)
          </h3>
          <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:underline">
            <Icon name="download" className="text-sm" /> Descargar PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                {['N° Cuota', 'Fecha de Vencimiento', 'Capital', 'Interés', 'Seguro / Comis.', 'Total Cuota'].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-4 ${h === 'Total Cuota' ? 'font-bold text-slate-900' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                ['1', '15 Oct 2023', '$370.73', '$100.00', '$12.50', '$483.23'],
                ['2', '15 Nov 2023', '$374.44', '$96.29', '$12.50', '$483.23'],
                ['3', '15 Dic 2023', '$378.18', '$92.55', '$12.50', '$483.23'],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="px-6 py-4 font-medium">{r[0]}</td>
                  <td className="px-6 py-4">{r[1]}</td>
                  <td className="px-6 py-4">{r[2]}</td>
                  <td className="px-6 py-4">{r[3]}</td>
                  <td className="px-6 py-4">{r[4]}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{r[5]}</td>
                </tr>
              ))}
              <tr className="bg-slate-50">
                <td className="px-6 py-3 text-center text-xs italic text-slate-400" colSpan={6}>
                  ... 21 cuotas restantes ...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

