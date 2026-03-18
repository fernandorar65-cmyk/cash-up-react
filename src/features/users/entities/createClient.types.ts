export type DocumentType = 'DNI' | 'CE' | 'PASSPORT'

export type CreateUserBody = {
  documentType: DocumentType
  documentNumber: string
  name: string
  email: string
  phone: string
  monthlyIncome: number
}

export type CreateClientResponse = {
  id?: string
  email?: string
  name?: string
  [k: string]: unknown
}

