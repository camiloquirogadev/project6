import { useEffect } from 'react';
import Card from '../components/ui/Card';
import { BarChart2, Users, CreditCard, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminDashboard() {
  const { invoices, contacts, products, sales } = useData();

  useEffect(() => {
    document.title = 'Admin Dashboard | Zowu';
  }, []);

  const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
  const totalInvoices = invoices.length;
  const totalContacts = contacts.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart2 size={24} /> Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <CreditCard size={16} /> Total Revenue
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FileText size={16} /> Invoices
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalInvoices}
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Users size={16} /> Contacts
            </p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {totalContacts}
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <FileText size={16} /> Products
            </p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {totalProducts}
            </p>
          </div>
        </Card>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Welcome to your admin dashboard. Here you can monitor your business performance, view recent activity, and manage users and data efficiently.
        </p>
      </div>
    </div>
  );
}
