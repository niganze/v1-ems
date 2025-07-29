import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

const LayoutDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header Navigation */}
        <Header onMenuClick={handleMenuClick} />

        {/* Main Dashboard Content */}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutDash;