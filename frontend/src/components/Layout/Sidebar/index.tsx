// src/components/Sidebar.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, FileText, Users, Settings as SettingsIcon, ChevronLeft, HelpCircle,
  Sun, Moon, CreditCard, User, Package, BarChart2, Calendar, LayoutDashboard,
  Zap, DollarSign, BookOpen, MessageSquareMore, Bell, ListChecks,
  FolderClock, UsersRound
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, isMobile, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const navGroups = [
    {
      title: 'General',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} />, roles: ['admin', 'cliente'] },
        { path: '/profile', label: 'Perfil', icon: <User size={20} />, roles: ['admin'] },
        { path: '/notifications', label: 'Notificaciones', icon: <Bell size={20} />, roles: ['admin'] },
      ]
    },
    {
      title: 'Gestión',
      items: [
        { path: '/invoices', label: 'Facturas', icon: <FileText size={20} />, roles: ['admin','cliente'] },
        { path: '/contacts', label: 'Contactos', icon: <Users size={20} />, roles: ['admin'] },
        { path: '/sales', label: 'Ventas', icon: <CreditCard size={20} />, roles: ['admin'] },
        { path: '/products', label: 'Productos', icon: <Package size={20} />, roles: ['admin'] },
        { path: '/reports', label: 'Informes', icon: <BarChart2 size={20} />, roles: ['admin'] },
        { path: '/calendar', label: 'Calendario', icon: <Calendar size={20} />, roles: ['admin'] },
        { path: '/tasks', label: 'Tareas', icon: <ListChecks size={20} />, roles: ['admin'] }
      ]
    },
    {
      title: 'Administración',
      items: [
        { path: '/admin-dashboard', label: 'Panel de administración', icon: <LayoutDashboard size={20} />, roles: ['admin'] },
        { path: '/user-management', label: 'Gestión de usuarios', icon: <Users size={20} />, roles: ['admin'] },
        { path: '/users', label: 'Usuarios / Equipo', icon: <UsersRound size={20} />, roles: ['admin'] },
        { path: '/plans', label: 'Planes y precios', icon: <DollarSign size={20} />, roles: ['admin'] },
      ]
    },
    {
      title: 'Configuración',
      items: [
        { path: '/settings', label: 'Ajustes', icon: <SettingsIcon size={20} />, roles: ['admin'] },
        { path: '/billing', label: 'Facturación', icon: <DollarSign size={20} />, roles: ['admin'] },
        { path: '/integrations', label: 'Integraciones', icon: <Zap size={20} />, roles: ['admin'] },
        { path: '/logs', label: 'Registros', icon: <FolderClock size={20} />, roles: ['admin'] },
      ]
    },
    {
      title: 'Ayuda y Recursos',
      items: [
        { path: '/help', label: 'Centro de ayuda', icon: <HelpCircle size={20} />, roles: ['admin'] },
        { path: '/tutorials', label: 'Tutoriales', icon: <BookOpen size={20} />, roles: ['admin'] },
        { path: '/feedback', label: 'Comentario', icon: <MessageSquareMore size={20} />, roles: ['admin'] },
      ]
    }
  ];

  const sidebarClasses = `
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    h-screen border-r border-gray-200 dark:border-gray-700
    transition-all duration-300
    ${isOpen ? 'w-64' : 'w-0 sm:w-16'}
    ${isMobile && !isOpen ? 'hidden' : 'fixed sm:relative'}
    z-20
  `;

  const contentClasses = `
    flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
    ${isOpen ? 'opacity-100' : 'opacity-0 sm:opacity-100'}
  `;

  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden
    ${isMobile && isOpen ? 'block' : 'hidden'}
  `;

  return (
    <>
      <div className={overlayClasses.trim()} onClick={toggleSidebar} />
      <aside className={sidebarClasses.trim()}>
        <div className={contentClasses.trim()}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {isOpen ? 'Zowu' : 'Z'}
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-6">
            {navGroups.map(group => (
              <div key={group.title}>
                {isOpen && <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide px-2 mb-1">{group.title}</p>}
                {group.items
                  .filter(item => item.roles.includes(user?.role ?? ''))
                  .map(item => {
                    const active = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          active
                            ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {isOpen && <span>{item.label}</span>}
                      </Link>
                    );
                  })}
              </div>
            ))}
          </nav>

          {isOpen && (
            <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                <div className="flex items-center mb-2">
                  <HelpCircle size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Need help?</h3>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Check our help center or contact support.
                </p>
                <Link
                  to="/help"
                  className="mt-2 block w-full px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-white bg-white dark:bg-gray-800 border border-blue-300 dark:border-gray-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 text-center"
                >
                  Help Center
                </Link>
                <button
                  onClick={toggleDarkMode}
                  className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-white bg-white dark:bg-gray-800 border border-blue-300 dark:border-gray-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2 ring-1 ring-gray-700"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}