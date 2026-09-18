function About() {
  const values = [
    {
      title: 'Terpercaya',
      description:
        'Setiap unit melewati inspeksi menyeluruh sebelum diserahkan. Keamanan dan kenyamanan Anda prioritas utama kami.',
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
      title: 'Transparan',
      description:
        'Harga jelas sejak awal, tanpa biaya tersembunyi. Yang Anda lihat adalah yang Anda bayar.',
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
      title: 'Cepat & Praktis',
      description:
        'Proses sewa digital hanya dalam 3 menit. Tanpa antre, tanpa dokumen ribet, mobil siap di depan rumah.',
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
  ]

  const milestones = [
    { value: '2020', label: 'Didirikan' },
    { value: '100+', label: 'Unit Kendaraan' },
    { value: '12.5K+', label: 'Pelanggan' },
    { value: '25+', label: 'Kota Layanan' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-50">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
            Tentang Kami
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Drive
            <span className="text-amber-400">Rent</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100/80 sm:text-lg">
            Platform penyewaan mobil premium yang mengutamakan kemudahan, transparansi, dan
            kenyamanan perjalanan Anda. Kami percaya sewa mobil seharusnya sesederhana memesan
            taksi.
          </p>
        </div>
      </section>

      {/* ============================ MILESTONES ============================ */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-lg shadow-blue-500/5 sm:grid-cols-4 sm:gap-6 sm:p-8">
            {milestones.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-[#1e3a5f] sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CERITA ============================ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f] shadow-sm">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                Cerita Kami
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Dibuat oleh orang yang{' '}
                <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 bg-clip-text text-transparent">
                  pernah kesulitan
                </span>{' '}
                sewa mobil
              </h2>

              <p className="mt-5 text-base leading-relaxed text-gray-600">
                DriveRent berawal dari frustrasi: antre panjang di konter rental, dokumen
                berlembar-lembar, dan biaya tambahan yang muncul entah dari mana.
              </p>

              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Kami membangun DriveRent untuk mengubah semua itu — sebuah platform di mana Anda
                bisa memesan mobil dalam 3 menit, dengan harga yang jujur, dan mobil yang selalu
                siap pakai.
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-amber-400/15 via-blue-500/10 to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 shadow-xl shadow-blue-500/10">
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80"
                  alt="Perjalanan dengan DriveRent"
                  className="h-72 w-full object-cover sm:h-80 lg:h-96"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ NILAI ============================ */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f] shadow-sm">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              Nilai Kami
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Yang{' '}
              <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 bg-clip-text text-transparent">
                Kami Pegang
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Tiga prinsip yang jadi dasar setiap keputusan dan layanan DriveRent.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100 transition-colors duration-300 group-hover:bg-amber-100">
                  {value.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] px-6 py-12 text-center text-white sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Siap memulai{' '}
                <span className="bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
                  perjalanan
                </span>{' '}
                Anda?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Jelajahi koleksi mobil kami dan temukan yang paling cocok untuk kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About