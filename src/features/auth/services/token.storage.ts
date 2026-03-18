const TOKEN_KEY = 'cashup.token'
const ROLE_KEY = 'cashup.role'
const TOKEN_EVENT = 'cashup:token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
  window.dispatchEvent(new CustomEvent<string>(TOKEN_EVENT, { detail: token }))
}

export function getRole(): string | null {
  return localStorage.getItem(ROLE_KEY)
}

export function setRole(role: string) {
  localStorage.setItem(ROLE_KEY, role)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROLE_KEY)
  window.dispatchEvent(new CustomEvent<string | null>(TOKEN_EVENT, { detail: null }))
}

export function onTokenChange(handler: (token: string | null) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string | null>).detail ?? null)
  window.addEventListener(TOKEN_EVENT, listener)
  return () => window.removeEventListener(TOKEN_EVENT, listener)
}

