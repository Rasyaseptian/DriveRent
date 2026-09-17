import { useEffect, useState } from "react"
import Cars from "../components/Cars"

function AdminPage({ onBack }) {
  const [view, setView] = useState("mobil")
  const [customers, setCustomers] = useState([])

  const loadCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pelanggan")
      if (!response.ok) throw new Error("Gagal mengambil data pelanggan")
      setCustomers(await response.json())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (view === "pelanggan") {
      loadCustomers()
    }
  }, [view])

  return (
    <div className="app-shell admin-shell">
      <div className="topbar">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h2>Kelola DriveRent</h2>
        </div>
        <button className="secondary-btn" onClick={onBack}>Kembali</button>
      </div>

      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="button-group" style={{ flexDirection: "row" }}>
          <button className={view === "mobil" ? "primary-btn admin-btn" : "secondary-btn"} onClick={() => setView("mobil")}>
            Mobil
          </button>
          <button className={view === "pelanggan" ? "primary-btn customer-btn" : "secondary-btn"} onClick={() => setView("pelanggan")}>
            Pelanggan
          </button>
        </div>
      </div>

      {view === "mobil" ? (
        <Cars />
      ) : (
        <div className="panel form-panel">
          <div>
            <h3>Daftar Pelanggan</h3>
            {customers.length === 0 ? (
              <p className="empty-text">Belum ada pelanggan</p>
            ) : (
              customers.map((customer) => (
                <div key={customer.id} className="customer-card">
                  <p><strong>{customer.nama}</strong></p>
                  <p>{customer.no_hp}</p>
                  <p>{customer.alamat || "-"}</p>
                  {customer.nama_mobil && (
                    <>
                      <p>Mobil: <strong>{customer.nama_mobil}</strong></p>
                      <p>Lama Sewa: {customer.lama_sewa} hari</p>
                      <p>Tanggal Sewa: {customer.tanggal_sewa?.split("T")[0]}</p>
                      <p>Selesai: {customer.tanggal_selesai?.split("T")[0]}</p>
                    </>
                  )}
                  <span className="status-badge status-badge-success">{customer.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage