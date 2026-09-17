function HomePage({ onSelectRole }) {
  return (
    <div className="app-shell home-shell">
      <div className="card home-card">
        <p className="eyebrow">DriveRent</p>
        <h1>Selamat datang</h1>
        <p className="subtitle">Pilih akses untuk masuk ke sistem.</p>

        <div className="button-group">
          <button className="primary-btn admin-btn" onClick={() => onSelectRole("admin")}>
            Masuk sebagai Admin
          </button>
          <button className="primary-btn customer-btn" onClick={() => onSelectRole("pelanggan")}>
            Masuk sebagai Pelanggan
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage