function Hero({ onLogin }) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#f8fafc] text-[#142b46]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
      <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#home" className="text-xl font-extrabold tracking-tight" aria-label="DriveRent beranda">
          Drive<span className="text-amber-500">Rent</span>
        </a>
        <button
          type="button"
          onClick={onLogin}
          className="rounded-full bg-[#1e3a5f] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#152a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          Login
        </button>
      </header>

      <section id="home" className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/10 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1e3a5f] shadow-sm">
            Rental mobil, lebih mudah
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-[#142b46] sm:text-5xl lg:text-6xl">
            Perjalanan nyaman,
            <span className="mt-1 block text-[#d99a16]">dimulai di sini.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Temukan mobil yang tepat untuk perjalananmu. DriveRent membantu proses peminjaman dan pengelolaan rental dalam satu layanan yang praktis.
          </p>
          <button
            type="button"
            onClick={onLogin}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1e3a5f] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1e3a5f]/15 transition hover:-translate-y-0.5 hover:bg-[#152a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            Login
            <span aria-hidden="true">→</span>
          </button>
          <p className="mt-4 text-xs text-slate-500">Akses khusus untuk admin dan pelanggan terdaftar.</p>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200/60 to-sky-100/70 blur-xl" />
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
            alt="Mobil untuk menemani perjalanan bersama DriveRent"
            className="relative h-64 w-full rounded-[1.5rem] object-cover shadow-2xl shadow-slate-900/15 sm:h-80 lg:h-[25rem]"
            fetchPriority="high"
          />
          <div className="absolute -bottom-4 left-4 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:bottom-5 sm:left-5">
            <p className="text-xs font-medium text-slate-500">Perjalananmu</p>
            <p className="mt-0.5 text-sm font-bold text-[#1e3a5f]">Lebih praktis bersama DriveRent</p>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-slate-200/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:px-8 lg:px-10">
          <span>© {new Date().getFullYear()} DriveRent Indonesia</span>
          <span>Teman perjalanan yang bisa diandalkan.</span>
        </div>
      </footer>
    </main>
  )
}

export default Hero
