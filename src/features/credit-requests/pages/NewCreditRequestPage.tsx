import { Icon } from '../../../shared/components/Icon'

export function NewCreditRequestPage() {
  const checklist: Array<{ label: string; checked: boolean }> = [
    { label: 'Identidad validada', checked: true },
    { label: 'Sin deudas en BCRA', checked: true },
    { label: 'Ingresos demostrables', checked: false },
    { label: 'Antigüedad laboral > 6m', checked: false },
  ]

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <header className="mb-2">
          <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <a className="transition-colors hover:text-primary" href="#">
              Clientes
            </a>
            <Icon name="chevron_right" className="text-[16px]" />
            <a className="transition-colors hover:text-primary" href="#">
              Perfil
            </a>
            <Icon name="chevron_right" className="text-[16px]" />
            <span className="font-medium text-slate-900 dark:text-slate-100">Nueva Solicitud</span>
          </nav>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">Nueva Solicitud de Crédito</h2>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Resumen del Cliente</h3>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Riesgo Bajo
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">Maria Rodriguez</p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Icon name="fingerprint" className="text-[16px]" /> DNI: 30.123.456
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="speed" className="text-[16px]" /> Scoring:{' '}
                  <strong className="text-primary dark:text-slate-200">750</strong>
                </span>
              </div>
            </div>
            <button className="hidden text-sm font-semibold text-primary hover:underline sm:block">Ver Perfil</button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <Icon name="tune" className="text-primary" /> Parámetros del Crédito
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Monto Solicitado</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-7 pr-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800" defaultValue="150,000" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Plazo (Meses)</label>
              <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800">
                <option>12 meses</option>
                <option selected>24 meses</option>
                <option>36 meses</option>
                <option>48 meses</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tasa de Interés Anual (TNA %)</label>
              <div className="relative">
                <input className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800" defaultValue="65.5" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Destino del Crédito</label>
              <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800">
                <option>Consumo</option>
                <option>Microemprendimiento</option>
                <option>Refacción Vivienda</option>
                <option>Otros</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <Icon name="verified_user" className="text-primary" /> Riesgo y Documentación
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Icon name="assessment" className="text-primary" />
                <div>
                  <p className="text-sm font-bold">Informe de Scoring Externo</p>
                  <p className="text-xs text-slate-500">Actualizado hace 2 días</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm font-semibold text-primary">
                Ver Informe <Icon name="open_in_new" className="text-[16px]" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Comprobantes de Ingresos</p>
              <div className="cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-8 text-center transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40">
                <Icon name="cloud_upload" className="text-4xl text-slate-300" />
                <div className="mt-2">
                  <p className="text-sm font-medium">Arrastra los archivos o haz clic aquí</p>
                  <p className="mt-1 text-xs text-slate-400">PDF, JPG o PNG (Max. 10MB)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <button className="flex-1 rounded-lg bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
            Crear Solicitud
          </button>
          <button className="flex-1 rounded-lg border border-slate-200 bg-white px-6 py-3 font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Cancelar
          </button>
        </div>
      </div>

      <aside className="lg:col-span-1">
        <div className="sticky top-8 flex flex-col gap-6">
          <div className="rounded-xl bg-primary p-6 text-white shadow-xl">
            <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">Resumen de Proyección</h3>
            <div className="space-y-6">
              <div>
                <p className="mb-1 text-sm text-slate-300">Cuota Mensual Estimada</p>
                <p className="text-4xl font-black">$ 14.230,50</p>
              </div>
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Intereses</span>
                  <span className="font-bold">$ 191.532,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Gastos Administrativos</span>
                  <span className="font-bold">$ 4.500,00</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total a Pagar</span>
                  <span className="text-green-400">$ 341.532,00</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4">
                <p className="text-[11px] italic leading-relaxed text-slate-400">
                  * Los valores son proyecciones basadas en la TNA informada y están sujetos a aprobación final por el comité de riesgos.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="mb-4 text-sm font-bold">Checklist de Validación</h4>
            <div className="space-y-3">
              {checklist.map(({ label, checked }) => (
                <label key={label} className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 dark:text-slate-400">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

