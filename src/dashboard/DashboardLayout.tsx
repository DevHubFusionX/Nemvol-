import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import { AddProductProvider } from './modals/AddProductContext';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AddProductProvider>
      <div className="flex h-screen overflow-hidden bg-white">
        <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AddProductProvider>
  );
}
