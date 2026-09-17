function Hero({ onViewCars }) {
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/yourusername',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/yourpage',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V7.5c0-.9.3-1.5 1.7-1.5H17V3.1c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.4v8h3.1Z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/6281234567890',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M12.04 2A9.95 9.95 0 0 0 4 17.05L2.5 21.5l4.62-1.47A9.96 9.96 0 1 0 12.04 2Zm5.75 13.72c-.24.69-1.4 1.28-1.92 1.35-.49.07-1.11.07-3.58-.79-3.04-1.08-4.99-3.9-5.14-4.09-.15-.19-1.23-1.64-1.23-3.12 0-1.48.77-2.21 1.04-2.51.27-.3.58-.37.77-.37h.56c.18 0 .42.01.65.5.27.57.9 1.97.98 2.12.08.15.13.33.02.54-.12.21-.18.34-.36.54-.18.19-.38.43-.54.58-.18.18-.37.38-.16.72.21.35.95 1.56 2.05 2.52 1.41 1.26 2.6 1.65 2.96 1.83.36.18.56.15.77-.09.2-.24.86-1 1.1-1.35.24-.35.48-.29.81-.17.33.12 2.1 1 2.46 1.18.36.18.6.27.69.42.09.15.09.87-.15 1.56Z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:hello@driverent.com',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
          <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.2-.5 6.8 5.2 6.8-5.2H5.2Zm13.3 2.1-6.35 4.82a1 1 0 0 1-1.3 0L5.5 7.1v11.4h13V7.1Z" />
        </svg>
      ),
    },
  ]

  return (
    <main className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">DriveRent</p>

        <h1 className="mb-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Rental Mobil Mudah, Perjalanan Nyaman
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Temukan mobil yang sesuai untuk kebutuhan perjalananmu.
        </p>

        <button onClick={onViewCars} className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
          Lihat Mobil
        </button>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
        <section id="about" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Tentang</p>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Kenapa pilih DriveRent?</h2>
          <p className="text-gray-600">
            DriveRent hadir untuk membantu kamu menyewa mobil dengan proses yang cepat, harga yang jelas,
            dan kendaraan yang siap dipakai untuk kebutuhan harian, liburan, maupun bisnis.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li>• Mobil terawat dan bersih</li>
            <li>• Harga transparan tanpa biaya tersembunyi</li>
            <li>• Layanan cepat dan ramah</li>
          </ul>
        </section>

        <section id="contact" className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Kontak</p>
          <h2 className="mb-3 text-2xl font-bold">Hubungi kami</h2>
          <p className="text-blue-50">
            Siap membantu kebutuhan sewa mobil Anda dengan cepat dan profesional.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={item.name}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm text-blue-100">
            <p>Email: hello@driverent.com</p>
            <p>WhatsApp: +62 812-3456-7890</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Hero