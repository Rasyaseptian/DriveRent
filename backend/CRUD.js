import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"
import multer from "multer"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
  destination: "uploads/cars",
  filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({ storage })

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rasyamysql",
  database: "DriveRent"
})

const JENIS_VALID = ['City Car', 'MPV', 'SUV', 'Sedan', 'Hatchback', 'Minibus', 'Luxury', 'Supercar']

app.get("/api/cars", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM cars")
  res.json(rows)
})

app.post("/api/cars", upload.single("gambar"), async (req, res) => {
  const { nama, harga, kursi, transmisi, status, jenis } = req.body
  const gambar = req.file ? req.file.originalname : null

  if (jenis && !JENIS_VALID.includes(jenis))
    return res.status(400).json({ message: "Jenis mobil tidak valid" })

  try {
    const [result] = await db.query(
      "INSERT INTO cars (nama, harga, kursi, transmisi, status, gambar, jenis) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nama, harga, kursi, transmisi, status, gambar, jenis || null]
    )
    const [rows] = await db.query("SELECT * FROM cars WHERE id = ?", [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data mobil tidak valid" })
  }
})

app.put("/api/cars/:id", upload.single("gambar"), async (req, res) => {
  const { nama, harga, kursi, transmisi, status, jenis } = req.body

  if (jenis && !JENIS_VALID.includes(jenis))
    return res.status(400).json({ message: "Jenis mobil tidak valid" })

  try {
    const [existing] = await db.query("SELECT gambar FROM cars WHERE id = ?", [req.params.id])
    if (existing.length === 0) return res.status(404).json({ message: "Mobil tidak ditemukan" })

    const gambar = req.file ? req.file.originalname : existing[0].gambar

    await db.query(
      "UPDATE cars SET nama = ?, harga = ?, kursi = ?, transmisi = ?, status = ?, gambar = ?, jenis = ? WHERE id = ?",
      [nama, harga, kursi, transmisi, status, gambar, jenis || null, req.params.id]
    )
    const [rows] = await db.query("SELECT * FROM cars WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data mobil tidak valid" })
  }
})

app.delete("/api/cars/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM cars WHERE id = ?", [req.params.id])
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Mobil tidak ditemukan" })
    res.json({ message: "Mobil berhasil dihapus" })
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus mobil" })
  }
})

app.get("/api/pelanggan", async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.*, t.id AS transaksi_id, c.nama AS nama_mobil,
           t.tanggal_mulai, t.tanggal_selesai, t.status AS status_transaksi
    FROM pelanggan p
    LEFT JOIN transaksi t ON t.pelanggan_id = p.id AND t.status = 'Aktif'
    LEFT JOIN cars c ON c.id = t.mobil_id
  `)
  res.json(rows)
})

app.post("/api/pelanggan", async (req, res) => {
  const { nama, no_hp } = req.body
  try {
    const [result] = await db.query(
      "INSERT INTO pelanggan (nama, no_hp) VALUES (?, ?)",
      [nama, no_hp]
    )
    const [rows] = await db.query("SELECT * FROM pelanggan WHERE id = ?", [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data pelanggan tidak valid" })
  }
})

app.put("/api/pelanggan/:id", async (req, res) => {
  const { nama, no_hp } = req.body
  try {
    const [result] = await db.query(
      "UPDATE pelanggan SET nama = ?, no_hp = ? WHERE id = ?",
      [nama, no_hp, req.params.id]
    )
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" })
    const [rows] = await db.query("SELECT * FROM pelanggan WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data pelanggan tidak valid" })
  }
})

app.delete("/api/pelanggan/:id", async (req, res) => {
  try {
    const [aktif] = await db.query(
      "SELECT id FROM transaksi WHERE pelanggan_id = ? AND status = 'Aktif'",
      [req.params.id]
    )
    if (aktif.length > 0)
      return res.status(400).json({ message: "Pelanggan masih memiliki transaksi aktif" })

    const [result] = await db.query("DELETE FROM pelanggan WHERE id = ?", [req.params.id])
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" })
    res.json({ message: "Pelanggan berhasil dihapus" })
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pelanggan" })
  }
})

app.get("/api/transaksi", async (req, res) => {
  const [rows] = await db.query(`
    SELECT t.*, p.nama AS nama_pelanggan, c.nama AS nama_mobil
    FROM transaksi t
    JOIN pelanggan p ON p.id = t.pelanggan_id
    JOIN cars c ON c.id = t.mobil_id
    ORDER BY t.id DESC
  `)
  res.json(rows)
})

app.post("/api/transaksi", async (req, res) => {
  const { pelanggan_id, mobil_id, tanggal_mulai, tanggal_selesai, total_harga } = req.body
  try {
    const [result] = await db.query(
      "INSERT INTO transaksi (pelanggan_id, mobil_id, tanggal_mulai, tanggal_selesai, total_harga, status) VALUES (?, ?, ?, ?, ?, 'Aktif')",
      [pelanggan_id, mobil_id, tanggal_mulai, tanggal_selesai, total_harga]
    )
    await db.query("UPDATE cars SET status = 'disewa' WHERE id = ?", [mobil_id])
    const [rows] = await db.query(`
      SELECT t.*, p.nama AS nama_pelanggan, c.nama AS nama_mobil
      FROM transaksi t
      JOIN pelanggan p ON p.id = t.pelanggan_id
      JOIN cars c ON c.id = t.mobil_id
      WHERE t.id = ?
    `, [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data transaksi tidak valid" })
  }
})

app.put("/api/transaksi/:id", async (req, res) => {
  try {
    const [existing] = await db.query("SELECT * FROM transaksi WHERE id = ?", [req.params.id])
    if (existing.length === 0)
      return res.status(404).json({ message: "Transaksi tidak ditemukan" })

    await db.query("UPDATE transaksi SET status = 'Selesai' WHERE id = ?", [req.params.id])
    await db.query("UPDATE cars SET status = 'tersedia' WHERE id = ?", [existing[0].mobil_id])

    const [rows] = await db.query(`
      SELECT t.*, p.nama AS nama_pelanggan, c.nama AS nama_mobil
      FROM transaksi t
      JOIN pelanggan p ON p.id = t.pelanggan_id
      JOIN cars c ON c.id = t.mobil_id
      WHERE t.id = ?
    `, [req.params.id])
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate transaksi" })
  }
})

app.listen(3000, () => {
  console.log("Backend berjalan di http://localhost:3000")
})
