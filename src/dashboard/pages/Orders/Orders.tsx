import { useState } from 'react';
import OrdersHeader from './OrdersHeader';
import OrdersStats from './OrdersStats';
import OrdersToolbar from './OrdersToolbar';
import OrdersTable from './OrdersTable';
import CreateOrderDrawer from './modals/CreateOrderDrawer';

type Filter = 'all' | 'paid' | 'unpaid';

export default function Orders() {
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-5">
      <OrdersHeader onCreateOrder={() => setDrawerOpen(true)} />
      <OrdersStats />
      <OrdersToolbar filter={filter} onFilter={setFilter} />
      <OrdersTable />
      <CreateOrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
