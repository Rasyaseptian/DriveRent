CREATE DATABASE IF NOT EXISTS DriveRent;

USE DriveRent;

DROP TABLE IF EXISTS transaksi;
DROP TABLE IF EXISTS pelanggan;
DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    kursi INT NOT NULL,
    transmisi ENUM('Manual', 'Automatic') NOT NULL,
    jenis VARCHAR(50),
    gambar VARCHAR(255),
    status ENUM('tersedia', 'disewa') NOT NULL DEFAULT 'tersedia'
);

CREATE TABLE pelanggan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    no_hp VARCHAR(20) NOT NULL
);

CREATE TABLE transaksi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT NOT NULL,
    mobil_id INT NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE NOT NULL,
    total_harga INT NOT NULL,
    status ENUM('Aktif', 'Selesai') NOT NULL DEFAULT 'Aktif',
    FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id),
    FOREIGN KEY (mobil_id) REFERENCES cars(id)
);
