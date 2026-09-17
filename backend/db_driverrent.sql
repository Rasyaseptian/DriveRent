CREATE DATABASE IF NOT EXISTS DriveRent;

USE DriveRent;

DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    kursi INT NOT NULL,
    transmisi ENUM('Manual', 'Automatic') NOT NULL,
    gambar VARCHAR(255) NOT NULL,
    status ENUM('tersedia', 'disewa') NOT NULL DEFAULT 'tersedia'
);

SELECT id, nama, harga, kursi, transmisi, status FROM cars;