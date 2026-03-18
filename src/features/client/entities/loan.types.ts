export type Loan = {
  id: string
  status?: string
  currency?: string
  principal?: number
  interestRate?: number
  interestType?: string
  termMonths?: number
  createdAt?: string
  [k: string]: unknown
}

export type Installment = {
  id: string
  number?: number
  dueDate?: string
  status?: 'PENDING' | 'PAID' | 'OVERDUE' | string
  amount?: number
  [k: string]: unknown
}

