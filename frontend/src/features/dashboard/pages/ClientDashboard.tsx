// src/features/dashboard/pages/ClientDashboard.tsx
import { useEffect, useState } from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { api } from '@/services/api';

interface DashboardData {
  totalUsers: number;
  totalInvoices: number;
  totalRevenue: number;
  unpaidInvoices: number;
}

export default function ClientDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get('/dashboard/metrics').then(res => setData(res.data));
  }, []);

  if (!data) return <p>Cargando métricas...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <MetricCard title="Usuarios" value={data.totalUsers} change={0} period={''} />
      <MetricCard title="Facturas" value={data.totalInvoices} change={0} period={''} />
      <MetricCard title="Ingresos ($)" value={parseFloat(data.totalRevenue.toFixed(2))} change={0} period={''} />
      <MetricCard title="Pendientes" value={data.unpaidInvoices} change={0} period={''} />
    </div>
  );
}
