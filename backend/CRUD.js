import "dotenv/config"
import express from "express"
import cors from "cors"
import multer from "multer"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "./database.js"
import { initializeAuthSchema } from "./auth-schema.js"
import { ensureTransactionNikColumn } from "./migrations.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
  destination: "uploads/cars",
  filename: (req, file, cb) => cb(null, file.originalname)
})
const upload = multer({ storage })

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET wajib disetel minimal 32 karakter di backend/.env")
}

await initializeAuthSchema(db)
await ensureTransactionNikColumn(db)

const authenticate = async (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || "").split(" ")
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Silakan login terlebih dahulu" })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const [rows] = await db.query(
      "SELECT id, username, email, role, pelanggan_id FROM users WHERE id = ?",
      [payload.sub]
    )
    if (rows.length === 0) return res.status(401).json({ message: "Akun tidak ditemukan" })
    req.user = rows[0]
    next()
  } catch {
    return res.status(401).json({ message: "Sesi tidak valid atau sudah kedaluwarsa" })
  }
}

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Akses tidak diizinkan" })
  }
  next()
}

app.post("/api/auth/login", async (req, res) => {
  const identifier = String(req.body.identifier || "").trim().toLowerCase()
  const password = String(req.body.password || "")
  if (!identifier || !password) {
    return res.status(400).json({ message: "Username/email dan password wajib diisi" })
  }

  try {
    const [rows] = await db.query(
      "SELECT id, username, email, password_hash, role, pelanggan_id FROM users WHERE LOWER(username) = ? OR LOWER(email) = ? LIMIT 1",
      [identifier, identifier]
    )
    const account = rows[0]
    if (!account || !(await bcrypt.compare(password, account.password_hash))) {
      return res.status(401).json({ message: "Username/email atau password salah" })
    }

    const token = jwt.sign(
      { role: account.role, pelanggan_id: account.pelanggan_id },
      process.env.JWT_SECRET,
      { subject: String(account.id), expiresIn: "8h" }
    )
    res.json({
      token,
      user: {
        id: account.id,
        username: account.username,
        email: account.email,
        role: account.role,
        pelanggan_id: account.pelanggan_id,
      },
    })
  } catch (error) {
    console.error("Login gagal:", error.message)
    res.status(500).json({ message: "Login gagal diproses" })
  }
})

app.use("/api", authenticate)

app.get("/api/auth/me", async (req, res) => {
  if (req.user.role !== "pelanggan") return res.json(req.user)
  const [rows] = await db.query(
    `SELECT u.id, u.username, u.email, u.role, u.pelanggan_id,
            p.nama, p.no_hp, p.alamat
     FROM users u JOIN pelanggan p ON p.id = u.pelanggan_id WHERE u.id = ?`,
    [req.user.id]
  )
  if (rows.length === 0) return res.status(404).json({ message: "Profil pelanggan tidak ditemukan" })
  res.json(rows[0])
})

const JENIS_VALID = ['City Car', 'MPV', 'SUV', 'Sedan', 'Hatchback', 'Minibus', 'Luxury', 'Supercar']

app.get("/api/cars", requireRole("admin", "pelanggan"), async (req, res) => {
  const [rows] = await db.query("SELECT * FROM cars")
  res.json(rows)
})

app.post("/api/cars", requireRole("admin"), upload.single("gambar"), async (req, res) => {
  const { nama, harga, kursi, transmisi, status, jenis } = req.body
  const gambar = req.file ? req.file.originalname : null
  const hargaNum = Number(harga)
  const kursiNum = Number(kursi)

  if (jenis && !JENIS_VALID.includes(jenis))
    return res.status(400).json({ message: "Jenis mobil tidak valid" })

  try {
    const [result] = await db.query(
      "INSERT INTO cars (nama, harga, kursi, transmisi, status, gambar, jenis) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nama, hargaNum, kursiNum, transmisi, status, gambar, jenis || null]
    )
    const [rows] = await db.query("SELECT * FROM cars WHERE id = ?", [result.insertId])
    res.status(201).json(rows[0])
  } catch {
    res.status(400).json({ message: "Data mobil tidak valid" })
  }
})

