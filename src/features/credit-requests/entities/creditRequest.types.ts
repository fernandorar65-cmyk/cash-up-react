export type PendingCreditRequest = {
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

export type CreditRequestDetail = {
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

