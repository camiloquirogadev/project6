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
