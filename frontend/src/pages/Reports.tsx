import { useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { BarChart2, LineChart as LineChartIcon } from 'lucide-react';

const barData = [
  { month: 'Jan', revenue: 4000, sales: 240 },
  { month: 'Feb', revenue: 3000, sales: 221 },
  { month: 'Mar', revenue: 5000, sales: 229 },
  { month: 'Apr', revenue: 4780, sales: 200 },
  { month: 'May', revenue: 5890, sales: 218 },
  { month: 'Jun', revenue: 4390, sales: 250 },
];

const lineData = [
  { month: 'Jan', customers: 40 },
  { month: 'Feb', customers: 60 },
  { month: 'Mar', customers: 50 },
  { month: 'Apr', customers: 80 },
  { month: 'May', customers: 65 },
  { month: 'Jun', customers: 90 },
];

export default function Reports() {
  useEffect(() => {
    document.title = 'Reports | Zowu';
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <BarChart2 size={24} /> Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">$125,000</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Product Sales</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">187</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">New Customers</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">23</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <BarChart2 size={20} /> Monthly Revenue & Sales
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
              <Bar dataKey="sales" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <LineChartIcon size={20} /> Customer Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
