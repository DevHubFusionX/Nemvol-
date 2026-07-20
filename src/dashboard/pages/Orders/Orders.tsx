import { useState } from 'react';
import OrdersHeader from './OrdersHeader';
import OrdersStats from './OrdersStats';
import OrdersToolbar from './OrdersToolbar';
import OrdersTable from './OrdersTable';
import CreateOrderDrawer from './modals/CreateOrderDrawer';
import { useDebounce } from '../../../hooks/useDebounce';

type Filter = 'all' | 'paid' | 'unpaid';

export default function Orders() {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const debouncedSearch = useDebounce(search);

  const statusParam = filter === 'paid' ? 'delivered' : filter === 'unpaid' ? 'pending' : undefined;

  return (
    <div className="space-y-5">
      <OrdersHeader onCreateOrder={() => setDrawerOpen(true)} />
      <OrdersStats />
      <OrdersToolbar filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />
      <OrdersTable status={statusParam} q={debouncedSearch} />
      <CreateOrderDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
