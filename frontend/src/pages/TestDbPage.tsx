// frontend/src/pages/TestDbPage.tsx
import { useEffect, useState } from 'react';
import { testDB } from '../services/api';

export default function TestDbPage() {
  const [dbName, setDbName] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    testDB()
      .then((data) => {
        if (data.success) {
          setDbName(data.database);
        } else {
          setError('No fue posible conectar con la BD');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de conexión a BD</h1>
      {dbName && <p>✅ Base de datos: <strong>{dbName}</strong></p>}
      {error &&   <p className="text-red-600">❌ Error: {error}</p>}
    </div>
  );
}
