import { useState } from 'react';
import CustomersHeader from './CustomersHeader';
import CustomersStats from './CustomersStats';
import CustomersCharts from './CustomersCharts';
import CustomersToolbar, { type CustomerFilter } from './CustomersToolbar';
import CustomersTable from './CustomersTable';
import AddCustomerDrawer from './modals/AddCustomerDrawer';
import ManageCsvDrawer from './modals/ManageCsvDrawer';

export default function Customers() {
  const [filter, setFilter] = useState<CustomerFilter>('all');
  const [customerOpen, setCustomerOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);

  return (
    <div className="space-y-5">
      <CustomersHeader onAddCustomer={() => setCustomerOpen(true)} onManageCsv={() => setCsvOpen(true)} />
      <CustomersStats />
      <CustomersCharts />
      <CustomersToolbar filter={filter} onFilter={setFilter} />
      <CustomersTable />

      <AddCustomerDrawer open={customerOpen} onClose={() => setCustomerOpen(false)} />
      <ManageCsvDrawer open={csvOpen} onClose={() => setCsvOpen(false)} />
    </div>
  );
}
