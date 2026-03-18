import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from '../../../shared/components/Icon'

type DocumentType = 'DNI' | 'CE' | 'PASSPORT'

type CreateUserBody = {
  documentType: DocumentType
  documentNumber: string
  name: string
  email: string
  phone: string
  monthlyIncome: number
}

const initial: CreateUserBody = {
  documentType: 'DNI',
  documentNumber: '87654322',
  name: 'María García',
  email: 'cliente1@ejemplo.com',
  phone: '+51999888777',
  monthlyIncome: 4500,
}

export function CreateUserPage() {
  const [body, setBody] = useState<CreateUserBody>(initial)
  const [submitted, setSubmitted] = useState<CreateUserBody | null>(null)

  const canSubmit = useMemo(() => {
    const emailOk = body.email.trim().includes('@')
    const nameOk = body.name.trim().length >= 3
    const docOk = body.documentNumber.trim().length >= 6
    const phoneOk = body.phone.trim().length >= 7
    const incomeOk = Number.isFinite(body.monthlyIncome) && body.monthlyIncome > 0
    return emailOk && nameOk && docOk && phoneOk && incomeOk
  }, [body])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted({
      ...body,
      documentNumber: body.documentNumber.trim(),
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
    })
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Icon name="person_add" className="text-lg" />
          Usuarios
        </div>
        <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Crear usuario</h1>
        <p className="mt-1 text-sm text-slate-600">
          Completa los datos para simular el alta de un cliente.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Tipo de documento</span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.documentType}
                onChange={(e) =>
                  setBody((b) => ({ ...b, documentType: e.target.value as DocumentType }))
                }
              >
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="PASSPORT">Pasaporte</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Número de documento</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.documentNumber}
                onChange={(e) => setBody((b) => ({ ...b, documentNumber: e.target.value }))}
                placeholder="Ej. 87654322"
                inputMode="numeric"
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-800">Nombre completo</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.name}
                onChange={(e) => setBody((b) => ({ ...b, name: e.target.value }))}
                placeholder="Ej. María García"
                autoComplete="name"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Email</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.email}
                onChange={(e) => setBody((b) => ({ ...b, email: e.target.value }))}
                placeholder="cliente@ejemplo.com"
                autoComplete="email"
                type="email"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Teléfono</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.phone}
                onChange={(e) => setBody((b) => ({ ...b, phone: e.target.value }))}
                placeholder="+51999888777"
                autoComplete="tel"
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-800">Ingreso mensual</span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  S/
                </span>
                <input
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  value={Number.isFinite(body.monthlyIncome) ? String(body.monthlyIncome) : ''}
                  onChange={(e) =>
                    setBody((b) => ({
                      ...b,
                      monthlyIncome: Number(e.target.value),
                    }))
                  }
                  placeholder="4500"
                  inputMode="decimal"
                />
              </div>
              <span className="text-xs text-slate-500">
                Este valor se usa para la simulación de capacidad de pago.
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon name="save" className="text-lg" />
              Guardar usuario
            </button>
            <button
              type="button"
              onClick={() => {
                setBody(initial)
                setSubmitted(null)
              }}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Restablecer
            </button>
          </div>
        </form>

        <aside className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Icon name="info" className="text-xl text-slate-700" filled />
              <div>
                <div className="text-sm font-semibold text-slate-900">Payload</div>
                <p className="mt-1 text-sm text-slate-600">
                  Así quedaría el body para enviarlo al backend.
                </p>
              </div>
            </div>

            <pre className="mt-4 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
              {JSON.stringify(submitted ?? body, null, 2)}
            </pre>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Sugerencias</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Valida el documento según el tipo (DNI 8 dígitos, etc.).</li>
              <li>Normaliza teléfono a formato E.164.</li>
              <li>Agrega moneda y empleo si lo requiere el flujo.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

