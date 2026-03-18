import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpClient } from '../../../shared/services/httpClient'
import { errorMessage } from '../../../shared/utils/errorMessage'
import { Icon } from '../../../shared/components/Icon'

type Evaluation = {
  id: string
  clientId: string
  score?: number
  approved?: boolean
  factors?: Record<string, unknown>
  evaluatedAt?: string
  evaluationOutcome?: number
}

type CreditRequestDetail = {
  id: string
  clientId: string
  requestedAmount?: number
  termMonths?: number
  currency?: string
  purpose?: string
  status?: string
  createdAt?: string
  [k: string]: unknown
}

type ReviewLocationState = {
  clientId?: string
  requestedAmount?: number
  termMonths?: number
  currency?: string
  purpose?: string
}

export function ReviewCreditRequestPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const state = (location.state ?? {}) as ReviewLocationState

  const detailQuery = useQuery({
    queryKey: ['credit-requests', id, 'detail'],
    enabled: Boolean(id) && !state.clientId,
    queryFn: async () => {
      const { data } = await httpClient.get<CreditRequestDetail>(`/credit-requests/${id}`)
      return data
    },
  })

  const clientId = state.clientId ?? detailQuery.data?.clientId

  const evaluationsQuery = useQuery({
    queryKey: ['clients', clientId, 'evaluations'],
    enabled: Boolean(clientId),
    queryFn: async () => {
      const { data } = await httpClient.get<Evaluation[]>(`/clients/${clientId}/evaluations`)
      return data
    },
  })

  const [rejectionReason, setRejectionReason] = useState('')
  const [approvedAmount, setApprovedAmount] = useState<string>('')
  const [approvedTermMonths, setApprovedTermMonths] = useState<string>('')
  const [approvedInterestRate, setApprovedInterestRate] = useState<string>('')
  const [approvedInterestType, setApprovedInterestType] = useState<string>('TEA')
  const [firstInstallmentDueDate, setFirstInstallmentDueDate] = useState<string>('')

  // Inicializar defaults desde el pending (state) o desde el detail query.
  useEffect(() => {
    const amount = state.requestedAmount ?? detailQuery.data?.requestedAmount
    const term = state.termMonths ?? detailQuery.data?.termMonths
    if (typeof amount === 'number') setApprovedAmount(String(amount))
    if (typeof term === 'number') setApprovedTermMonths(String(term))
  }, [detailQuery.data, state.requestedAmount, state.termMonths])

  const underReviewMutation = useMutation({
    mutationKey: ['credit-requests', id, 'under-review'],
    mutationFn: async () => httpClient.patch(`/credit-requests/${id}/under-review`),
  })

  useEffect(() => {
    if (!id) return
    // React Query: `mutate()` no devuelve Promise; usamos `mutateAsync()` para poder manejar errores.
    underReviewMutation.mutateAsync().catch(() => {
      // Si ya estaba en UNDER_REVIEW o el backend rechaza la transición, igual seguimos con la UI.
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const approveMutation = useMutation({
    mutationKey: ['credit-requests', id, 'approve'],
    mutationFn: async () => {
      const payload = {
        approvedAmount: Number(approvedAmount),
        approvedTermMonths: Number(approvedTermMonths),
        approvedInterestRate: Number(approvedInterestRate),
        approvedInterestType,
        ...(firstInstallmentDueDate ? { firstInstallmentDueDate } : {}),
      }
      const { data } = await httpClient.patch(`/credit-requests/${id}/approve`, payload)
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['credit-requests', 'pending'] })
      navigate('/staff/credit-requests/pending', { replace: true })
    },
  })

  const rejectMutation = useMutation({
    mutationKey: ['credit-requests', id, 'reject'],
    mutationFn: async () => {
      const payload = { rejectionReason: rejectionReason.trim() }
      const { data } = await httpClient.patch(`/credit-requests/${id}/reject`, payload)
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['credit-requests', 'pending'] })
      navigate('/staff/credit-requests/pending', { replace: true })
    },
  })

  const canApprove = useMemo(() => {
    const amountOk = Number.isFinite(Number(approvedAmount)) && Number(approvedAmount) > 0
    const termOk = Number.isFinite(Number(approvedTermMonths)) && Number(approvedTermMonths) >= 1
    const rateOk = Number.isFinite(Number(approvedInterestRate)) && Number(approvedInterestRate) > 0
    const typeOk = approvedInterestType.trim().length >= 2
    return amountOk && termOk && rateOk && typeOk && !approveMutation.isPending
  }, [approvedAmount, approvedInterestRate, approvedInterestType, approvedTermMonths, approveMutation.isPending])

  const canReject = useMemo(() => {
    return rejectionReason.trim().length >= 5 && !rejectMutation.isPending
  }, [rejectionReason, rejectMutation.isPending])

  function onApprove(e: FormEvent) {
    e.preventDefault()
    if (!canApprove) return
    approveMutation.mutate()
  }

  function onReject(e: FormEvent) {
    e.preventDefault()
    if (!canReject) return
    rejectMutation.mutate()
  }

  return (
    <div className="p-6 space-y-6">
  
      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Icon name="pending_actions" className="text-lg" />
              Revisión de solicitud
            </div>
  
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Crédito #{id}
            </h1>
  
            <p className="mt-1 text-sm text-slate-600">
              Historial del cliente y decisión.
            </p>
          </div>
  
          <button
            onClick={() => navigate('/staff/credit-requests/pending', { replace: true })}
            className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium hover:bg-slate-50"
          >
            Volver
          </button>
        </div>
      </div>
  
      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
  
        {/* Cliente */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Cliente</p>
  
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Client ID</p>
            <p className="mt-1 font-mono text-sm font-semibold">
              {clientId ?? '—'}
            </p>
          </div>
  
          <p className="mt-4 text-sm text-slate-500">
            {underReviewMutation.isPending
              ? 'Pasando a revisión…'
              : 'Listo para decidir'}
          </p>
        </div>
  
        {/* Historial + acciones */}
        <div className="lg:col-span-2 space-y-6">
  
          {/* Historial */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <Icon name="history" className="text-lg" />
              Historial crediticio
            </div>
  
            <div className="mt-4">
              {evaluationsQuery.isLoading ? (
                <p className="text-sm text-slate-500">Cargando…</p>
              ) : evaluationsQuery.isError ? (
                <div className="text-sm text-red-600">
                  {errorMessage(evaluationsQuery.error)}
                </div>
              ) : evaluationsQuery.data?.length ? (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500">
                      <tr>
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Score</th>
                        <th className="px-3 py-2">Aprobado</th>
                        <th className="px-3 py-2">Fecha</th>
                      </tr>
                    </thead>
  
                    <tbody className="divide-y">
                      {evaluationsQuery.data.map((ev) => (
                        <tr key={ev.id}>
                          <td className="px-3 py-2 font-mono text-xs">{ev.id}</td>
                          <td className="px-3 py-2">{ev.score ?? '—'}</td>
                          <td className="px-3 py-2">
                            {ev.approved ? 'Sí' : 'No'}
                          </td>
                          <td className="px-3 py-2">
                            {ev.evaluatedAt
                              ? new Date(ev.evaluatedAt).toLocaleDateString()
                              : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Sin historial
                </p>
              )}
            </div>
          </div>
  
          {/* Acciones */}
          <div className="grid gap-6 md:grid-cols-2">
  
            {/* Aprobar */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold">Aprobar</h2>
  
              <form onSubmit={onApprove} className="mt-4 space-y-3">
  
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Monto"
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(e.target.value)}
                />
  
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Plazo"
                  value={approvedTermMonths}
                  onChange={(e) => setApprovedTermMonths(e.target.value)}
                />
  
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Tasa"
                  value={approvedInterestRate}
                  onChange={(e) => setApprovedInterestRate(e.target.value)}
                />
  
                <button
                  type="submit"
                  disabled={!canApprove}
                  className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm disabled:opacity-50"
                >
                  {approveMutation.isPending ? 'Procesando…' : 'Aprobar'}
                </button>
              </form>
            </div>
  
            {/* Rechazar */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold">Rechazar</h2>
  
              <form onSubmit={onReject} className="mt-4 space-y-3">
  
                <textarea
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  rows={4}
                  placeholder="Motivo"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
  
                <button
                  type="submit"
                  disabled={!canReject}
                  className="w-full border border-red-300 text-red-600 py-2 rounded-lg text-sm disabled:opacity-50"
                >
                  {rejectMutation.isPending ? 'Procesando…' : 'Rechazar'}
                </button>
              </form>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  )

}

