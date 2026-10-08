export async function initializeAuthSchema(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(64) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin', 'pelanggan') NOT NULL,
      pelanggan_id INT UNIQUE NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_users_pelanggan FOREIGN KEY (pelanggan_id)
        REFERENCES pelanggan(id) ON DELETE CASCADE
    )
  `)
}
