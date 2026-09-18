import { useEffect, useState } from "react"

const apiUrl = "http://localhost:3000"

const initialForm = {
  pelanggan_id: "",
  mobil_id: "",
  tanggal_mulai: "",
  tanggal_selesai: "",
}

function Transaksi() {
  const [transaksi, setTransaksi] = useState([])
  const [pelanggan, setPelanggan] = useState([])
  const [mobilTersedia, setMobilTersedia] = useState([])
  const [form, setForm] = useState(initialForm)
  const [totalHarga, setTotalHarga] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [error, setError] = useState("")

  const loadAll = async () => {
    try {
      const [tRes, pRes, cRes] = await Promise.all([
        fetch(`${apiUrl}/api/transaksi`),
        fetch(`${apiUrl}/api/pelanggan`),
        fetch(`${apiUrl}/api/cars`),
      ])
      setTransaksi(await tRes.json())
      setPelanggan(await pRes.json())
      setMobilTersedia((await cRes.json()).filter((c) => c.status === "tersedia"))
    } catch (err) {
      setError("Gagal memuat data")
    }
  }

  useEffect(() => { loadAll() }, [])

  useEffect(() => {
    if (!form.mobil_id || !form.tanggal_mulai || !form.tanggal_selesai) {
      setTotalHarga(0)
      return
    }
    const mobil = mobilTersedia.find((m) => m.id === Number(form.mobil_id))
    if (!mobil) return
    const mulai = new Date(form.tanggal_mulai)
    const selesai = new Date(form.tanggal_selesai)
    const hari = Math.max(1, Math.ceil((selesai - mulai) / (1000 * 60 * 60 * 24)))
    setTotalHarga(mobil.harga * hari)
  }, [form.mobil_id, form.tanggal_mulai, form.tanggal_selesai, mobilTersedia])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setTotalHarga(0)
    setIsFormOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch(`${apiUrl}/api/transaksi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, total_harga: totalHarga })
      })
      if (!res.ok) throw new Error("Gagal menyimpan transaksi")
      await loadAll()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSelesai = async (id) => {
    if (!window.confirm("Selesaikan transaksi ini?")) return
    try {
      const res = await fetch(`${apiUrl}/api/transaksi/${id}`, { method: "PUT" })
      if (!res.ok) throw new Error("Gagal mengupdate transaksi")
      await loadAll()
    } catch (err) {
      setError(err.message)
    }
  }

  const formatTanggal = (tgl) => {
    if (!tgl) return "-"
    return new Date(tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }

  const inputClass = "mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Transaksi</h1>
            <p className="mt-1 text-sm text-gray-500">{transaksi.length} transaksi tercatat</p>
          </div>
          <button
            onClick={() => setIsFormOpen((p) => !p)}
            className="rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152a45]"
          >
            {isFormOpen ? "Tutup" : "+ Tambah"}
          </button>
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {isFormOpen && (
          <form onSubmit={handleSubmit} className="mb-10 rounded-xl border border-gray-200 bg-gray-50/60 p-5 sm:p-6">
            <h2 className="mb-5 text-base font-bold text-gray-900">Tambah Transaksi</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Pelanggan
                <select name="pelanggan_id" value={form.pelanggan_id} onChange={handleChange} required className={inputClass}>
                  <option value="">Pilih pelanggan</option>
                  {pelanggan.map((p) => (
                    <option key={p.id} value={p.id}>{p.nama}</option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Mobil (Tersedia)
                <select name="mobil_id" value={form.mobil_id} onChange={handleChange} required className={inputClass}>
                  <option value="">Pilih mobil</option>
                  {mobilTersedia.map((m) => (
                    <option key={m.id} value={m.id}>{m.nama} — Rp{m.harga.toLocaleString("id-ID")}/hari</option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Tanggal Mulai
                <input type="date" name="tanggal_mulai" value={form.tanggal_mulai} onChange={handleChange} required className={inputClass} />
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Tanggal Selesai
                <input type="date" name="tanggal_selesai" value={form.tanggal_selesai} onChange={handleChange} required className={inputClass} />
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Total Harga
                <input value={totalHarga > 0 ? `Rp${totalHarga.toLocaleString("id-ID")}` : "-"} readOnly className={`${inputClass} bg-gray-100 text-gray-500`} />
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="submit" className="rounded-lg bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152a45]">
                Simpan
              </button>
              <button type="button" onClick={resetForm} className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Batal
              </button>
            </div>
          </form>
        )}

        {transaksi.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-sm text-gray-500">Belum ada transaksi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Pelanggan</th>
                  <th className="px-4 py-3 text-left">Mobil</th>
                  <th className="px-4 py-3 text-left">Mulai</th>
                  <th className="px-4 py-3 text-left">Selesai</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transaksi.map((t) => (
                  <tr key={t.id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">#{t.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{t.nama_pelanggan}</td>
                    <td className="px-4 py-3 text-gray-700">{t.nama_mobil}</td>
                    <td className="px-4 py-3 text-gray-500">{formatTanggal(t.tanggal_mulai)}</td>
                    <td className="px-4 py-3 text-gray-500">{formatTanggal(t.tanggal_selesai)}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">Rp{Number(t.total_harga).toLocaleString("id-ID")}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.status === "Aktif" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {t.status === "Aktif" && (
                        <button
                          onClick={() => handleSelesai(t.id)}
                          className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                        >
                          Selesaikan
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default Transaksi
