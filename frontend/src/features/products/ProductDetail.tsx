import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Card from '../../components/ui/Card';
import { 
  ChevronLeft, 
  Edit, 
  Trash, 
  Tag, 
  Package, 
  DollarSign, 
  BarChart2, 
  Layers
} from 'lucide-react';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useData();
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, redirect to products list
        navigate('/products');
      }
    }
  }, [id, products, navigate]);
  
  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/products')}
            className="mr-4 p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">
              SKU: {product.sku} | Category: {product.category}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-secondary flex items-center">
            <Edit size={16} className="mr-1" />
            Edit
          </button>
          <button className="btn btn-danger flex items-center">
            <Trash size={16} className="mr-1" />
            Delete
          </button>
        </div>
      </div>
      
      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Info */}
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Product Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1 text-gray-900">{product.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                    <p className="mt-1 text-gray-900">{product.sku}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1 text-gray-900">{product.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="mt-1 text-gray-900">${product.price.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                    <p className="mt-1 text-gray-900">{product.stock} units</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{product.description}</p>
              </div>
            </div>
          </Card>
          
          <div className="mt-6">
            <Card title="Product Performance">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <BarChart2 size={16} className="text-blue-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Sales</h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">47</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <DollarSign size={16} className="text-green-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Revenue</h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">$5,640</p>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Layers size={16} className="text-yellow-600 mr-2" />
                    <h3 className="text-sm font-medium text-gray-700">Inventory Value</h3>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">$120,000</p>
                  <p className="text-xs text-gray-500">Current stock</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Side Panel */}
        <div className="lg:col-span-1">
          <Card title="Inventory Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Current Stock</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{product.stock} units</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Unit Price</span>
                </div>
                <span className="text-sm font-medium text-gray-900">${product.price.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Total Value</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${(product.price * product.stock).toLocaleString()}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Stock Status</h3>
                
                <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                  {/* Stock level indicator - adjust width based on stock level */}
                  <div 
                    className={`h-full ${
                      product.stock > 50 ? 'bg-green-500' : 
                      product.stock > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                  ></div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  {product.stock > 50 
                    ? 'In Stock: Good inventory levels' 
                    : product.stock > 20 
                      ? 'Medium Stock: Consider reordering soon'
                      : 'Low Stock: Reorder recommended'}
                </p>
              </div>
            </div>
          </Card>
          
          <div className="mt-6">
            <Card title="Actions">
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Update Inventory
                </button>
                <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Add to Invoice
                </button>
                <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Order More
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;