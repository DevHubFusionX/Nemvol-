import { useState } from 'react';
import InvoicesHeader from './InvoicesHeader';
import InvoicesStats from './InvoicesStats';
import InvoicesToolbar, { type InvoiceFilter } from './InvoicesToolbar';
import InvoicesTable from './InvoicesTable';

export default function Invoices() {
  const [filter, setFilter] = useState<InvoiceFilter>('all');

  return (
    <div className="space-y-5">
      <InvoicesHeader />
      <InvoicesStats />
      <InvoicesToolbar filter={filter} onFilter={setFilter} />
      <InvoicesTable />
    </div>
  );
}
