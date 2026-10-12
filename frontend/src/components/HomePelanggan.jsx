function HomePelanggan({ user, onNavigate }) {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-white">
      <section className="overflow-hidden bg-linear-to-br from-[#1e3a5f] via-[#152a45] to-[#0b1a2e] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-12">
          <div>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Pelanggan</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Halo, {user?.nama || user?.username || "Pelanggan"}!</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/80 sm:text-base">Cari mobil, ajukan peminjaman, dan pantau status dari satu tempat.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button onClick={() => onNavigate("customer-cars")} className="rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-[#1e3a5f] transition hover:bg-amber-300">Lihat mobil</button>
              <button onClick={() => onNavigate("customer-peminjaman")} className="rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Peminjaman saya</button>
            </div>
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Cara Sewa</h2>
          <p className="mt-1.5 text-sm text-gray-500">Tiga langkah mudah untuk mulai menyewa.</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {[
            {
              num: "01",
              title: "Pilih Mobil",
              desc: "Jelajahi katalog dan temukan mobil yang tersedia sesuai kebutuhan perjalananmu.",
              action: "Lihat mobil",
              page: "customer-cars",
            },
            {
              num: "02",
              title: "Ajukan Peminjaman",
              desc: "Tentukan mobil dan tanggal peminjaman, lalu lengkapi data yang diperlukan.",
              action: "Ajukan sekarang",
              page: "customer-peminjaman",
            },
            {
              num: "03",
              title: "Pantau Status",
              desc: "Periksa status serta riwayat peminjamanmu kapan saja dari menu Peminjaman.",
              action: "Buka peminjaman",
              page: "customer-peminjaman",
            },
          ].map((step) => (
            <article key={step.num} className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-2xl font-bold text-amber-400">{step.num}</p>
              <h3 className="mt-2 text-sm font-bold text-gray-900">{step.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-600 sm:text-sm">{step.desc}</p>
              <button
                type="button"
                onClick={() => onNavigate(step.page)}
                className="mt-3 inline-flex w-fit items-center gap-2 text-xs font-semibold text-[#1e3a5f] transition hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:text-sm"
              >
                {step.action}
                <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Kenapa DriveRent?</h2>
          <p className="mt-1.5 text-sm text-gray-500">Praktis, jelas, dan mudah dipantau.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {[
              { title: "Praktis dari Satu Akun", desc: "Cari mobil, ajukan peminjaman, dan lihat riwayat melalui area pelanggan." },
              { title: "Informasi Jelas", desc: "Lihat jenis mobil, fasilitas, ketersediaan, dan harga sebelum mengajukan." },
              { title: "Status Mudah Dipantau", desc: "Status dan detail peminjaman tersimpan pada halaman Peminjaman saya." },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-3 h-1 w-8 rounded-full bg-amber-400" />
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePelanggan
