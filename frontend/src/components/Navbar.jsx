import { useState } from 'react'

function Navbar({ currentPage, onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'cars', label: 'Mobil' },
    { id: 'pelanggan', label: 'Pelanggan' },
    { id: 'transaksi', label: 'Transaksi' },
    { id: 'about', label: 'Tentang' },
  ]

  const handleNavigate = (page) => {
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1e3a5f]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-amber-500 text-[#1e3a5f] shadow-md shadow-amber-400/30 transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM23 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              <path d="M3 17V11l2-5h14l2 5v6" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
            Drive<span className="text-amber-400">Rent</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`relative rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-300 xl:px-3 ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-blue-100/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-amber-400 transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={onLogout}
            className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-red-300/50 hover:bg-red-400/10 hover:text-red-100"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isOpen}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-y-auto border-t border-white/10 bg-[#152a45] transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          isOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6 lg:px-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-400/10 text-amber-400'
                    : 'text-blue-100/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            )
          })}

          <button
            onClick={() => { setIsOpen(false); onLogout?.() }}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-400/10"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar