import { useState } from 'react';
import PurchasesHeader from './PurchasesHeader';
import PurchasesStats from './PurchasesStats';
import PurchasesTabs, { type PurchaseTab } from './PurchasesTabs';
import PurchasesToolbar from './PurchasesToolbar';
import PurchasesTable from './PurchasesTable';
import SuppliersView from './SuppliersView';
import AddPurchaseDrawer from './modals/AddPurchaseDrawer';
import AddSupplierDrawer from './modals/AddSupplierDrawer';
import { useDebounce } from '../../../hooks/useDebounce';

type StatusFilter = 'all' | 'pending' | 'completed';

export default function Purchases() {
  const [tab, setTab] = useState<PurchaseTab>('purchases');
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const debouncedSearch = useDebounce(search);

  return (
    <div className="space-y-5">
      <PurchasesHeader onAddPurchase={() => setPurchaseOpen(true)} />
      <PurchasesStats />
      <PurchasesTabs active={tab} onChange={setTab} />

      {tab === 'purchases' && (
        <>
          <PurchasesToolbar filter={filter} onFilter={setFilter} search={search} onSearch={setSearch} />
          <PurchasesTable filter={filter} search={debouncedSearch} />
        </>
      )}

      {tab === 'suppliers' && <SuppliersView onAddSupplier={() => setSupplierOpen(true)} />}

      <AddPurchaseDrawer open={purchaseOpen} onClose={() => setPurchaseOpen(false)} />
      <AddSupplierDrawer open={supplierOpen} onClose={() => setSupplierOpen(false)} />
    </div>
  );
}
