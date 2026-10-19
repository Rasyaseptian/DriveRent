import { useState } from "react"
import { apiFetch, AUTH_TOKEN_KEY } from "../lib/api"

function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || "Login gagal. Coba periksa kembali akunmu.")
      if (!data.token || !["admin", "pelanggan"].includes(data.user?.role)) {
        throw new Error("Respons login dari server tidak valid.")
      }
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
      onLogin(data.user)
    } catch (requestError) {
      setError(requestError.message || "Tidak dapat terhubung ke server.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-linear-to-br from-[#0b1a2e] via-[#152a45] to-[#1e3a5f] px-4 py-5">
      <section className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25">
        <div className="bg-[#1e3a5f] px-6 py-5 text-white sm:px-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-lg font-black text-[#1e3a5f]">D</span>
            <span className="text-lg font-bold">Drive<span className="text-amber-400">Rent</span></span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Selamat datang</p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight">Masuk</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:px-7 sm:py-6">
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <label className="block text-sm font-semibold text-gray-700">
            Username atau email
            <input
              autoComplete="username"
              required
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-normal outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"
            />
          </label>
          <label className="block text-sm font-semibold text-gray-700">
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 font-normal outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold text-[#1e3a5f] transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Memeriksa akun…" : "Masuk"}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
