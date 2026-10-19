import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Admin from "./components/Admin"
import Cars from "./components/Cars"
import About from "./components/About"
import Pelanggan from "./components/Pelangggan"
import Transaksi from "./components/Transaksi"
import Login from "./components/Login"
import NavbarPelanggan from "./components/NavbarPelanggan"
import HomePelanggan from "./components/HomePelanggan"
import PeminjamanPelanggan from "./components/PeminjamanPelanggan"
import ProfilPelanggan from "./components/ProfilPelanggan"
import { apiFetch, AUTH_TOKEN_KEY } from "./lib/api"

function App() {
  const [user, setUser] = useState(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [page, setPage] = useState("home")
  const [selectedCarId, setSelectedCarId] = useState("")

  useEffect(() => {
    let active = true
    const loadUser = async () => {
      if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
        if (active) setIsCheckingAuth(false)
        return
      }
      try {
        const response = await apiFetch("/api/auth/me")
        if (!response.ok) throw new Error("Sesi tidak berlaku")
        const currentUser = await response.json()
        if (active) {
          setUser(currentUser)
          setPage(currentUser.role === "pelanggan" ? "customer-home" : "home")
        }
      } catch {
        localStorage.removeItem(AUTH_TOKEN_KEY)
      } finally {
        if (active) setIsCheckingAuth(false)
      }
    }
    loadUser()
    const handleUnauthorized = () => {
      setUser(null)
      setPage("login")
    }
    window.addEventListener("driverent:unauthorized", handleUnauthorized)
    return () => {
      active = false
      window.removeEventListener("driverent:unauthorized", handleUnauthorized)
    }
  }, [])

  const handleLogin = async (loginUser) => {
    setUser(loginUser)
    setPage(loginUser.role === "pelanggan" ? "customer-home" : "home")
    if (loginUser.role === "pelanggan") {
      try {
        const response = await apiFetch("/api/auth/me")
        if (response.ok) setUser(await response.json())
      } catch {
        // Login succeeded; the customer can retry loading profile from the profile view.
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setUser(null)
    setPage("home")
  }

  if (isCheckingAuth) {
    return <main className="flex min-h-screen items-center justify-center bg-gray-50 text-sm font-medium text-gray-500">Memeriksa sesi…</main>
  }

  if (!user) {
    if (page === "login") {
      return <Login onLogin={handleLogin} />
    }
    return <Hero onLogin={() => setPage("login")} />
  }

  if (user.role === "pelanggan") {
    return <>
      <NavbarPelanggan user={user} currentPage={page} onNavigate={setPage} onLogout={handleLogout} />
      {page === "customer-home" && <HomePelanggan user={user} onNavigate={setPage} />}
      {page === "customer-cars" && <Cars mode="catalog" onRent={(carId) => { setSelectedCarId(carId); setPage("customer-peminjaman") }} />}
      {page === "customer-peminjaman" && <PeminjamanPelanggan selectedCarId={selectedCarId} />}
      {page === "customer-profile" && <ProfilPelanggan user={user} />}
      {page === "customer-about" && <About />}
    </>
  }

  return (
    <>
      <Navbar onNavigate={setPage} currentPage={page} onLogout={handleLogout} />

      {page === "home" && <Admin onNavigate={setPage} />}
      {page === "cars" && <Cars />}
      {page === "pelanggan" && <Pelanggan />}
      {page === "transaksi" && <Transaksi />}
      {page === "about" && <About />}
    </>
  )
}

export default App
