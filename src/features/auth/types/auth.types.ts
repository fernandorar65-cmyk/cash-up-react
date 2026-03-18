export type Role = 'ADMIN' | 'ANALYST' | 'CLIENT'

export type AuthSession = {
  token: string
  userId: string | null
  roles: Role[]
}

