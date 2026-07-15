import { useState } from 'react';
import PaymentsHeader from './PaymentsHeader';
import PaymentsStats from './PaymentsStats';
import PaymentsTabs, { type PaymentTab } from './PaymentsTabs';
import PaymentsToolbar, { type PaymentFilter } from './PaymentsToolbar';
import PaymentsTable from './PaymentsTable';
import PaymentMethodsTable from './PaymentMethodsTable';
import ExpensesView from './ExpensesView';

export default function Payments() {
  const [tab, setTab] = useState<PaymentTab>('payments');
  const [filter, setFilter] = useState<PaymentFilter>('all');

  return (
    <div className="space-y-5">
      <PaymentsHeader />
      <PaymentsStats />
      <PaymentsTabs active={tab} onChange={setTab} />

      {tab === 'payments' && (
        <>
          <PaymentMethodsTable />
          <div className="pt-2">
            <p className="text-[13px] font-semibold text-slate-700 mb-3">Transaction History</p>
            <PaymentsToolbar filter={filter} onFilter={setFilter} />
            <div className="mt-4">
              <PaymentsTable />
            </div>
          </div>
        </>
      )}

      {tab === 'expenses' && <ExpensesView />}
    </div>
  );
}
