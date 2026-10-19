import { useEffect, useState } from "react"
import { apiFetch } from "../lib/api"

async function readApiResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    throw new Error(`Server API mengembalikan respons yang tidak valid (HTTP ${response.status}). Pastikan backend DriveRent sudah dijalankan ulang.`)
  }

  const data = await response.json().catch(() => null)
  if (!data) throw new Error(fallbackMessage)
  if (!response.ok) throw new Error(data.message || fallbackMessage)
  return data
}

function Transaksi() {
  const [transaksi, setTransaksi] = useState([])
  const [pengajuan, setPengajuan] = useState([])
  const [error, setError] = useState("")
  const [processingId, setProcessingId] = useState(null)

  const load = async () => {
    setError("")
    try {
      const [transactionResponse, requestResponse] = await Promise.all([
        apiFetch("/api/transaksi"),
        apiFetch("/api/pengajuan"),
      ])
      const [transactionData, requestData] = await Promise.all([
        readApiResponse(transactionResponse, "Gagal memuat data transaksi"),
        readApiResponse(requestResponse, "Gagal memuat pengajuan"),
      ])
      setTransaksi(transactionData)
      setPengajuan(requestData)
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

  const handleKeputusan = async (id, keputusan) => {
    const label = keputusan === "setujui" ? "Setujui" : "Tolak"
    if (!window.confirm(`${label} pengajuan ini?`)) return
    setError("")
    setProcessingId(id)
    try {
      const res = await apiFetch(`/api/pengajuan/${id}/keputusan`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keputusan }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || `Gagal ${label.toLowerCase()} pengajuan`)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setProcessingId(null)
    }
  }

  const formatTanggal = (tgl) => {
    if (!tgl) return "-"
    return new Date(tgl).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }
  const formatRupiah = (value) => `Rp${Number(value || 0).toLocaleString("id-ID")}`

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Transaksi</h1>
          <p className="mt-1 text-sm text-gray-500">{transaksi.length} transaksi tercatat</p>
        </div>

        {error && (
          <div role="alert" className="mb-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
            <p>{error}</p>
            <button type="button" onClick={load} className="w-fit shrink-0 font-semibold underline underline-offset-2">Coba lagi</button>
          </div>
        )}

        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">Pengajuan menunggu konfirmasi</h2>
            <p className="mt-1 text-sm text-gray-500">{pengajuan.length} pengajuan perlu ditinjau</p>
          </div>
          {pengajuan.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white py-8 text-center">
              <p className="text-sm text-gray-500">Tidak ada pengajuan yang menunggu konfirmasi.</p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {pengajuan.map((request) => (
                <article key={request.id} className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Pengajuan #{request.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-gray-900">{request.nama_mobil}</h3>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Menunggu Konfirmasi</span>
                  </div>

                  <dl className="mt-4 grid gap-x-4 gap-y-3 border-t border-gray-100 pt-4 text-sm sm:grid-cols-2">
                    <div><dt className="text-xs font-medium text-gray-500">Pelanggan</dt><dd className="mt-0.5 font-semibold text-gray-900">{request.nama_pelanggan}</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">No. HP</dt><dd className="mt-0.5 font-semibold text-gray-900">{request.no_hp_pelanggan || "-"}</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">NIK</dt><dd className="mt-0.5 font-semibold tracking-wide text-gray-900">{request.nik_ktp || "-"}</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">Alamat</dt><dd className="mt-0.5 font-semibold text-gray-900">{request.alamat_pelanggan || "-"}</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">Tanggal sewa</dt><dd className="mt-0.5 font-semibold text-gray-900">{formatTanggal(request.tanggal_mulai)}</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">Tanggal pengembalian</dt><dd className="mt-0.5 font-semibold text-gray-900">{formatTanggal(request.tanggal_selesai)}</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">Durasi</dt><dd className="mt-0.5 font-semibold text-gray-900">{request.durasi_hari} hari</dd></div>
                    <div><dt className="text-xs font-medium text-gray-500">Harga per hari</dt><dd className="mt-0.5 font-semibold text-gray-900">{formatRupiah(request.harga_per_hari)}</dd></div>
                    <div className="sm:col-span-2"><dt className="text-xs font-medium text-gray-500">Total biaya</dt><dd className="mt-0.5 text-base font-bold text-[#1e3a5f]">{formatRupiah(request.total_harga)}</dd></div>
                  </dl>

                  <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      disabled={processingId === request.id}
                      onClick={() => handleKeputusan(request.id, "tolak")}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                    >
                      Tolak
                    </button>
                    <button
                      type="button"
                      disabled={processingId === request.id}
                      onClick={() => handleKeputusan(request.id, "setujui")}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-wait disabled:opacity-60"
                    >
                      {processingId === request.id ? "Memproses…" : "Setujui pengajuan"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mb-4">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">Transaksi disetujui</h2>
          <p className="mt-1 text-sm text-gray-500">{transaksi.length} transaksi tercatat</p>
        </div>
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
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.status === "Aktif" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
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
