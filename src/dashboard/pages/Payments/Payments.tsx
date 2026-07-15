import { useState } from 'react';
import PaymentsHeader from './PaymentsHeader';
import PaymentsStats from './PaymentsStats';
import PaymentsTabs, { type PaymentTab } from './PaymentsTabs';
import PaymentsToolbar, { type PaymentFilter } from './PaymentsToolbar';
import PaymentsTable from './PaymentsTable';
import PaymentMethodsTable from './PaymentMethodsTable';
import ExpensesView from './ExpensesView';
import SetPaymentMethodDrawer from './modals/SetPaymentMethodDrawer';
import LogExpenseDrawer from './modals/LogExpenseDrawer';

type PaymentMethodId = 'cards' | 'transfer' | 'pod';

export default function Payments() {
  const [tab, setTab] = useState<PaymentTab>('payments');
  const [filter, setFilter] = useState<PaymentFilter>('all');
  const [methodOpen, setMethodOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [initialMethod, setInitialMethod] = useState<PaymentMethodId>('transfer');
  const [enabledMethods, setEnabledMethods] = useState<Record<string, boolean>>({});

  const openPaymentMethod = (method: PaymentMethodId = 'transfer') => {
    setInitialMethod(method);
    setMethodOpen(true);
  };

  const toggleMethod = (method: PaymentMethodId) =>
    setEnabledMethods(prev => ({ ...prev, [method]: !prev[method] }));

  const savePaymentMethod = (method: PaymentMethodId) =>
    setEnabledMethods(prev => ({ ...prev, [method]: true }));

  return (
    <div className="space-y-5">
      <PaymentsHeader onSetPaymentMethod={() => openPaymentMethod()} />
      <PaymentsStats />
      <PaymentsTabs active={tab} onChange={setTab} />

      {tab === 'payments' && (
        <>
          <PaymentMethodsTable
            enabled={enabledMethods}
            onToggleMethod={toggleMethod}
            onSetupMethod={openPaymentMethod}
          />
          <div className="pt-2">
            <p className="text-[13px] font-semibold text-slate-700 mb-3">Transaction History</p>
            <PaymentsToolbar filter={filter} onFilter={setFilter} />
            <div className="mt-4">
              <PaymentsTable />
            </div>
          </div>
        </>
      )}

      {tab === 'expenses' && <ExpensesView onLogExpense={() => setExpenseOpen(true)} />}

      <SetPaymentMethodDrawer
        open={methodOpen}
        initialMethod={initialMethod}
        onSave={savePaymentMethod}
        onClose={() => setMethodOpen(false)}
      />
      <LogExpenseDrawer open={expenseOpen} onClose={() => setExpenseOpen(false)} />
    </div>
  );
}
