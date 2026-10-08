export const API_URL = "http://localhost:3000"
export const AUTH_TOKEN_KEY = "driverent_token"

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  if (response.status === 401) {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    window.dispatchEvent(new Event("driverent:unauthorized"))
  }
  return response
}

