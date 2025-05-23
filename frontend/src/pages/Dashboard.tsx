import { useData } from '../context/DataContext';
import MetricCard from '../components/ui/MetricCard';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { Calendar, Clock, Clipboard, LineChart } from 'lucide-react';

function Dashboard() {
  const { dashboardMetrics, invoices, contacts } = useData();
  
  // Get recent invoices
  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Get recent customers
  const recentCustomers = contacts
    .filter((contact) => contact.type === 'customer')
    .slice(0, 5);
  
  // Calculate statistics
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue').length;
  const totalCustomers = contacts.filter(contact => contact.type === 'customer').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div>
          <button className="btn btn-primary">Export Report</button>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.label}
            value={metric.value}
            change={metric.change}
            period={metric.period}
            prefix={metric.label.includes('Revenue') ? '$' : ''}
            className="h-full"
          />
        ))}
      </div>
      
      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card title="Recent Invoices">
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-blue-50 mr-3">
                    <Clipboard size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{invoice.number}</p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-800 mr-3">
                    ${invoice.total.toLocaleString()}
                  </p>
                  <StatusBadge status={invoice.status} />
                </div>
              </div>
            ))}
            
            <div className="pt-2">
              <a href="/invoices" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all invoices
              </a>
            </div>
          </div>
        </Card>
        
        {/* Recent Customers */}
        <Card title="Recent Customers">
          <div className="space-y-4">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-gray-600">
                      {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <StatusBadge status={customer.type} />
              </div>
            ))}
            
            <div className="pt-2">
              <a href="/contacts" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all customers
              </a>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats Summary */}
        <Card title="Summary" className="col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Invoices</p>
              <p className="text-sm font-medium text-gray-800">{totalInvoices}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Paid Invoices</p>
              <p className="text-sm font-medium text-green-600">{paidInvoices}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Overdue Invoices</p>
              <p className="text-sm font-medium text-red-600">{overdueInvoices}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-sm font-medium text-gray-800">{totalCustomers}</p>
            </div>
          </div>
        </Card>
        
        {/* Upcoming Tasks */}
        <Card title="Upcoming Tasks" className="col-span-1">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-blue-50 mr-3">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Invoice Review</p>
                <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-purple-50 mr-3">
                <Clock size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Client Meeting</p>
                <p className="text-xs text-gray-500">Wed, 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-green-50 mr-3">
                <LineChart size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Financial Report</p>
                <p className="text-xs text-gray-500">Friday, 11:00 AM</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card title="Quick Actions" className="col-span-1">
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
              Create Invoice
            </button>
            <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Add Contact
            </button>
            <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Record Payment
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;