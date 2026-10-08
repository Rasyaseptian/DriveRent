import { useEffect, useState } from "react"
import { apiFetch } from "../lib/api"

const emptyForm = { mobil_id: "", tanggal_mulai: "", tanggal_selesai: "", nik_ktp: "" }

function PeminjamanPelanggan() {
  const [cars, setCars] = useState([])
  const [rentals, setRentals] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [carsResponse, rentalsResponse] = await Promise.all([
        apiFetch("/api/cars"),
        apiFetch("/api/me/transaksi"),
      ])
      const [carData, rentalData] = await Promise.all([carsResponse.json(), rentalsResponse.json()])
      if (!carsResponse.ok) throw new Error(carData.message || "Gagal memuat mobil")
      if (!rentalsResponse.ok) throw new Error(rentalData.message || "Gagal memuat peminjaman")
      setCars(carData.filter((car) => car.status === "tersedia"))
      setRentals(rentalData)
    } catch (loadError) {
      setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- load data after mount
  useEffect(() => { load() }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    try {
      const response = await apiFetch("/api/me/transaksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || "Peminjaman gagal disimpan")
      setForm(emptyForm)
      setSuccess("Peminjaman berhasil diajukan.")
      await load()
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  const inputClass = "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"
  const dateFormat = (value) => value ? new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Akun saya</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Peminjaman</h1>
          <p className="mt-2 text-sm text-gray-500">Ajukan sewa mobil dan lihat riwayatmu.</p>
        </div>
        {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {success && <p role="status" className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>}

        <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-gray-900">Ajukan peminjaman</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Mobil tersedia
              <select required value={form.mobil_id} onChange={(event) => setForm({ ...form, mobil_id: event.target.value })} className={inputClass}>
                <option value="">Pilih mobil</option>
                {cars.map((car) => <option key={car.id} value={car.id}>{car.nama} — Rp{Number(car.harga).toLocaleString("id-ID")}/hari</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tanggal mulai
              <input required type="date" value={form.tanggal_mulai} onChange={(event) => setForm({ ...form, tanggal_mulai: event.target.value })} className={inputClass} />
            </label>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tanggal selesai
              <input required type="date" min={form.tanggal_mulai || undefined} value={form.tanggal_selesai} onChange={(event) => setForm({ ...form, tanggal_selesai: event.target.value })} className={inputClass} />
            </label>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:col-span-2 lg:col-span-3">NIK KTP untuk data jaminan
              <input
                required
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={16}
                minLength={16}
                pattern="[0-9]{16}"
                title="Masukkan tepat 16 digit angka"
                value={form.nik_ktp}
                onChange={(event) => setForm({ ...form, nik_ktp: event.target.value.replace(/\D/g, "").slice(0, 16) })}
                placeholder="Masukkan 16 digit NIK"
                className={inputClass}
              />
              <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-gray-400">NIK disimpan sebagai snapshot pada data peminjaman ini.</span>
            </label>
          </div>
          <button disabled={loading || cars.length === 0} className="mt-5 rounded-xl bg-[#1e3a5f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#152a45] disabled:cursor-not-allowed disabled:opacity-50">Ajukan peminjaman</button>
          {cars.length === 0 && !loading && <p className="mt-3 text-sm text-gray-500">Belum ada mobil tersedia saat ini.</p>}
        </form>

        <div className="mb-4 flex items-end justify-between">
          <div><h2 className="text-xl font-bold text-gray-900">Riwayat saya</h2><p className="mt-1 text-sm text-gray-500">{rentals.length} peminjaman</p></div>
          <button onClick={load} className="text-sm font-semibold text-[#1e3a5f] hover:text-amber-600">Muat ulang</button>
        </div>
        {loading ? <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">Memuat peminjaman…</p> : rentals.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">Belum ada riwayat peminjaman.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">{rentals.map((rental) => (
            <article key={rental.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-gray-900">{rental.nama_mobil}</h3><p className="mt-1 text-sm text-gray-500">{dateFormat(rental.tanggal_mulai)} — {dateFormat(rental.tanggal_selesai)}</p></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${rental.status === "Aktif" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"}`}>{rental.status}</span></div>
              <p className="mt-4 border-t border-gray-100 pt-4 text-sm font-semibold text-[#1e3a5f]">Total Rp{Number(rental.total_harga).toLocaleString("id-ID")}</p>
            </article>
          ))}</div>
        )}
      </section>
    </main>
  )
}

export default PeminjamanPelanggan
