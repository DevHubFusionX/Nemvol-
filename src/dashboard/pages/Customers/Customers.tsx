import { useState } from 'react';
import CustomersHeader from './CustomersHeader';
import CustomersStats from './CustomersStats';
import CustomersCharts from './CustomersCharts';
import CustomersToolbar, { type CustomerFilter } from './CustomersToolbar';
import CustomersTable from './CustomersTable';

export default function Customers() {
  const [filter, setFilter] = useState<CustomerFilter>('all');

  return (
    <div className="space-y-5">
      <CustomersHeader />
      <CustomersStats />
      <CustomersCharts />
      <CustomersToolbar filter={filter} onFilter={setFilter} />
      <CustomersTable />
    </div>
  );
}
