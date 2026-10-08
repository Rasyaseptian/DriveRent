# DriveRent

Project rental mobil sederhana berbasis React + Express + MySQL.

Struktur utama:
- frontend: tampilan UI React
- backend: API Express untuk mengelola data mobil
- backend/db_driverrent.sql: script SQL untuk membuat database dan tabel

Cara jalankan:
1. Siapkan database MySQL `driverent` dengan tabel rental yang sudah ada. Jangan jalankan ulang skrip SQL yang berisi `DROP TABLE` jika ingin mempertahankan data.
2. Install dependency backend: `cd backend && npm install`.
3. Salin `backend/.env.example` menjadi `backend/.env`, lalu isi `JWT_SECRET` dengan secret acak minimal 32 karakter dan sesuaikan konfigurasi DB jika perlu. Jangan commit `.env`.
4. Pastikan akun admin dan pelanggan sudah disediakan melalui proses provisioning akun yang disetujui pengelola. Password akun disimpan menggunakan hash bcrypt.
5. Jalankan backend dari folder `backend`: `npm start`.
6. Jalankan frontend dari folder utama: `npm install && npm run dev`, lalu buka URL yang ditampilkan Vite dan login dengan akun yang disediakan.

Login memakai `POST /api/auth/login` dengan username/email dan password. API rental meminta JWT Bearer; pelanggan dapat melihat mobil dan hanya transaksi miliknya, sedangkan CRUD pengelolaan tetap khusus admin. Tabel auth `users` dibuat otomatis menggunakan `CREATE TABLE IF NOT EXISTS`. Backend menambahkan kolom `transaksi.nik_ktp` secara non-destruktif jika belum ada; nilai peminjaman lama dibiarkan `NULL`.

Tujuan project ini untuk belajar alur aplikasi fullstack: UI -> state -> API -> database.
