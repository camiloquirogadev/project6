import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import Card from '../components/ui/Card';
import { Plus, Filter, Download, Search } from 'lucide-react';

function Invoices() {
  const { invoices, contacts } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();
  
  // Helper to get contact name by ID
  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown';
  };
  
  // Apply filters
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
      getContactName(invoice.contactId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort by date (most recent first)
  const sortedInvoices = [...filteredInvoices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Table columns
  const columns = [
    {
      header: 'Invoice #',
      accessor: 'number',
      width: '15%',
    },
    {
      header: 'Customer',
      accessor: (invoice: typeof invoices[0]) => getContactName(invoice.contactId),
      width: '20%',
    },
    {
      header: 'Date',
      accessor: (invoice: typeof invoices[0]) => new Date(invoice.date).toLocaleDateString(),
      width: '15%',
    },
    {
      header: 'Due Date',
      accessor: (invoice: typeof invoices[0]) => new Date(invoice.dueDate).toLocaleDateString(),
      width: '15%',
    },
    {
      header: 'Amount',
      accessor: (invoice: typeof invoices[0]) => `$${invoice.total.toLocaleString()}`,
      width: '15%',
    },
    {
      header: 'Status',
      accessor: (invoice: typeof invoices[0]) => <StatusBadge status={invoice.status} />,
      width: '15%',
    },
  ];
  
  // Handle row click
  const handleRowClick = (invoice: typeof invoices[0]) => {
    navigate(`/invoices/${invoice.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button className="btn btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          New Invoice
        </button>
      </div>
      
      <Card>
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-60"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            
            <button className="btn btn-secondary flex items-center">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {/* Invoices Table */}
        <DataTable
          data={sortedInvoices}
          columns={columns}
          keyField="id"
          onRowClick={handleRowClick}
          emptyMessage="No invoices found. Create your first invoice!"
        />
      </Card>
    </div>
  );
}

export default Invoices;