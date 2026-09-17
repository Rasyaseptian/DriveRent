import { useEffect, useState } from "react"

const initialRentalForm = {
  nama: "",
  no_hp: "",
  alamat: "",
  tanggal_sewa: "",
  lama_sewa: ""
}

function CustomerPage({ onBack }) {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [rentalForm, setRentalForm] = useState(initialRentalForm)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cars")
        if (!response.ok) throw new Error("Gagal mengambil data mobil")
        setCars(await response.json())
      } catch (error) {
        console.error(error)
      }
    }

    loadCars()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setRentalForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const tanggal_selesai = new Date(rentalForm.tanggal_sewa)
    tanggal_selesai.setDate(tanggal_selesai.getDate() + parseInt(rentalForm.lama_sewa))
    const tanggal_selesai_str = tanggal_selesai.toISOString().split("T")[0]

    try {
      const customerResponse = await fetch("http://localhost:3000/api/pelanggan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: rentalForm.nama,
          no_hp: rentalForm.no_hp,
          alamat: rentalForm.alamat,
          status: "aktif",
          car_id: selectedCar.id,
          tanggal_sewa: rentalForm.tanggal_sewa,
          lama_sewa: parseInt(rentalForm.lama_sewa),
          tanggal_selesai: tanggal_selesai_str
        })
      })

      if (!customerResponse.ok) {
        throw new Error("Gagal menambah pelanggan")
      }

      setMessage(
        `Pemesanan untuk ${selectedCar.nama} berhasil dibuat untuk ${rentalForm.nama}.`
      )

      setRentalForm(initialRentalForm)
      setSelectedCar(null)
    } catch (error) {
      console.error(error)
      setMessage("Gagal membuat pemesanan. Coba lagi.")
    }
  }

  if (selectedCar) {
    return (
      <div className="app-shell customer-shell">
        <div className="topbar">
          <div>
            <p className="eyebrow">Customer Area</p>
            <h2>Form Penyewaan</h2>
          </div>
          <button className="secondary-btn" onClick={() => setSelectedCar(null)}>Kembali</button>
        </div>

        <div className="panel form-panel">
          <div className="customer-card">
            <p><strong>Mobil dipilih:</strong> {selectedCar.nama}</p>
            <p>Harga: Rp {selectedCar.harga}</p>
            <p>Transmisi: {selectedCar.transmisi}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label>Nama</label>
              <input name="nama" value={rentalForm.nama} onChange={handleChange} required />
            </div>

            <div className="field-group">
              <label>No HP</label>
              <input name="no_hp" value={rentalForm.no_hp} onChange={handleChange} required />
            </div>

            <div className="field-group">
              <label>Alamat</label>
              <textarea name="alamat" value={rentalForm.alamat} onChange={handleChange} required />
            </div>

            <div className="field-group">
              <label>Tanggal Sewa</label>
              <input type="date" name="tanggal_sewa" value={rentalForm.tanggal_sewa} onChange={handleChange} required />
            </div>

            <div className="field-group">
              <label>Lama Sewa (hari)</label>
              <input type="number" name="lama_sewa" min="1" value={rentalForm.lama_sewa} onChange={handleChange} required />
            </div>

            <button type="submit" className="primary-btn customer-btn">Submit Penyewaan</button>
          </form>

          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell customer-shell">
      <div className="topbar">
        <div>
          <p className="eyebrow">Customer Area</p>
          <h2>Mobil Tersedia</h2>
        </div>
        <button className="secondary-btn" onClick={onBack}>Kembali</button>
      </div>

      <div className="panel list-panel">
        {cars.length === 0 ? (
          <p className="empty-text">Belum ada mobil</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="customer-card">
              <p><strong>{car.nama}</strong></p>
              <p>Harga: Rp {car.harga}</p>
              <p>Kursi: {car.kursi}</p>
              <p>Transmisi: {car.transmisi}</p>
              <span className={`status-badge ${car.status === "disewa" ? "status-badge-danger" : "status-badge-success"}`}>
                {car.status}
              </span>
              <div style={{ marginTop: 12 }}>
                <button
                  className="primary-btn customer-btn"
                  onClick={() => setSelectedCar(car)}
                  disabled={car.status === "disewa"}
                  style={{ opacity: car.status === "disewa" ? 0.5 : 1, cursor: car.status === "disewa" ? "not-allowed" : "pointer" }}
                >
                  {car.status === "disewa" ? "Tidak Tersedia" : "Pilih Mobil"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CustomerPage