app.put("/api/cars/:id", requireRole("admin"), upload.single("gambar"), async (req, res) => {
  const { nama, harga, kursi, transmisi, status, jenis } = req.body
  const hargaNum = Number(harga)
  const kursiNum = Number(kursi)

  if (jenis && !JENIS_VALID.includes(jenis))
    return res.status(400).json({ message: "Jenis mobil tidak valid" })

  try {
    const [existing] = await db.query("SELECT gambar FROM cars WHERE id = ?", [req.params.id])
    if (existing.length === 0) return res.status(404).json({ message: "Mobil tidak ditemukan" })

    const gambar = req.file ? req.file.originalname : existing[0].gambar

    await db.query(
      "UPDATE cars SET nama = ?, harga = ?, kursi = ?, transmisi = ?, status = ?, gambar = ?, jenis = ? WHERE id = ?",
      [nama, hargaNum, kursiNum, transmisi, status, gambar, jenis || null, req.params.id]
    )
    const [rows] = await db.query("SELECT * FROM cars WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch {
    res.status(500).json({ message: "Gagal mengedit mobil" })
  }
})

app.delete("/api/cars/:id", requireRole("admin"), async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM cars WHERE id = ?", [req.params.id])
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Mobil tidak ditemukan" })
    res.json({ message: "Mobil berhasil dihapus" })
  } catch {
    res.status(500).json({ message: "Gagal menghapus mobil" })
  }
})

app.get("/api/me/transaksi", requireRole("pelanggan"), async (req, res) => {
  if (!req.user.pelanggan_id) {
    return res.status(403).json({ message: "Akun belum terhubung ke data pelanggan" })
  }
  const [rows] = await db.query(
    `SELECT t.*, c.nama AS nama_mobil
     FROM transaksi t JOIN cars c ON c.id = t.mobil_id
     WHERE t.pelanggan_id = ? ORDER BY t.id DESC`,
    [req.user.pelanggan_id]
  )
  res.json(rows)
})

app.post("/api/me/transaksi", requireRole("pelanggan"), async (req, res) => {
  const { mobil_id, tanggal_mulai, tanggal_selesai, nik_ktp } = req.body
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!req.user.pelanggan_id) {
    return res.status(403).json({ message: "Akun belum terhubung ke data pelanggan" })
  }
  if (!mobil_id || !datePattern.test(tanggal_mulai || "") || !datePattern.test(tanggal_selesai || "") || tanggal_selesai <= tanggal_mulai) {
    return res.status(400).json({ message: "Mobil dan rentang tanggal yang valid wajib dipilih" })
  }
  if (!/^\d{16}$/.test(String(nik_ktp || ""))) {
    return res.status(400).json({ message: "NIK KTP harus terdiri dari 16 digit" })
  }

  const connection = await db.getConnection()
  try {
    await connection.beginTransaction()
    const [cars] = await connection.query(
      "SELECT id, nama, harga, status FROM cars WHERE id = ? FOR UPDATE",
      [mobil_id]
    )
    if (!cars.length || cars[0].status !== "tersedia") {
      await connection.rollback()
      return res.status(409).json({ message: "Mobil tidak tersedia" })
    }

    const [[duration]] = await connection.query(
      "SELECT DATEDIFF(?, ?) AS hari",
      [tanggal_selesai, tanggal_mulai]
    )
    const totalHarga = Number(cars[0].harga) * Math.max(1, Number(duration.hari))
    const [result] = await connection.query(
      "INSERT INTO transaksi (pelanggan_id, mobil_id, tanggal_mulai, tanggal_selesai, total_harga, nik_ktp, status) VALUES (?, ?, ?, ?, ?, ?, 'Aktif')",
      [req.user.pelanggan_id, cars[0].id, tanggal_mulai, tanggal_selesai, totalHarga, nik_ktp]
    )
    await connection.query("UPDATE cars SET status = 'disewa' WHERE id = ?", [cars[0].id])
    await connection.commit()

    const [rows] = await db.query(
      `SELECT t.*, c.nama AS nama_mobil
       FROM transaksi t JOIN cars c ON c.id = t.mobil_id WHERE t.id = ?`,
      [result.insertId]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    await connection.rollback()
    console.error("Peminjaman pelanggan gagal:", error.message)
    res.status(500).json({ message: "Peminjaman gagal diproses" })
  } finally {
    connection.release()
  }
})

app.get("/api/pelanggan", requireRole("admin"), async (req, res) => {
  const [rows] = await db.query(`
    SELECT p.*, t.id AS transaksi_id, c.nama AS nama_mobil,
           t.tanggal_mulai, t.tanggal_selesai, t.status AS status_transaksi
    FROM pelanggan p
    LEFT JOIN transaksi t ON t.pelanggan_id = p.id AND t.status = 'Aktif'
    LEFT JOIN cars c ON c.id = t.mobil_id
  `)
  res.json(rows)
})

app.post("/api/pelanggan", requireRole("admin"), async (req, res) => {
  const { nama, no_hp, alamat } = req.body
  try {
    const [result] = await db.query(
      "INSERT INTO pelanggan (nama, no_hp, alamat) VALUES (?, ?, ?)",
      [nama, no_hp, alamat || null]
    )
    const [rows] = await db.query("SELECT * FROM pelanggan WHERE id = ?", [result.insertId])
    res.status(201).json(rows[0])
  } catch {
    res.status(400).json({ message: "Data pelanggan tidak valid" })
  }
})

app.put("/api/pelanggan/:id", requireRole("admin"), async (req, res) => {
  const { nama, no_hp, alamat } = req.body
  try {
    const [result] = await db.query(
      "UPDATE pelanggan SET nama = ?, no_hp = ?, alamat = ? WHERE id = ?",
      [nama, no_hp, alamat || null, req.params.id]
    )
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" })
    const [rows] = await db.query("SELECT * FROM pelanggan WHERE id = ?", [req.params.id])
    res.json(rows[0])
  } catch {
    res.status(400).json({ message: "Data pelanggan tidak valid" })
  }
})

app.delete("/api/pelanggan/:id", requireRole("admin"), async (req, res) => {
  try {
    const [aktif] = await db.query(
      "SELECT id FROM transaksi WHERE pelanggan_id = ? AND status = 'Aktif'",
      [req.params.id]
    )
    if (aktif.length > 0)
      return res.status(400).json({ message: "Pelanggan masih memiliki transaksi aktif" })

    await db.query("DELETE FROM transaksi WHERE pelanggan_id = ?", [req.params.id])

    const [result] = await db.query("DELETE FROM pelanggan WHERE id = ?", [req.params.id])
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" })
    res.json({ message: "Pelanggan berhasil dihapus" })
  } catch {
    res.status(500).json({ message: "Gagal menghapus pelanggan" })
  }
})

app.get("/api/transaksi", requireRole("admin"), async (req, res) => {
  const [rows] = await db.query(`
    SELECT t.*, p.nama AS nama_pelanggan, c.nama AS nama_mobil
    FROM transaksi t
    JOIN pelanggan p ON p.id = t.pelanggan_id
    JOIN cars c ON c.id = t.mobil_id
    ORDER BY t.id DESC
  `)
  res.json(rows)
})

app.post("/api/transaksi", requireRole("admin"), async (req, res) => {
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
  } catch {
    res.status(400).json({ message: "Data transaksi tidak valid" })
  }
})

app.put("/api/transaksi/:id", requireRole("admin"), async (req, res) => {
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
  } catch {
    res.status(500).json({ message: "Gagal mengupdate transaksi" })
  }
})

app.listen(3000, () => {
  console.log("Backend berjalan di http://localhost:3000")
})
