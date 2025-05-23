import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import DataTable from '../components/ui/DataTable';
import StatusBadge from '../components/ui/StatusBadge';
import Card from '../components/ui/Card';
import { Plus, Filter, Download, Search } from 'lucide-react';

function Contacts() {
  const { contacts } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const navigate = useNavigate();
  
  // Apply filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || contact.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Sort alphabetically by name
  const sortedContacts = [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name));
  
  // Table columns
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      width: '25%',
    },
    {
      header: 'Email',
      accessor: 'email',
      width: '25%',
    },
    {
      header: 'Phone',
      accessor: 'phone',
      width: '20%',
    },
    {
      header: 'Location',
      accessor: (contact: typeof contacts[0]) => `${contact.city}, ${contact.country}`,
      width: '20%',
    },
    {
      header: 'Type',
      accessor: (contact: typeof contacts[0]) => <StatusBadge status={contact.type} />,
      width: '10%',
    },
  ];
  
  // Handle row click
  const handleRowClick = (contact: typeof contacts[0]) => {
    navigate(`/contacts/${contact.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <button className="btn btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          New Contact
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
                placeholder="Search contacts..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Types</option>
                <option value="customer">Customers</option>
                <option value="vendor">Vendors</option>
              </select>
            </div>
            
            <button className="btn btn-secondary flex items-center">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {/* Contacts Table */}
        <DataTable
          data={sortedContacts}
          columns={columns}
          keyField="id"
          onRowClick={handleRowClick}
          emptyMessage="No contacts found. Add your first contact!"
        />
      </Card>
    </div>
  );
}

export default Contacts;