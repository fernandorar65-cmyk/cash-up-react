export type CreditRequestBody = {
  requestedAmount: number
  termMonths: number
  currency?: string
  purpose?: string
  clientNotes?: string
}

export type CreditRequestResponse = {
  id?: string
  status?: string
  requestedAmount?: number
  termMonths?: number
  [k: string]: unknown
}

