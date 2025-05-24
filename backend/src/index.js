// src/index.js
app.use('/api/roles', require('./routes/roleRoutes'));

// 1️⃣ Carga de variables de entorno
import dotenv from 'dotenv';
dotenv.config();
// DEBUG: muestra las vars de entorno relevantes
console.log('DB_USER=', process.env.DB_USER);
console.log('DB_PASS=', process.env.DB_PASS === '' ? '<vacío>' : '******');
console.log('DB_NAME=', process.env.DB_NAME);
// 2️⃣ Imports del stack
import express from 'express';
import cors from 'cors';
import { getConnection } from './db.js';
import { Router } from 'express';

// 3️⃣ Inicialización de la app
const app = express();
app.use(cors());
app.use(express.json());

// 4️⃣ Crea un router para tus endpoints
const router = Router();

// Ruta de prueba de conexión a MySQL
router.get('/test-db', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query('SELECT DATABASE() AS db');
    await conn.end();
    res.json({ success: true, database: rows[0].db });
  } catch (err) {
    console.error('Error conectando a la DB:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Aquí podrías añadir más rutas al router:
// router.use('/users', usersRouter);
// router.use('/products', productsRouter);

// 5️⃣ Monta el router bajo el prefijo /api
app.use('/api', router);

// 6️⃣ Handler para la raíz `/`
app.get('/', (_req, res) => {
  res.send('🚀 API corriendo correctamente. Prueba GET /api/test-db');
});

// 7️⃣ Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
