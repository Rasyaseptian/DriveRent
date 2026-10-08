export async function ensureTransactionNikColumn(db) {
  const [columns] = await db.query(
    `SELECT COLUMN_NAME
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'transaksi'
       AND COLUMN_NAME = 'nik_ktp'`
  )

  if (columns.length === 0) {
    await db.query(
      "ALTER TABLE transaksi ADD COLUMN nik_ktp VARCHAR(16) NULL AFTER total_harga"
    )
  }
}
