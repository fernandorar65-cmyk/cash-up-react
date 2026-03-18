export type ClientMe = {
  id: string
  documentType?: string
  documentNumber?: string
  name: string
  email: string
  phone?: string
  monthlyIncome?: number
  score?: number
  [k: string]: unknown
}

export type UpdateClientMe = {
  name?: string
  email?: string
  phone?: string
  monthlyIncome?: number
}

