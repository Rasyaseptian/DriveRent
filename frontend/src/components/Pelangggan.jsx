import { useEffect, useState } from "react"
import { apiFetch } from "../lib/api"

const initialForm = { nama: "", no_hp: "", alamat: "" }

function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [error, setError] = useState("")

  const load = async () => {
    try {
      const res = await apiFetch("/api/pelanggan")
      if (!res.ok) throw new Error("Gagal mengambil data pelanggan")
      setPelanggan(await res.json())
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => { load() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setEditingId(null)
    setIsFormOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/pelanggan/${editingId}` : "/api/pelanggan"
    try {
      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error("Gagal menyimpan data pelanggan")
      await load()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setForm({ nama: p.nama, no_hp: p.no_hp, alamat: p.alamat || "" })
    setIsFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus pelanggan ini?")) return
    try {
      const res = await apiFetch(`/api/pelanggan/${id}`, { method: "DELETE" })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || "Gagal menghapus pelanggan")
      }
      setPelanggan((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const inputClass = "mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"

  const formatTanggal = (tgl) => {
    if (!tgl) return "-"
    return new Date(tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Pelanggan</h1>
            <p className="mt-1 text-sm text-gray-500">{pelanggan.length} pelanggan terdaftar</p>
          </div>
          <button
            onClick={() => { if (isFormOpen && editingId) resetForm(); else setIsFormOpen((p) => !p) }}
            className="w-full rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152a45] sm:w-auto"
          >
            {isFormOpen ? "Tutup" : "+ Tambah"}
          </button>
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {isFormOpen && (
          <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              {editingId ? "Edit Pelanggan" : "Tambah Pelanggan"}
            </h2>
            <div className="grid min-w-0 gap-3 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Nama
                <input name="nama" value={form.nama} onChange={handleChange} required className={inputClass} />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                No HP
                <input name="no_hp" value={form.no_hp} onChange={handleChange} required className={inputClass} />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:col-span-2">
                Alamat
                <textarea name="alamat" value={form.alamat} onChange={handleChange} rows={2} className={inputClass} />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="submit" className="rounded-lg bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152a45]">
                {editingId ? "Simpan" : "Tambah"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                  Batal
                </button>
              )}
            </div>
          </form>
        )}

        {pelanggan.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
            <p className="text-sm text-gray-500">Belum ada pelanggan.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pelanggan.map((p) => (
              <div key={p.id} className="min-w-0 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm sm:p-4">
                <div className="mb-2.5 flex items-start justify-between gap-2">
                  <div className="min-w-0 break-words">
                    <p className="font-bold text-gray-900">{p.nama}</p>
                    <p className="text-sm text-gray-500">{p.no_hp}</p>
                    {p.alamat && <p className="text-sm text-gray-400">{p.alamat}</p>}
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${p.status_transaksi === "Aktif" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.status_transaksi === "Aktif" ? "Menyewa" : "Tidak menyewa"}
                  </span>
                </div>

                {p.nama_mobil ? (
                  <div className="rounded-lg bg-blue-50 px-3 py-2.5 text-sm">
                    <p className="font-semibold text-[#1e3a5f]">{p.nama_mobil}</p>
                    <p className="mt-0.5 text-gray-500">{formatTanggal(p.tanggal_mulai)} — {formatTanggal(p.tanggal_selesai)}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">Tidak sedang menyewa mobil</p>
                )}

                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="flex-1 rounded-lg bg-[#1e3a5f] px-3 py-2 text-xs font-semibold text-white hover:bg-[#152a45]">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Pelanggan
