import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, 'migrations');

async function ensureMigrationsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_migrations_filename (filename)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

async function run() {
  const connection = await pool.getConnection();
  try {
    await ensureMigrationsTable(connection);

    const [appliedRows] = await connection.query('SELECT filename FROM _migrations');
    const applied = new Set(appliedRows.map((row) => row.filename));

    const files = (await fs.readdir(migrationsDir))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    const pending = files.filter((file) => !applied.has(file));

    if (pending.length === 0) {
      console.log('No pending migrations. Database is up to date.');
      return;
    }

    for (const file of pending) {
      const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
      console.log(`Applying ${file}...`);
      await connection.query(sql);
      await connection.query('INSERT INTO _migrations (filename) VALUES (?)', [file]);
    }

    console.log(`Applied ${pending.length} migration(s) successfully.`);
  } finally {
    connection.release();
    await pool.end();
  }
}

run().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
