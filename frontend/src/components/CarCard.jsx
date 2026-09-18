function CarCard({ nama, harga, kursi, transmisi, status, jenis, gambar, onEdit, onDelete }) {
  const statusStyle = status === "tersedia"
    ? "bg-emerald-50 text-emerald-700"
    : "bg-red-50 text-red-600"

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {gambar ? (
          <img src={gambar} alt={nama} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">Tidak ada gambar</div>
        )}
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle}`}>
          {status}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h2 className="truncate text-base font-bold text-gray-900">{nama}</h2>
          {jenis && (
            <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
              {jenis}
            </span>
          )}
        </div>

        <p className="text-base font-bold text-[#1e3a5f]">
          Rp{harga.toLocaleString("id-ID")}
          <span className="text-sm font-normal text-gray-400"> / hari</span>
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span>{kursi} Kursi</span>
          <span>·</span>
          <span>{transmisi}</span>
        </div>

        <div className="mt-3 flex gap-2">
          <button onClick={onEdit} className="flex-1 rounded-lg bg-[#1e3a5f] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#152a45]">
            Edit
          </button>
          <button onClick={onDelete} className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100">
            Hapus
          </button>
        </div>
      </div>
    </article>
  )
}

export default CarCard