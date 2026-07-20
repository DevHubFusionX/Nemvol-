import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  withCredentials: true,
})

let cachedToken: string | null = null
let tokenExpiry = 0

api.interceptors.request.use(async (config) => {
  try {
    if (!cachedToken || Date.now() > tokenExpiry - 10_000) {
      cachedToken = await (window as any).Clerk?.session?.getToken() ?? null
      tokenExpiry = Date.now() + 55_000
    }
    if (cachedToken) config.headers.Authorization = `Bearer ${cachedToken}`
  } catch {
    // unauthenticated — skip
  }
  return config
})

// Clear token cache on sign-out so the next user doesn't reuse a stale token
if (typeof window !== 'undefined') {
  window.addEventListener('clerk:signout', () => {
    cachedToken = null
    tokenExpiry = 0
  })
}
