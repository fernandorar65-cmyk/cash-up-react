import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'
import { useState } from 'react'

type PendingCreditRequest = {
  id: string
  clientId: string
  requestedAmount: number
  termMonths: number
  currency?: string
  purpose?: string
  clientNotes?: string
  evaluationId?: string
  status: 'PENDING' | string
  createdAt: string
}

export function PendingCreditRequestsPage() {
  const queryClient = useQueryClient()
  const pendingQuery = useQuery({
    queryKey: ['credit-requests', 'pending'],
    queryFn: async () => {
      const { data } = await httpClient.get<PendingCreditRequest[]>('/credit-requests/pending')
      return data
    },
  })

  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')

  const rejectMutation = useMutation({
    mutationKey: ['credit-requests', 'reject'],
    mutationFn: async (payload: { id: string; rejectionReason: string }) => {
      const { data } = await httpClient.patch(`/credit-requests/${payload.id}/reject`, {
        rejectionReason: payload.rejectionReason,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-requests', 'pending'] })
      setRejectOpen(false)
      setRejectingId(null)
      setRejectionReason('')
    },
  })

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon name="pending_actions" className="text-lg" />
              Créditos pendientes
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              Bandeja de solicitudes
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Lista de solicitudes en estado <span className="font-semibold">PENDING</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total</div>
            <div className="mt-1 text-xl font-black text-slate-900">
              {pendingQuery.data?.length ?? 0}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {pendingQuery.isLoading ? (
          <div className="text-sm text-slate-600">Cargando…</div>
        ) : pendingQuery.isError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {errorMessage(pendingQuery.error)}
          </div>
        ) : pendingQuery.data?.length ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Monto</th>
                  <th className="px-4 py-3">Plazo</th>
                  <th className="px-4 py-3">Propósito</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Creado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pendingQuery.data.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{it.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{it.clientId}</td>
                    <td className="px-4 py-3 text-slate-900 font-semibold">
                      {it.currency ?? '—'} {it.requestedAmount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{it.termMonths} meses</td>
                    <td className="px-4 py-3 text-slate-700">{it.purpose ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                        {it.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {it.createdAt ? new Date(it.createdAt).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to="/staff/credit-requests/approve"
                          state={{ creditRequestId: it.id }}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                        >
                          <Icon name="rule" className="text-[18px]" />
                          Aprobar
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setRejectingId(it.id)
                            setRejectionReason('')
                            setRejectOpen(true)
                          }}
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
                        >
                          <Icon name="cancel" className="text-[18px]" />
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
            No hay solicitudes pendientes.
          </div>
        )}
      </div>

      {rejectOpen && rejectingId ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4"
        >
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Icon name="cancel" className="text-lg text-rose-700" />
                  Rechazar solicitud
                </div>
                <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900">Motivo de rechazo</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Ingresa un motivo claro. Esto se enviará al backend.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRejectOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Cerrar
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!rejectingId) return
                rejectMutation.mutate({ id: rejectingId, rejectionReason: rejectionReason.trim() })
              }}
              className="mt-5 space-y-4"
            >
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">RejectionReason</span>
                <textarea
                  className="min-h-[120px] w-full resize-y rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Ej. ingresos no verificables / documentación incompleta / riesgo alto..."
                />
              </label>

              {rejectMutation.isError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                  {errorMessage(rejectMutation.error)}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!rejectionReason.trim().length || rejectMutation.isPending}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {rejectMutation.isPending ? 'Rechazando…' : 'Confirmar rechazo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

