type JwtPayload = {
  exp?: number
  sub?: string
  userId?: string
  roles?: string[] | string
  role?: string
  [key: string]: unknown
}

function base64UrlDecode(input: string) {
  const padLen = (4 - (input.length % 4)) % 4
  const base64 = (input + '='.repeat(padLen)).replace(/-/g, '+').replace(/_/g, '/')
  const decoded = atob(base64)
  try {
    return decodeURIComponent(
      decoded
        .split('')
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    )
  } catch {
    return decoded
  }
}

export function decodeJwt(token: string): JwtPayload | null {
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const json = base64UrlDecode(parts[1]!)
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

export function isJwtExpired(token: string, skewMs = 15_000): boolean {
  const payload = decodeJwt(token)
  if (!payload?.exp) return false
  const expMs = payload.exp * 1000
  return Date.now() + skewMs >= expMs
}

export function getJwtRoles(token: string): string[] {
  const payload = decodeJwt(token)
  const roles = payload?.roles ?? payload?.role
  if (!roles) return []
  if (Array.isArray(roles)) return roles.filter((r): r is string => typeof r === 'string')
  if (typeof roles === 'string') return [roles]
  return []
}

export function getJwtSubject(token: string): string | null {
  const payload = decodeJwt(token)
  const sub = payload?.sub ?? payload?.userId
  return typeof sub === 'string' ? sub : null
}

