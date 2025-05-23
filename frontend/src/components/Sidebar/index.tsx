// src/components/Sidebar.tsx
import { useState, useEffect } from 'react';
// Update the import path if AuthContext is located elsewhere, for example:
import { useAuth } from '../../context/AuthContext';
// Or create the file at src/context/AuthContext.tsx if it does not exist.

// import HelpCenter from '../pages/HelpCenter';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Users,
  Settings as SettingsIcon,
  ChevronLeft,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, isMobile, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  // Estado de tema oscuro, inicializado desde localStorage o preferencia del sistema
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Aplica y persiste el theme al cambiar isDark
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} />, roles: ['admin', 'cliente'] },
    { path: '/invoices', label: 'Invoices', icon: <FileText size={20} />, roles: ['cliente'] },
    { path: '/contacts', label: 'Contacts', icon: <Users size={20} />, roles: ['admin'] },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon size={20} />, roles: ['admin'] },
  ];

  const sidebarClasses = `
    bg-white dark:bg-gray-800
    h-screen border-r border-gray-200 dark:border-gray-700
    transition-all duration-300
    ${isOpen ? 'w-64' : 'w-0 sm:w-16'}
    ${isMobile && !isOpen ? 'hidden' : 'fixed sm:relative'}
    z-20
  `;

  const contentClasses = `
    flex flex-col h-full overflow-y-auto
    ${isOpen ? 'opacity-100' : 'opacity-0 sm:opacity-100'}
  `;

  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden
    ${isMobile && isOpen ? 'block' : 'hidden'}
  `;

  return (
    <>
      {/* Overlay móvil */}
      <div className={overlayClasses.trim()} onClick={toggleSidebar} />

      <aside className={sidebarClasses.trim()}>
        <div className={contentClasses.trim()}>
          {/* Header: Logo + toggle */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {isOpen ? 'Zowu' : 'Z'}
              </span>
              {isOpen && (
                <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Zowu</h1>
              )}
            </Link>

            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems
              .filter(item => item.roles.includes(user?.role ?? ''))
              .map(item => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={
                      `flex items-center px-2 py-2 text-sm font-medium rounded-md ` +
                      (active
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white')
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}


            {/* Ayuda y toggle darkmode */}
            {isOpen && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <HelpCircle size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Need help?</h3>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Check our help center or contact support.
                  </p>
                  <Link
                    to="/help"
                    className="mt-2 block w-full px-3 py-1.5 text-xs font-medium text-blue-600 bg-white dark:bg-gray-800 border border-blue-300 dark:border-gray-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 text-center"
                  >
                    Help Center
                  </Link>
                  <button
                    onClick={toggleDarkMode}
                    className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-blue-600 bg-white dark:bg-gray-800 border border-blue-300 dark:border-gray-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2 ring-1 ring-gray-700"
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
                  </button>

                </div>
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}


// Removed unused InputField to fix unused variable error