import { useEffect, useState } from "react"
import { apiFetch } from "../lib/api"

function Transaksi() {
  const [transaksi, setTransaksi] = useState([])
  const [error, setError] = useState("")

  const load = async () => {
    try {
      const res = await apiFetch("/api/transaksi")
      if (!res.ok) throw new Error("Gagal memuat data transaksi")
      setTransaksi(await res.json())
    } catch (err) {
      setError(err.message)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- load transaction data after mount
  useEffect(() => { load() }, [])

  const handleSelesai = async (id) => {
    if (!window.confirm("Selesaikan transaksi ini?")) return
    try {
      const res = await apiFetch(`/api/transaksi/${id}`, { method: "PUT" })
      if (!res.ok) throw new Error("Gagal mengupdate transaksi")
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const formatTanggal = (tgl) => {
    if (!tgl) return "-"
    return new Date(tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Transaksi</h1>
          <p className="mt-1 text-sm text-gray-500">{transaksi.length} transaksi tercatat</p>
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        {transaksi.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
            <p className="text-sm text-gray-500">Belum ada transaksi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-3 py-2.5 text-left">ID</th>
                  <th className="px-3 py-2.5 text-left">Pelanggan</th>
                  <th className="px-3 py-2.5 text-left">Mobil</th>
                  <th className="px-3 py-2.5 text-left">Mulai</th>
                  <th className="px-3 py-2.5 text-left">Selesai</th>
                  <th className="px-3 py-2.5 text-left">Total</th>
                  <th className="px-3 py-2.5 text-left">Status</th>
                  <th className="px-3 py-2.5 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transaksi.map((t) => (
                  <tr key={t.id} className="bg-white hover:bg-gray-50">
                    <td className="px-3 py-2.5 text-gray-400">#{t.id}</td>
                    <td className="px-3 py-2.5 font-medium text-gray-900">{t.nama_pelanggan}</td>
                    <td className="px-3 py-2.5 text-gray-700">{t.nama_mobil}</td>
                    <td className="px-3 py-2.5 text-gray-500">{formatTanggal(t.tanggal_mulai)}</td>
                    <td className="px-3 py-2.5 text-gray-500">{formatTanggal(t.tanggal_selesai)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-gray-900">Rp{Number(t.total_harga).toLocaleString("id-ID")}</td>
                    <td className="px-3 py-2.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.status === "Aktif" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
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
