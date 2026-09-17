CREATE DATABASE IF NOT EXISTS DriveRent;

USE DriveRent;

DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    kursi INT NOT NULL,
    transmisi ENUM('Manual', 'Automatic') NOT NULL,
    status ENUM('tersedia', 'disewa') NOT NULL DEFAULT 'tersedia'
);

CREATE TABLE pelanggan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  alamat TEXT,
  status ENUM('aktif', 'nonaktif') DEFAULT 'aktif',
  car_id INT,
  tanggal_sewa DATE,
  lama_sewa INT,
  tanggal_selesai DATE,
  FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE SET NULL
);

SELECT id, nama, harga, kursi, transmisi, status FROM cars;

SELECT id, nama, no_hp, alamat, status FROM pelanggan;