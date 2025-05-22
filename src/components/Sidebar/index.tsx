import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  Package, 
  Settings as SettingsIcon, 
  ChevronLeft,
  CreditCard,
  BarChart2,
  Calendar,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isOpen, isMobile, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/invoices', label: 'Invoices', icon: <FileText size={20} /> },
    { path: '/contacts', label: 'Contacts', icon: <Users size={20} /> },
    { path: '/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/sales', label: 'Sales', icon: <CreditCard size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart2 size={20} /> },
    { path: '/calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
  ];
  
  // Determine if the sidebar should be shown
  const sidebarClasses = `bg-white h-screen border-r border-gray-200 transition-all duration-300 ${
    isOpen ? 'w-64' : 'w-0 sm:w-16'
  } ${isMobile && !isOpen ? 'hidden' : 'fixed sm:relative'} z-20`;
  
  // Calculate content classes based on sidebar state
  const contentClasses = `flex flex-col h-full overflow-y-auto ${
    isOpen ? 'opacity-100' : 'opacity-0 sm:opacity-100'
  }`;
  
  // If mobile and sidebar is open, add overlay
  const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden ${
    isMobile && isOpen ? 'block' : 'hidden'
  }`;
  
  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div className={overlayClasses} onClick={toggleSidebar}></div>
      
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className={contentClasses}>
          {/* Logo and toggle button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center">
              {isOpen ? (
                <h1 className="text-xl font-bold text-blue-600">Zowu</h1>
              ) : (
                <span className="text-xl font-bold text-blue-600">Z</span>
              )}
            </Link>
            
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
          
          {/* Help section */}
          {isOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center">
                  <HelpCircle size={20} className="text-blue-600 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">Need help?</h3>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Check our help center or contact support.
                </p>
                <button className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Help Center
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;