import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useQueryClient, useIsFetching } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar/Sidebar';
import TopBar from './TopBar/TopBar';
import { AddProductProvider } from './modals/AddProductContext';
import { PlanGateProvider, usePlanGate } from './PlanGate/PlanGateContext';
import PlanGate from './PlanGate/PlanGate';
import { api } from '../lib/api';
import { ProgressBar, ShoppingBagLoader } from '../components/ui/LoadingSpinner';

function DashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { needsGate, isTrialExpired } = usePlanGate();
  const location = useLocation();
  const qc = useQueryClient();
  const isFetching = useIsFetching();
  const [isNavigating, setIsNavigating] = useState(false);

  const isProfile = location.pathname === '/dashboard/profile';
  const showGate = needsGate && !isProfile;

  // Trigger navigation animation when path changes
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Fix 3: prefetch critical data on layout mount so pages render with data already in cache
  useEffect(() => {
    qc.prefetchQuery({ queryKey: ['orders', undefined],      queryFn: () => api.get('/orders').then(r => r.data) })
    qc.prefetchQuery({ queryKey: ['store'],                  queryFn: () => api.get('/store').then(r => r.data) })
    qc.prefetchQuery({ queryKey: ['customers', undefined],   queryFn: () => api.get('/customers').then(r => r.data) })
    qc.prefetchQuery({ queryKey: ['products', undefined],    queryFn: () => api.get('/products').then(r => r.data) })
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <ProgressBar isAnimating={isNavigating || isFetching > 0} />
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className={`relative flex-1 bg-slate-50 ${showGate ? 'overflow-hidden' : 'overflow-y-auto'} p-4 lg:p-6`}>
          <AnimatePresence>
            {isNavigating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-slate-50/40 backdrop-blur-[2px] z-40 flex items-center justify-center"
              >
                <ShoppingBagLoader />
              </motion.div>
            )}
          </AnimatePresence>
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
