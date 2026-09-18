function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1e3a5f]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
          Tentang
        </span>

        {/* Judul */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tentang{' '}
          <span className="text-[#1e3a5f]">
            Drive<span className="text-amber-400">Rent</span>
          </span>
        </h1>

        {/* Deskripsi */}
        <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
          DriveRent adalah aplikasi sederhana untuk mengelola data mobil rental. Fokus utama kami
          adalah kemudahan CRUD — tambah, lihat, ubah, dan hapus data mobil dengan cepat dan
          transparan.
        </p>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gray-100" />

        {/* Poin singkat */}
        <ul className="space-y-4">
          {[
            'Kelola data mobil dengan mudah',
            'Harga dan status transparan',
            'Antarmuka bersih dan responsif',
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-gray-700 sm:text-base">
              <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Footer note */}
        <p className="mt-12 text-xs text-gray-400">
          © {new Date().getFullYear()} DriveRent Indonesia
        </p>
      </section>
    </div>
  )
}

export default About