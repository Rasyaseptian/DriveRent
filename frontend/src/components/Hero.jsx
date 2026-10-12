function Hero({ onNavigate }) {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                Dashboard Admin
              </span>

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Kelola Operasional Rental
                <br />
                <span className="text-amber-400">Lebih Terarah</span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Atur armada, data pelanggan, dan transaksi dari satu tempat.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Mobil premium DriveRent"
                className="h-40 w-full object-cover sm:h-52 lg:h-56"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Akses Pengelolaan</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {[
            {
              title: "Kelola Mobil",
              desc: "Atur daftar armada, informasi, harga, dan ketersediaan mobil.",
              label: "Buka data mobil",
              nav: "cars",
            },
            {
              title: "Data Pelanggan",
              desc: "Lihat dan perbarui data pelanggan serta informasi peminjaman aktif.",
              label: "Buka pelanggan",
              nav: "pelanggan",
            },
            {
              title: "Transaksi",
              desc: "Pantau transaksi dan perbarui status penyewaan yang sedang berjalan.",
              label: "Buka transaksi",
              nav: "transaksi",
            },
          ].map((step) => (
            <article key={step.nav} className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-600 sm:text-sm">{step.desc}</p>
              <button
                type="button"
                onClick={() => onNavigate(step.nav)}
                className="mt-3 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#1e3a5f] transition-colors hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:text-sm"
              >
                {step.label}
                <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <span className="font-bold text-gray-900">Drive<span className="text-amber-400">Rent</span></span>
          <span>© {new Date().getFullYear()} DriveRent Indonesia</span>
        </div>
      </footer>
    </div>
  )
}

export default Hero
