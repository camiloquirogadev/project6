import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import DataTable from '../components/ui/DataTable';
import Card from '../components/ui/Card';
import { Plus, Filter, Download, Search } from 'lucide-react';

function Products() {
  const { products } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const navigate = useNavigate();
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Apply filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort alphabetically by name
  const sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  
  // Table columns
  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      width: '25%',
    },
    {
      header: 'SKU',
      accessor: 'sku',
      width: '15%',
    },
    {
      header: 'Category',
      accessor: 'category',
      width: '15%',
    },
    {
      header: 'Price',
      accessor: (product: typeof products[0]) => `$${product.price.toLocaleString()}`,
      width: '15%',
    },
    {
      header: 'Stock',
      accessor: 'stock',
      width: '10%',
    },
    {
      header: 'Description',
      accessor: (product: typeof products[0]) => {
        // Truncate description if too long
        return product.description.length > 50 
          ? `${product.description.substring(0, 50)}...` 
          : product.description;
      },
      width: '20%',
    },
  ];
  
  // Handle row click
  const handleRowClick = (product: typeof products[0]) => {
    navigate(`/products/${product.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button className="btn btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          New Product
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
            placeholder="Search products..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
          <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button className="btn btn-secondary flex items-center">
          <Download size={16} className="mr-1" />
          Export
        </button>
          </div>
        </div>
        
        {/* Products Table */}
        <DataTable
          data={sortedProducts}
          columns={columns as any}
          keyField="id"
          onRowClick={handleRowClick}
          emptyMessage="No products found. Add your first product!"
        />
      </Card>
    </div>
  );
}

export default Products;