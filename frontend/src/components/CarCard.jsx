function CarCard({ nama, harga, kursi, transmisi, status, gambar, onEdit, onDelete }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {gambar ? (
          <img src={gambar} alt={nama} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">Tidak ada gambar</div>
        )}

        <div className="absolute right-3 top-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold capitalize text-gray-700 shadow-sm">
          {status}
        </div>
      </div>

      <div className="p-4">
        <h2 className="truncate text-lg font-bold text-gray-900">
          {nama}
        </h2>

        <p className="mt-1 text-lg font-bold text-blue-600">
          Rp{harga.toLocaleString("id-ID")}
          <span className="text-sm font-normal text-gray-500">
            {" "} / hari
          </span>
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-sm text-gray-600">
          <span>{kursi} Kursi</span>
          <span>{transmisi}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </article>
  )
}

export default CarCard