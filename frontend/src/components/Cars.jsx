import { useEffect, useState } from "react"
import CarCard from "./CarCard"

const apiUrl = "http://localhost:3000"

const JENIS_OPTIONS = ['City Car', 'MPV', 'SUV', 'Sedan', 'Hatchback', 'Minibus', 'Luxury', 'Supercar']

const initialForm = {
  nama: "",
  harga: "",
  kursi: "",
  transmisi: "Manual",
  status: "tersedia",
  jenis: "City Car",
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
    formData.append("jenis", form.jenis)
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
      jenis: car.jenis || "City Car",
      gambar: null,
    })
    setIsFormOpen(true)
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
    "mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/10"

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Kelola Mobil
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {cars.length} mobil terdaftar
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isFormOpen && editingId) resetForm()
              else setIsFormOpen((prev) => !prev)
            }}
            className="rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152a45]"
          >
            {isFormOpen ? "Tutup" : "+ Tambah"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-xl border border-gray-200 bg-gray-50/60 p-5 sm:p-6"
          >
            <h2 className="mb-5 text-base font-bold text-gray-900">
              {editingId ? "Edit Mobil" : "Tambah Mobil Baru"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Nama
                <input
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Harga / Hari
                <input
                  name="harga"
                  type="number"
                  value={form.harga}
                  onChange={handleChange}
                  required
                  min="1"
                  className={inputClass}
                />
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Kursi
                <input
                  name="kursi"
                  type="number"
                  value={form.kursi}
                  onChange={handleChange}
                  required
                  min="1"
                  className={inputClass}
                />
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Jenis
                <select
                  name="jenis"
                  value={form.jenis}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {JENIS_OPTIONS.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </label>

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
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

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
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

              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Gambar
                <input
                  type="file"
                  name="gambar"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1.5 w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#1e3a5f] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#152a45]"
                />
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#152a45]"
              >
                {editingId ? "Simpan" : "Tambah"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        )}

        {/* List */}
        {cars.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-sm text-gray-500">
              Belum ada mobil. Klik "+ Tambah" untuk memulai.
            </p>
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
                jenis={car.jenis}
                onEdit={() => handleEdit(car)}
                onDelete={() => handleDelete(car.id)}
                gambar={car.gambar ? `${apiUrl}/uploads/cars/${car.gambar}` : null}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Cars