import { Outlet } from 'react-router-dom';
import Navbar from '../Layout/Navbar/index';
import Sidebar from '../Layout/Sidebar/index';
import { useState, useEffect } from 'react';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="min-w-[1024px] px-4 py-6">
        <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
