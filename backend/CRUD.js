import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rasyamysql",
  database: "DriveRent"
})

app.get("/api/cars", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM cars")
  res.json(rows)
})

app.post("/api/cars", async (req, res) => {
  const { nama, harga, kursi, transmisi, status } = req.body

  try {
    const [result] = await db.query(
      "INSERT INTO cars (nama, harga, kursi, transmisi, status) VALUES (?, ?, ?, ?, ?)",
      [nama, harga, kursi, transmisi, status]
    )

    const [rows] = await db.query("SELECT * FROM cars WHERE id = ?", [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data mobil tidak valid" })
  }
})

app.put("/api/cars/:id", async (req, res) => {
  const { nama, harga, kursi, transmisi, status } = req.body

  try {
    const [result] = await db.query(
      "UPDATE cars SET nama = ?, harga = ?, kursi = ?, transmisi = ?, status = ? WHERE id = ?",
      [nama, harga, kursi, transmisi, status, req.params.id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mobil tidak ditemukan" })
    }

    const [rows] = await db.query("SELECT * FROM cars WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data mobil tidak valid" })
  }
})

app.delete("/api/cars/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM cars WHERE id = ?", [req.params.id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mobil tidak ditemukan" })
    }

    res.json({ message: "Mobil berhasil dihapus" })
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus mobil" })
  }
})

app.get("/api/pelanggan", async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.*, c.nama AS nama_mobil, c.harga AS harga_mobil
    FROM pelanggan p
    LEFT JOIN cars c ON p.car_id = c.id
  `)
  res.json(rows)
})

app.post("/api/pelanggan", async (req, res) => {
  const { nama, no_hp, alamat, status, car_id, tanggal_sewa, lama_sewa, tanggal_selesai } = req.body

  try {
    const [result] = await db.query(
      "INSERT INTO pelanggan (nama, no_hp, alamat, status, car_id, tanggal_sewa, lama_sewa, tanggal_selesai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nama, no_hp, alamat, status || "aktif", car_id || null, tanggal_sewa || null, lama_sewa || null, tanggal_selesai || null]
    )

    const [rows] = await db.query(`
      SELECT p.*, c.nama AS nama_mobil, c.harga AS harga_mobil
      FROM pelanggan p
      LEFT JOIN cars c ON p.car_id = c.id
      WHERE p.id = ?
    `, [result.insertId])
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data pelanggan tidak valid" })
  }
})

app.put("/api/pelanggan/:id", async (req, res) => {
  const { nama, no_hp, alamat, status } = req.body

  try {
    const [result] = await db.query(
      "UPDATE pelanggan SET nama = ?, no_hp = ?, alamat = ?, status = ? WHERE id = ?",
      [nama, no_hp, alamat, status, req.params.id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" })
    }

    const [rows] = await db.query("SELECT * FROM pelanggan WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch (error) {
    res.status(400).json({ message: "Data pelanggan tidak valid" })
  }
})

app.delete("/api/pelanggan/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM pelanggan WHERE id = ?", [req.params.id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" })
    }

    res.json({ message: "Pelanggan berhasil dihapus" })
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus pelanggan" })
  }
})

app.listen(3000, () => {
  console.log("Backend berjalan di http://localhost:3000")
})