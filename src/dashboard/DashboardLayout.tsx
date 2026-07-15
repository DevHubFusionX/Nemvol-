import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import { AddProductProvider } from './modals/AddProductContext';
import { PlanGateProvider, usePlanGate } from './PlanGate/PlanGateContext';
import PlanGate from './PlanGate/PlanGate';

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { needsGate, isTrialExpired } = usePlanGate();
  const location = useLocation();

  const isProfile = location.pathname === '/dashboard/profile';
  const showGate = needsGate && !isProfile;

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className={`relative flex-1 bg-slate-50 ${showGate ? 'overflow-hidden' : 'overflow-y-auto'} p-4 lg:p-6`}>
          <Outlet />
          {showGate && <PlanGate expired={isTrialExpired} />}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <AddProductProvider>
      <PlanGateProvider>
        <DashboardContent />
      </PlanGateProvider>
    </AddProductProvider>
  );
}
