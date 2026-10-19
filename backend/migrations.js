const PLATE_REGIONS = ["A", "B", "D", "F", "T", "E", "Z", "G", "H", "K", "R", "AA", "AB", "AD", "L", "M", "N", "P", "S", "W", "AE", "AG", "DK", "DR", "EA", "EB", "ED", "PA", "PB"]

function createUniquePlate(usedPlates) {
  let plate
  do {
    const region = PLATE_REGIONS[Math.floor(Math.random() * PLATE_REGIONS.length)]
    const digits = Math.floor(1000 + Math.random() * 9000)
    const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26), 65 + Math.floor(Math.random() * 26), 65 + Math.floor(Math.random() * 26))
    plate = `${region} ${digits} ${suffix}`
  } while (usedPlates.has(plate))
  return plate
}

export async function ensureCarPlateColumn(db) {
  const [columns] = await db.query(
    `SELECT COLUMN_NAME
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'cars'
       AND COLUMN_NAME = 'plat_nomor'`
  )

  if (columns.length === 0) {
    await db.query("ALTER TABLE cars ADD COLUMN plat_nomor VARCHAR(11) NULL AFTER nama")
  }

  const [cars] = await db.query("SELECT id, plat_nomor FROM cars ORDER BY id")
  const usedPlates = new Set()
  for (const car of cars) {
    const currentPlate = String(car.plat_nomor || "").trim().toUpperCase().replace(/\s+/g, " ")
    if (/^[A-Z]{1,2} [0-9]{1,4} [A-Z]{1,3}$/.test(currentPlate) && !usedPlates.has(currentPlate)) {
      usedPlates.add(currentPlate)
      continue
    }

    const newPlate = createUniquePlate(usedPlates)
    await db.query("UPDATE cars SET plat_nomor = ? WHERE id = ?", [newPlate, car.id])
    usedPlates.add(newPlate)
  }

  const [indexes] = await db.query(
    `SELECT INDEX_NAME
     FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'cars'
       AND COLUMN_NAME = 'plat_nomor'
       AND NON_UNIQUE = 0`
  )
  if (indexes.length === 0) {
    await db.query("ALTER TABLE cars ADD CONSTRAINT uq_cars_plat_nomor UNIQUE (plat_nomor)")
  }
  await db.query("ALTER TABLE cars MODIFY COLUMN plat_nomor VARCHAR(11) NOT NULL")
}

export async function ensureCarArchiveColumn(db) {
  const [columns] = await db.query(
    `SELECT COLUMN_NAME
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'cars'
       AND COLUMN_NAME = 'is_archived'`
  )

  if (columns.length === 0) {
    await db.query("ALTER TABLE cars ADD COLUMN is_archived TINYINT(1) NOT NULL DEFAULT 0")
  }
}

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
