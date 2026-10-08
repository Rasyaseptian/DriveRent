function Hero({ onViewCars, onNavigate }) {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
                Kelola penyewaan mobil dengan mudah — dari data pelanggan, pilih mobil, hingga catat transaksi dalam satu aplikasi.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onViewCars}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-[#1e3a5f] transition-colors hover:bg-amber-300 sm:text-base"
                >
                  Lihat Mobil
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                alt="Mobil premium DriveRent"
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CARA SEWA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Cara Sewa</h2>
        <p className="mt-2 text-sm text-gray-500">Ikuti 3 langkah mudah berikut untuk mulai menyewa</p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            {
              num: "01",
              title: "Daftarkan Pelanggan",
              desc: "Buka menu Pelanggan, tambahkan data nama dan nomor HP pelanggan yang ingin menyewa.",
              nav: "pelanggan",
              cta: "Ke Pelanggan",
            },
            {
              num: "02",
              title: "Pilih Mobil",
              desc: "Buka menu Mobil untuk melihat daftar mobil yang tersedia beserta harga per hari.",
              nav: "cars",
              cta: "Ke Mobil",
            },
            {
              num: "03",
              title: "Buat Penyewaan",
              desc: "Buka menu Penyewaan, pilih pelanggan dan mobil, tentukan tanggal, lalu simpan.",
              nav: "penyewaan",
              cta: "Ke Penyewaan",
            },
          ].map((step) => (
            <div key={step.num} className="rounded-xl border border-gray-100 bg-gray-50/60 p-6">
              <p className="text-3xl font-bold text-amber-400">{step.num}</p>
              <h3 className="mt-3 text-base font-bold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.desc}</p>
              <button
                type="button"
                onClick={() => onNavigate(step.nav)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] hover:text-amber-500 transition-colors"
              >
                {step.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Kenapa DriveRent?</h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { title: "Mudah Digunakan", desc: "Antarmuka sederhana, semua fitur bisa diakses langsung dari navbar." },
              { title: "Harga Transparan", desc: "Total harga dihitung otomatis berdasarkan mobil dan durasi sewa." },
              { title: "Data Terorganisir", desc: "Semua transaksi tersimpan rapi dan bisa dipantau kapan saja." },
            ].map((item) => (
              <div key={item.title}>
                <div className="mb-4 h-1 w-10 rounded-full bg-amber-400" />
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <span className="font-bold text-gray-900">Drive<span className="text-amber-400">Rent</span></span>
          <span>© {new Date().getFullYear()} DriveRent Indonesia</span>
        </div>
      </footer>
    </div>
  )
}

export default Hero
