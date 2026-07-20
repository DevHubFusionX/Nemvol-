import { useState } from 'react';
import CustomersHeader from './CustomersHeader';
import CustomersStats from './CustomersStats';
import CustomersCharts from './CustomersCharts';
import CustomersToolbar, { type CustomerFilter } from './CustomersToolbar';
import CustomersTable from './CustomersTable';
import AddCustomerDrawer from './modals/AddCustomerDrawer';
import ManageCsvDrawer from './modals/ManageCsvDrawer';
import { useDebounce } from '../../../hooks/useDebounce';

export default function Customers() {
  const [filter, setFilter]       = useState<CustomerFilter>('all');
  const [q, setQ]                 = useState('');
  const [customerOpen, setCustomerOpen] = useState(false);
  const [csvOpen, setCsvOpen]     = useState(false);
  const debouncedQ = useDebounce(q);

  return (
    <div className="space-y-5">
      <CustomersHeader onAddCustomer={() => setCustomerOpen(true)} onManageCsv={() => setCsvOpen(true)} />
      <CustomersStats />
      <CustomersCharts />
      <CustomersToolbar filter={filter} onFilter={setFilter} q={q} onSearch={setQ} />
      <CustomersTable filter={filter} q={debouncedQ} />

      <AddCustomerDrawer open={customerOpen} onClose={() => setCustomerOpen(false)} />
      <ManageCsvDrawer open={csvOpen} onClose={() => setCsvOpen(false)} />
    </div>
  );
}
