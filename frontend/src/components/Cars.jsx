import { useEffect, useState } from "react"
import CarCard from "./CarCard"

const apiUrl = "http://localhost:3000"

const initialForm = {
  nama: "",
  harga: "",
  kursi: "",
  transmisi: "Manual",
  status: "tersedia"
}

function Cars() {
  const [cars, setCars] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState("")

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
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(initialForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    const payload = {
      nama: form.nama,
      harga: Number(form.harga),
      kursi: Number(form.kursi),
      transmisi: form.transmisi,
      status: form.status
    }

    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `${apiUrl}/api/cars/${editingId}` : `${apiUrl}/api/cars`

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

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
      status: car.status
    })
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

  return (
    <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Kelola Mobil</h1>
        <p className="mb-8 text-gray-600">Tambah, ubah, dan hapus data mobil.</p>

        <form onSubmit={handleSubmit} className="mb-10 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            {editingId ? "Edit Mobil" : "Tambah Mobil"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-gray-700">
              Nama mobil
              <input name="nama" value={form.nama} onChange={handleChange} required className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5" />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Harga
              <input name="harga" type="number" value={form.harga} onChange={handleChange} required min="1" className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5" />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Kursi
              <input name="kursi" type="number" value={form.kursi} onChange={handleChange} required min="1" className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5" />
            </label>

            <label className="text-sm font-medium text-gray-700">
              Transmisi
              <select name="transmisi" value={form.transmisi} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </label>

            <label className="text-sm font-medium text-gray-700">
              Status
              <select name="status" value={form.status} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5">
                <option value="tersedia">Tersedia</option>
                <option value="disewa">Disewa</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700">
              {editingId ? "Simpan" : "Tambah"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50">
                Batal
              </button>
            )}
          </div>
        </form>

        {error && <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</p>}

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
              gambar={undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cars