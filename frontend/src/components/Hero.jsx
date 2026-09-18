function Hero({ onViewCars }) {
  const stats = [
    { value: '480+', label: 'Unit Mobil' },
    { value: '12.5K+', label: 'Pelanggan' },
    { value: '25+', label: 'Kota' },
    { value: '4.9/5', label: 'Rating' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Teks */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                Rental Mobil
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Rental Mobil Mudah,
                <br />
                <span className="text-amber-400">Perjalanan Nyaman</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-blue-100/80 sm:text-lg">
                Sewa mobil premium dengan proses 3 menit, harga transparan, dan antar-jemput
                gratis di 25 kota.
              </p>

              <button
                type="button"
                onClick={onViewCars}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-[#1e3a5f] transition-colors hover:bg-amber-300 sm:text-base"
              >
                Lihat Mobil
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Gambar */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Mobil premium DriveRent"
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
                loading="lazy"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-amber-400 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-blue-100/70 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ KEUNGGULAN ============================ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Kenapa DriveRent?
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: 'Mobil Terawat',
              desc: 'Setiap unit melewati inspeksi menyeluruh sebelum diserahkan.',
            },
            {
              title: 'Harga Transparan',
              desc: 'Tanpa biaya tersembunyi. Yang Anda lihat adalah yang Anda bayar.',
            },
            {
              title: 'Layanan Cepat',
              desc: 'Proses sewa 3 menit, gratis antar-jemput di 25 kota besar.',
            },
          ].map((item) => (
            <div key={item.title}>
              <div className="mb-4 h-1 w-10 rounded-full bg-amber-400" />
              <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ CARA SEWA ============================ */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Cara Sewa
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { num: '01', title: 'Pilih Mobil', desc: 'Tentukan mobil dan tanggal sewa.' },
              { num: '02', title: 'Verifikasi', desc: 'Unggah KTP & SIM, lalu bayar.' },
              { num: '03', title: 'Jalan', desc: 'Mobil diantar, kunci diserahkan.' },
            ].map((step) => (
              <div key={step.num}>
                <p className="text-3xl font-bold text-amber-400">{step.num}</p>
                <h3 className="mt-3 text-base font-bold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <span className="font-bold text-gray-900">
            Drive<span className="text-amber-400">Rent</span>
          </span>
          <span>© {new Date().getFullYear()} DriveRent Indonesia</span>
        </div>
      </footer>
    </div>
  )
}

export default Hero