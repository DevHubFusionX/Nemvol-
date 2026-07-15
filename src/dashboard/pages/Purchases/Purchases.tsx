import { useState } from 'react';
import PurchasesHeader from './PurchasesHeader';
import PurchasesStats from './PurchasesStats';
import PurchasesTabs, { type PurchaseTab } from './PurchasesTabs';
import PurchasesToolbar from './PurchasesToolbar';
import PurchasesTable from './PurchasesTable';
import SuppliersView from './SuppliersView';

type StatusFilter = 'all' | 'pending' | 'completed';

export default function Purchases() {
  const [tab, setTab] = useState<PurchaseTab>('purchases');
  const [filter, setFilter] = useState<StatusFilter>('all');

  return (
    <div className="space-y-5">
      <PurchasesHeader />
      <PurchasesStats />
      <PurchasesTabs active={tab} onChange={setTab} />

      {tab === 'purchases' && (
        <>
          <PurchasesToolbar filter={filter} onFilter={setFilter} />
          <PurchasesTable />
        </>
      )}

      {tab === 'suppliers' && <SuppliersView />}
    </div>
  );
}
