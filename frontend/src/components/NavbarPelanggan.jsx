import { useState } from "react"

const items = [
  { id: "customer-home", label: "Home" },
  { id: "customer-cars", label: "Mobil" },
  { id: "customer-peminjaman", label: "Peminjaman" },
  { id: "customer-profile", label: "Profil" },
]

function NavbarPelanggan({ currentPage, onNavigate, onLogout, user }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = (page) => {
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1e3a5f]/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <button onClick={() => navigate("customer-home")} className="text-lg font-bold tracking-tight">
          Drive<span className="text-amber-400">Rent</span>
        </button>
        <div className="hidden items-center gap-1 sm:flex">
          {items.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${currentPage === item.id ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5 hover:text-white"}`}>
              {item.label}
            </button>
          ))}
          <button onClick={onLogout} className="ml-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-300/50 hover:bg-red-400/10 hover:text-red-100">
            Logout
          </button>
        </div>
        <button type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Tutup menu" : "Buka menu"} aria-expanded={isOpen} className="rounded-lg border border-white/20 px-3 py-2 text-sm sm:hidden">
          {isOpen ? "Tutup" : "Menu"}
        </button>
      </div>
      {isOpen && (
        <div className="space-y-1 border-t border-white/10 bg-[#152a45] px-4 py-3 sm:hidden">
          {items.map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold ${currentPage === item.id ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"}`}>
              {item.label}
            </button>
          ))}
          <button onClick={() => { setIsOpen(false); onLogout() }} className="block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-200 hover:bg-red-400/10">Logout{user?.nama ? ` · ${user.nama}` : ""}</button>
        </div>
      )}
    </nav>
  )
}

export default NavbarPelanggan
