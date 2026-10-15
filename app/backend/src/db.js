import mysql from 'mysql2/promise';
import { config } from './config.js';

let pool;

export async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      ...config.db,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function initDb() {
  const conn = await getPool();

  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      bike_name VARCHAR(255) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      price DECIMAL(10,2) NOT NULL,
      status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  console.log('[DB] Tables initialized');
}

export async function query(sql, params) {
  const conn = await getPool();
  const [rows] = await conn.execute(sql, params);
  return rows;
}
