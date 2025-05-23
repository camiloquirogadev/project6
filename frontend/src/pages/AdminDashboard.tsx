import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  // const { user } = useAuth();
  const [totalClients, setTotalClients] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Simulación de estadísticas, después lo conectamos al backend
    setTimeout(() => {
      setTotalClients(42);
      setTotalInvoices(189);
      setTotalRevenue(12750);
    }, 800);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Zowu Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4 border">
          <h2 className="text-sm font-semibold text-gray-600">Total Clientes</h2>
          <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border">
          <h2 className="text-sm font-semibold text-gray-600">Facturas Emitidas</h2>
          <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border">
          <h2 className="text-sm font-semibold text-gray-600">Ingresos Totales</h2>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold mb-2">Últimos clientes registrados</h3>
        <ul className="space-y-2">
          <li className="bg-gray-50 p-2 rounded border">cliente1@empresa.com</li>
          <li className="bg-gray-50 p-2 rounded border">cliente2@empresa.com</li>
          <li className="bg-gray-50 p-2 rounded border">cliente3@empresa.com</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
