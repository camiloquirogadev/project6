// src/index.js

// 1️⃣ Carga de variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// 2️⃣ Imports del stack
import express from 'express';
import cors from 'cors';
import { getConnection } from './db.js';

// 3️⃣ Inicialización de la app
const app = express();
app.use(cors());
app.use(express.json());

// 4️⃣ Ruta de prueba de conexión a MySQL
app.get('/test-db', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query('SELECT DATABASE() AS db');
    await conn.end();
    res.json({ success: true, database: rows[0].db });
  } catch (err) {
    console.error('Error conectando a la DB:', err);
    res.status(500).json({ success: false, message: 'Error conectando a la base de datos' });
  }
});

// 5️⃣ Otras rutas de tu API
// app.use('/users', usersRouter);
// app.use('/products', productsRouter);

// 6️⃣ Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});