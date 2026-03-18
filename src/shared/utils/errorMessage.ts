export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  if (!err || typeof err !== 'object') return 'Ocurrió un error'

  const e = err as Record<string, unknown>
  const message = e['message']
  if (typeof message === 'string') return message

  const response = e['response']
  if (response && typeof response === 'object') {
    const r = response as Record<string, unknown>
    const data = r['data']
    if (data && typeof data === 'object') {
      const d = data as Record<string, unknown>
      const backendMessage = d['message'] ?? d['error']
      if (typeof backendMessage === 'string') return backendMessage
      if (Array.isArray(backendMessage)) {
        const first = backendMessage.find((x) => typeof x === 'string')
        if (typeof first === 'string') return first
      }
    }
  }

  const toString = (e['toString'] as (() => string) | undefined) ?? undefined
  const text = toString?.call(err as object)
  const msg = typeof text === 'string' ? text : ''
  return typeof msg === 'string' ? msg : 'Ocurrió un error'
}

