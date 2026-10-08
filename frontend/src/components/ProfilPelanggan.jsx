function ProfilPelanggan({ user }) {
  const fields = [
    ["Nama", user?.nama || user?.username],
    ["Username", user?.username],
    ["Email", user?.email],
    ["Nomor HP", user?.no_hp],
    ["Alamat", user?.alamat],
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Akun saya</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Profil</h1>
        <div className="mt-7 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-[#1e3a5f] to-[#152a45] p-6 text-white">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-2xl font-black text-[#1e3a5f]">{(user?.nama || user?.username || "P").charAt(0).toUpperCase()}</div>
            <h2 className="mt-4 text-xl font-bold">{user?.nama || user?.username || "Pelanggan"}</h2>
            <p className="mt-1 text-sm text-blue-100/70">Profil akun DriveRent</p>
          </div>
          <dl className="divide-y divide-gray-100 px-6">
            {fields.map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-4"><dt className="text-sm text-gray-500">{label}</dt><dd className="wrap-break-word text-sm font-semibold text-gray-900">{value || "Belum diisi"}</dd></div>)}
          </dl>
          <p className="px-6 pb-6 text-xs leading-relaxed text-gray-400">Untuk memperbarui data profil, silakan hubungi admin DriveRent.</p>
        </div>
      </section>
    </main>
  )
}

export default ProfilPelanggan
