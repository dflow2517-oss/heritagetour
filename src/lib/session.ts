const SESSION_KEY = 'heritage_session_id'

export function getSessionId(): string {
  const existing = localStorage.getItem(SESSION_KEY)
  if (existing) return existing
  const id = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, id)
  return id
}
