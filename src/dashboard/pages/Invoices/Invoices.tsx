import { useState } from 'react';
import InvoicesHeader from './InvoicesHeader';
import InvoicesStats from './InvoicesStats';
import InvoicesToolbar, { type InvoiceFilter } from './InvoicesToolbar';
import InvoicesTable from './InvoicesTable';
import CreateInvoiceDrawer from './modals/CreateInvoiceDrawer';

export default function Invoices() {
  const [filter, setFilter] = useState<InvoiceFilter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleExport = () => {
    // placeholder — wire to real export logic
    alert('Export coming soon');
  };

  return (
    <div className="space-y-5">
      <InvoicesHeader onCreate={() => setDrawerOpen(true)} onExport={handleExport} />
      <InvoicesStats />
      <InvoicesToolbar filter={filter} onFilter={setFilter} />
      <InvoicesTable filter={filter} />
      <CreateInvoiceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
