// src/db.js
import mysql from 'mysql2/promise';

// Configuración leída desde .env
const config = {
  host:     process.env.DB_HOST,       // p.ej. 127.0.0.1
  port:     process.env.DB_PORT || 3306,
  user:     process.env.DB_USER,       // p.ej. root
  password: process.env.DB_PASS || '', // contraseña vacía si usas root sin pass
  database: process.env.DB_NAME,       // p.ej. project6
};

/**
 * Devuelve una conexión Promise-based a MySQL.
 */
export async function getConnection() {
  return mysql.createConnection(config);
}
