function Hero({ onLogin }) {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1e3a5f]/95 text-white shadow-lg backdrop-blur-md">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
          <a href="#home" className="text-lg font-bold tracking-tight" aria-label="DriveRent beranda">
            Drive<span className="text-amber-400">Rent</span>
          </a>
          <button
            type="button"
            onClick={onLogin}
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-bold text-[#1e3a5f] transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f]"
          >
            Login
          </button>
        </div>
      </nav>

      <section id="home" className="overflow-hidden bg-linear-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              Rental mobil, lebih mudah
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Perjalanan nyaman,
              <span className="block text-amber-400">dimulai di sini.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
              Temukan mobil yang tepat untuk perjalananmu. DriveRent membantu proses peminjaman dan pengelolaan rental dalam satu layanan yang praktis.
            </p>
            <button
              type="button"
              onClick={onLogin}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-[#1e3a5f] transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#152a45]"
            >
              Login
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85"
              alt="Mobil untuk menemani perjalanan bersama DriveRent"
              className="h-52 w-full object-cover sm:h-64 lg:h-72"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Mengapa DriveRent</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Urus perjalanan dan rental dari satu tempat.</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">Informasi mobil dan proses peminjaman tersusun jelas, agar kamu lebih mudah merencanakan perjalanan.</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {[
            { number: "01", title: "Pilih mobil", description: "Jelajahi katalog mobil dan lihat informasi yang tersedia sebelum mengajukan peminjaman." },
            { number: "02", title: "Ajukan dengan praktis", description: "Lengkapi pengajuan peminjaman melalui akun pelanggan dalam satu alur yang mudah diikuti." },
            { number: "03", title: "Pantau status", description: "Lihat status dan riwayat peminjamanmu kembali melalui halaman pelanggan." },
          ].map((item) => (
            <article key={item.number} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <span className="text-sm font-bold text-amber-500">{item.number}</span>
              <h3 className="mt-2 text-sm font-bold text-gray-900">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <span className="font-bold text-gray-900">Drive<span className="text-amber-400">Rent</span></span>
          <span>© {new Date().getFullYear()} DriveRent Indonesia</span>
        </div>
      </footer>
    </main>
  )
}

export default Hero
