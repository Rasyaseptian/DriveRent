function Hero({ onViewCars }) {
  const stats = [
    { value: '480+', label: 'Unit Mobil' },
    { value: '12.5K+', label: 'Pelanggan Puas' },
    { value: '25+', label: 'Kota Besar' },
    { value: '4.9/5', label: 'Rating Pengguna' },
  ]

  const features = [
    {
      title: 'Asuransi All-Risk',
      description:
        'Setiap perjalanan dilindungi asuransi menyeluruh. Anda fokus ke tujuan, kami urus sisanya.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Pesan dalam 3 Menit',
      description:
        'Tanpa dokumen berlembar-lembar. Verifikasi digital, konfirmasi instan, mobil siap di depan rumah.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      title: 'Harga Jujur',
      description:
        'Harga yang Anda lihat adalah yang Anda bayar. BBM, tol, dan pajak transparan sejak awal.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: 'Antar-Jemput Gratis',
      description:
        'Gratis pengantaran & penjemputan mobil di 25 kota besar. Termasuk bandara dan stasiun.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Pilih Mobil & Tanggal',
      description:
        'Tentukan lokasi penjemputan, tanggal, dan tipe mobil yang Anda inginkan dari koleksi kami.',
    },
    {
      number: '02',
      title: 'Verifikasi Identitas',
      description:
        'Unggah KTP & SIM, lalu bayar dengan transfer, e-wallet, atau kartu kredit. Selesai dalam 3 menit.',
    },
    {
      number: '03',
      title: 'Kunci Diserahkan',
      description:
        'Mobil diantar ke lokasi Anda tepat waktu. Periksa kondisi, tanda tangan digital, dan jalan!',
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        {/* Dekorasi background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Kiri: teks */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 backdrop-blur">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                Rental Mobil #1 di Indonesia
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Rental Mobil Mudah,
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  {' '}
                  Perjalanan Nyaman
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/80 sm:text-lg lg:mx-0">
                Sewa mobil premium dengan proses 3 menit, harga transparan tanpa biaya
                tersembunyi, dan gratis antar-jemput di 25 kota besar.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={onViewCars}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-[#1e3a5f] shadow-lg shadow-amber-400/30 ring-1 ring-inset ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f] active:translate-y-0 sm:w-auto sm:text-base"
                >
                  <span>Lihat Mobil</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:w-auto sm:text-base"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  Hubungi Kami
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-blue-100/70 sm:text-sm lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Mobil terawat
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Harga transparan
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Layanan 24/7
                </span>
              </div>
            </div>

            {/* Kanan: gambar mobil */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-blue-500/10 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                  alt="Mobil premium DriveRent"
                  className="h-64 w-full object-cover sm:h-80 lg:h-96"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1a2e]/70 via-transparent to-transparent"
                />

                {/* Card mengambang */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                      Mulai dari
                    </p>
                    <p className="text-lg font-bold text-white">
                      Rp 320K <span className="text-xs font-medium text-blue-100/70">/hari</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Tersedia
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ============================ STATS BAR ============================ */}
          <div className="relative mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:mt-16 sm:grid-cols-4 sm:gap-6 sm:p-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-amber-300 sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-blue-100/70 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ KEUNGGULAN ============================ */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f]">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              Kenapa DriveRent
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Standar Baru{' '}
              <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 bg-clip-text text-transparent">
                Rental Mobil
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Kami menghilangkan semua kerumitan sewa mobil tradisional — tanpa antre, tanpa
              deposit ribet, tanpa kejutan di akhir.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100 transition-colors duration-300 group-hover:bg-amber-100">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CARA SEWA ============================ */}
      <section className="bg-gradient-to-b from-blue-50/50 to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f] shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              Sangat Mudah
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tiga Langkah,{' '}
              <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 bg-clip-text text-transparent">
                Mobil Siap
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Tidak perlu datang ke kantor. Semua bisa diselesaikan dari ponsel Anda.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <span className="inline-block bg-gradient-to-b from-[#1e3a5f] to-blue-400/40 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent">
                  {step.number}
                </span>
                <h3 className="mb-2 mt-5 text-lg font-bold tracking-tight text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>

                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1e3a5f] shadow-md ring-1 ring-gray-100 md:flex"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CTA BANNER ============================ */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                Penawaran Terbatas
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Dapatkan{' '}
                <span className="bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
                  Diskon 20%
                </span>{' '}
                untuk Sewa Pertama Anda
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Gunakan kode{' '}
                <span className="font-bold text-amber-300">DRIVE20</span> saat checkout. Berlaku
                untuk semua tipe mobil hingga akhir bulan ini.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={onViewCars}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold text-[#1e3a5f] shadow-lg shadow-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a5f] active:translate-y-0 sm:text-base"
                >
                  <span>Klaim Diskon Sekarang</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-gray-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e3a5f] to-blue-600 text-white shadow-md shadow-blue-600/25">
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
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Drive
              <span className="text-amber-500">Rent</span>
            </span>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DriveRent Indonesia. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-5 text-sm font-medium text-gray-500">
            <a href="#" className="transition-colors hover:text-[#1e3a5f]">
              Privasi
            </a>
            <a href="#" className="transition-colors hover:text-[#1e3a5f]">
              Syarat
            </a>
            <a href="#" className="transition-colors hover:text-[#1e3a5f]">
              Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Hero