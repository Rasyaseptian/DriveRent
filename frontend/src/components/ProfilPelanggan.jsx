function ProfilPelanggan({ user }) {
  const fields = [
    ["Nama", user?.nama || user?.username],
    ["Username", user?.username],
    ["Email", user?.email],
    ["Nomor HP", user?.no_hp],
    ["Alamat", user?.alamat],
  ]

  return (
    <main className="min-h-[calc(100dvh-3.5rem)] bg-gray-50">
      <section className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Akun saya</p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900">Profil</h1>
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-[#1e3a5f] to-[#152a45] p-4 text-white sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-xl font-black text-[#1e3a5f]">{(user?.nama || user?.username || "P").charAt(0).toUpperCase()}</div>
            <h2 className="mt-3 text-lg font-bold">{user?.nama || user?.username || "Pelanggan"}</h2>
          </div>
          <dl className="divide-y divide-gray-100 px-4 sm:px-5">
            {fields.map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-4"><dt className="text-xs text-gray-500 sm:text-sm">{label}</dt><dd className="wrap-break-word text-sm font-semibold text-gray-900">{value || "Belum diisi"}</dd></div>)}
          </dl>
          <p className="px-4 pb-4 text-xs leading-relaxed text-gray-400 sm:px-5 sm:pb-5">Untuk memperbarui data profil, silakan hubungi admin DriveRent.</p>
        </div>
      </section>
    </main>
  )
}

export default ProfilPelanggan
