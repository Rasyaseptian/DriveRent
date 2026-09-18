import { useEffect, useState } from "react"
import CarCard from "./CarCard"

const apiUrl = "http://localhost:3000"

const initialForm = {
  nama: "",
  harga: "",
  kursi: "",
  transmisi: "Manual",
  status: "tersedia",
  gambar: null,
}

function Cars() {
  const [cars, setCars] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)

  const loadCars = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/cars`)
      if (!response.ok) throw new Error("Gagal mengambil data mobil")
      setCars(await response.json())
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (files) {
      setForm((prev) => ({ ...prev, gambar: files[0] }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(initialForm)
    setIsFormOpen(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    const formData = new FormData()
    formData.append("nama", form.nama)
    formData.append("harga", Number(form.harga))
    formData.append("kursi", Number(form.kursi))
    formData.append("transmisi", form.transmisi)
    formData.append("status", form.status)
    if (form.gambar) formData.append("gambar", form.gambar)

    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `${apiUrl}/api/cars/${editingId}` : `${apiUrl}/api/cars`

    try {
      const response = await fetch(url, { method, body: formData })
      if (!response.ok) throw new Error("Gagal menyimpan data mobil")
      await loadCars()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (car) => {
    setEditingId(car.id)
    setForm({
      nama: car.nama,
      harga: String(car.harga),
      kursi: String(car.kursi),
      transmisi: car.transmisi,
      status: car.status,
      gambar: null,
    })
    setIsFormOpen(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus mobil ini?")) return

    try {
      const response = await fetch(`${apiUrl}/api/cars/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Gagal menghapus data mobil")
      setCars((prev) => prev.filter((car) => car.id !== id))
      if (editingId === id) resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15"

  const labelClass = "text-xs font-semibold uppercase tracking-wider text-gray-500"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-50">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* ============================ HEADER ============================ */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1e3a5f] shadow-sm">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                Manajemen Armada
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Kelola{' '}
                <span className="bg-gradient-to-r from-[#1e3a5f] to-blue-600 bg-clip-text text-transparent">
                  Mobil
                </span>
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                Tambah, ubah, dan hapus data mobil DriveRent dengan mudah.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm sm:flex">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-gray-700">
                  Total: <span className="font-bold text-[#1e3a5f]">{cars.length}</span> mobil
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isFormOpen && editingId) resetForm()
                  else setIsFormOpen((prev) => !prev)
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-[#1e3a5f] shadow-md shadow-amber-400/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 active:translate-y-0"
              >
                {isFormOpen ? (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                    <span>Tutup Form</span>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    <span>Tambah Mobil</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ============================ ERROR ============================ */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 shadow-sm">
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </span>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* ============================ FORM ============================ */}
          <div
            className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out ${
              isFormOpen ? "mb-10 max-h-[900px] opacity-100" : "mb-0 max-h-0 opacity-0"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-lg shadow-blue-500/5 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl"
              />

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1e3a5f] to-blue-600 text-white shadow-md shadow-blue-600/25">
                    {editingId ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM23 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                        <path d="M3 17V11l2-5h14l2 5v6" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                      {editingId ? "Edit Mobil" : "Tambah Mobil Baru"}
                    </h2>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      {editingId
                        ? "Perbarui informasi mobil di bawah ini."
                        : "Isi detail mobil yang ingin ditambahkan ke armada."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <label className={labelClass}>
                    Nama Mobil
                    <input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      required
                      placeholder="cth. Toyota Fortuner"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    Harga / Hari (Rp)
                    <input
                      name="harga"
                      type="number"
                      value={form.harga}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="cth. 750000"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    Jumlah Kursi
                    <input
                      name="kursi"
                      type="number"
                      value={form.kursi}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="cth. 7"
                      className={inputClass}
                    />
                  </label>

                  <label className={labelClass}>
                    Transmisi
                    <select
                      name="transmisi"
                      value={form.transmisi}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </label>

                  <label className={labelClass}>
                    Status
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="tersedia">Tersedia</option>
                      <option value="disewa">Disewa</option>
                    </select>
                  </label>

                  <label className={labelClass}>
                    Gambar Mobil
                    <div className="mt-1.5 flex items-center gap-3">
                      <label className="flex-1 cursor-pointer rounded-xl border border-dashed border-gray-300 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-500 transition-colors hover:border-[#1e3a5f]/40 hover:bg-blue-50/40">
                        <input
                          type="file"
                          name="gambar"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span className="flex items-center gap-2">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 flex-none"
                            aria-hidden="true"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <path d="m17 8-5-5-5 5" />
                            <path d="M12 3v12" />
                          </svg>
                          <span className="truncate font-medium">
                            {form.gambar ? form.gambar.name : "Pilih gambar..."}
                          </span>
                        </span>
                      </label>
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1e3a5f] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#1e3a5f]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#152a45] hover:shadow-lg hover:shadow-[#1e3a5f]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 active:translate-y-0"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {editingId ? "Simpan Perubahan" : "Tambah Mobil"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* ============================ CAR LIST ============================ */}
          {cars.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 px-6 py-16 text-center backdrop-blur">
              <span className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 ring-1 ring-inset ring-gray-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-[#1e3a5f]"
                  aria-hidden="true"
                >
                  <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM23 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                  <path d="M3 17V11l2-5h14l2 5v6" />
                </svg>
              </span>
              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                Belum ada mobil
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                Tambahkan mobil pertama Anda dengan menekan tombol "Tambah Mobil" di atas.
              </p>
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-[#1e3a5f] shadow-md shadow-amber-400/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Tambah Mobil Pertama
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  nama={car.nama}
                  harga={car.harga}
                  kursi={car.kursi}
                  transmisi={car.transmisi}
                  status={car.status}
                  onEdit={() => handleEdit(car)}
                  onDelete={() => handleDelete(car.id)}
                  gambar={car.gambar ? `${apiUrl}/uploads/cars/${car.gambar}` : null}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Cars