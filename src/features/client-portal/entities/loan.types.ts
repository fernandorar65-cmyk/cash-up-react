export type Loan = {
  id: string
  clientId?: string
  amount?: number
  principal?: number
  currency?: string
  status?: string
  interestRate?: number
  interestType?: string
  termMonths?: number
  createdAt?: string
  updatedAt?: string
  [k: string]: unknown
}

export type Installment = {
  id: string
  loanId?: string
  number?: number
  dueDate?: string
  status?: 'PENDING' | 'PAID' | 'OVERDUE' | string
  principalAmount?: number
  interestAmount?: number
  amount?: number
  totalAmount?: number
  [k: string]: unknown
}

