function HomePelanggan({ user, onNavigate }) {
  return (
    <main className="min-h-screen bg-white">
      <section className="overflow-hidden bg-linear-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Area Pelanggan</span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Halo, {user?.nama || user?.username || "Pelanggan"}!</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100/80">Temukan mobil yang cocok untuk perjalananmu, ajukan peminjaman, dan pantau statusnya dari satu tempat.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => onNavigate("customer-cars")} className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-[#1e3a5f] transition hover:bg-amber-300">Jelajahi mobil</button>
              <button onClick={() => onNavigate("customer-peminjaman")} className="rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Peminjaman saya</button>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur">
            <p className="text-sm font-semibold text-amber-300">Perjalanan lebih mudah</p>
            <h2 className="mt-3 text-2xl font-bold">Semua kebutuhan sewa mobilmu.</h2>
            <ul className="mt-6 space-y-4 text-sm text-blue-100/80">
              <li className="flex gap-3"><span className="text-amber-300">✓</span>Lihat mobil dan ketersediaannya</li>
              <li className="flex gap-3"><span className="text-amber-300">✓</span>Ajukan peminjaman sesuai tanggal</li>
              <li className="flex gap-3"><span className="text-amber-300">✓</span>Pantau riwayat peminjaman</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePelanggan
