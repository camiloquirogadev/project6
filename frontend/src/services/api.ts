// frontend/src/services/api.ts
export const API_URL = import.meta.env.VITE_API_URL as string;

/**
 * Testea la conexión al endpoint /test-db
 */
export async function testDB(): Promise<{ success: boolean; database: string }> {
  const res = await fetch(`${API_URL}/test-db`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para token (si usás autenticación)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { axios };

