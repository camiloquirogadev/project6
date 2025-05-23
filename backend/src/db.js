// src/db.js
import mysql from 'mysql2/promise';

const config = {
  host:     '127.0.0.1',
  port:     3306,
  user:     'root',
  password: '',
  database: 'project6',
};
console.log('Usando config hardcode:', config);

export async function getConnection() {
  return mysql.createConnection(config);
}
