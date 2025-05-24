import { useEffect } from 'react';
import Card from '../components/ui/Card';
import { CreditCard, CalendarDays } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Sale } from '../types/index';

export default function Sales() {
  const { sales } = useData();

  useEffect(() => {
    document.title = 'Sales | Zowu';
  }, []);

  const totalSales = sales.reduce((sum: number, sale: Sale) => sum + sale.amount, 0);

  const customerTotals = sales.reduce((acc: Record<string, number>, sale: Sale) => {
    acc[sale.customer] = (acc[sale.customer] || 0) + sale.amount;
    return acc;
  }, {});

  const topCustomer = (Object.entries(customerTotals) as [string, number][])
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <CreditCard size={24} /> Sales / Orders
        </h1>
        <button className="btn btn-primary">Export Sales</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Filter by Date">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-gray-600 dark:text-gray-400" />
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm p-2 rounded-md text-gray-700 dark:text-gray-200 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">to</span>
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm p-2 rounded-md text-gray-700 dark:text-gray-200 w-full"
              />
            </div>
            <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md w-full">
              Apply Filter
            </button>
          </div>
        </Card>

        <Card title="Sales Summary" className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">Total Orders</p>
              <p className="text-xl font-bold text-blue-900 dark:text-white">{sales.length}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">Total Revenue</p>
              <p className="text-xl font-bold text-green-900 dark:text-white">${totalSales.toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-200">Top Customer</p>
              <p className="text-xl font-bold text-purple-900 dark:text-white">{topCustomer}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent Sales">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="text-left px-4 py-2">#</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Customer</th>
                <th className="text-left px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale: Sale, index: number) => (
                <tr
                  key={sale.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sale.date}</td>
                  <td className="px-4 py-2">{sale.customer}</td>
                  <td className="px-4 py-2 font-medium text-green-600 dark:text-green-400">
                    ${sale.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}