import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'

type CreditRequestBody = {
  requestedAmount: number
  termMonths: number
  currency?: string
  purpose?: string
  clientNotes?: string
}

type CreditRequestResponse = {
  id?: string
  status?: string
  requestedAmount?: number
  termMonths?: number
  [k: string]: unknown
}

const initial: CreditRequestBody = {
  requestedAmount: 8000,
  termMonths: 12,
  currency: 'PEN',
  purpose: 'Consolidación de deudas',
  clientNotes: '',
}

export function ClientNewCreditRequestPage() {
  const [body, setBody] = useState<CreditRequestBody>(initial)
  const [result, setResult] = useState<CreditRequestResponse | CreditRequestBody | null>(null)

  const createMutation = useMutation({
    mutationKey: ['credit-requests', 'create'],
    mutationFn: async (payload: CreditRequestBody) => {
      const { data } = await httpClient.post<CreditRequestResponse>('/credit-requests', payload)
      return data
    },
    onSuccess: (data) => setResult(data),
  })

  const canSubmit = useMemo(() => {
    const amountOk = Number.isFinite(body.requestedAmount) && body.requestedAmount > 0
    const termOk = Number.isFinite(body.termMonths) && body.termMonths >= 1
    return amountOk && termOk && !createMutation.isPending
  }, [body.requestedAmount, body.termMonths, createMutation.isPending])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const payload: CreditRequestBody = {
      requestedAmount: Number(body.requestedAmount),
      termMonths: Number(body.termMonths),
      currency: body.currency?.trim() || undefined,
      purpose: body.purpose?.trim() || undefined,
      clientNotes: body.clientNotes?.trim() || undefined,
    }
    setResult(payload)
    createMutation.mutate(payload)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon name="add_circle" className="text-lg" />
              Solicitud
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Solicitar crédito</h1>
            <p className="mt-1 text-sm text-slate-600">Completa los datos para crear tu solicitud.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Monto solicitado</span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  S/
                </span>
                <input
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  value={String(body.requestedAmount)}
                  onChange={(e) => setBody((b) => ({ ...b, requestedAmount: Number(e.target.value) }))}
                  inputMode="decimal"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Plazo (meses)</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={String(body.termMonths)}
                onChange={(e) => setBody((b) => ({ ...b, termMonths: Number(e.target.value) }))}
                inputMode="numeric"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Moneda</span>
              <select
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.currency ?? 'PEN'}
                onChange={(e) => setBody((b) => ({ ...b, currency: e.target.value }))}
              >
                <option value="PEN">PEN (S/)</option>
                <option value="USD">USD ($)</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Motivo (opcional)</span>
              <input
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.purpose ?? ''}
                onChange={(e) => setBody((b) => ({ ...b, purpose: e.target.value }))}
                placeholder="Ej. Emergencia, inversión, etc."
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-semibold text-slate-800">Notas (opcional)</span>
              <textarea
                className="min-h-28 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                value={body.clientNotes ?? ''}
                onChange={(e) => setBody((b) => ({ ...b, clientNotes: e.target.value }))}
                placeholder="Cuéntanos un poco más…"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon name="send" className="text-lg" />
              {createMutation.isPending ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <button
              type="button"
              onClick={() => {
                setBody(initial)
                setResult(null)
                createMutation.reset()
              }}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Restablecer
            </button>
          </div>

          {createMutation.isError ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {errorMessage(createMutation.error)}
            </div>
          ) : null}
          {createMutation.isSuccess ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              Solicitud creada correctamente.
            </div>
          ) : null}
        </form>

        <aside className="space-y-4 lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Icon name="receipt_long" className="text-xl text-slate-700" filled />
              <div>
                <div className="text-sm font-semibold text-slate-900">Resumen</div>
                <p className="mt-1 text-sm text-slate-600">
                  Revisa el payload antes de enviar.
                </p>
              </div>
            </div>
            <pre className="mt-4 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800">
              {JSON.stringify(result ?? body, null, 2)}
            </pre>
          </div>
        </aside>
      </div>
    </div>
  )
}

