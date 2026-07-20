import { TrendingUp, Users, ShoppingBag } from 'lucide-react';
import { useCustomers } from '../../../hooks/useCustomers';
import { useOrders } from '../../../hooks/useOrders';

export default function CustomersStats() {
  const { data } = useCustomers();
  const { data: ordersData } = useOrders();

  const total   = data?.total ?? 0;
  // "active" = customers who have at least 1 order
  const withOrders = new Set(
    (ordersData?.data ?? []).map(o => o.customerId).filter(Boolean)
  ).size;

  const stats = [
    { label: 'Total Customers',  value: String(total),      icon: Users,       change: null },
    { label: 'Active Customers', value: String(withOrders), icon: ShoppingBag, change: null },
  ];

  return (
    <div
      className="flex sm:grid sm:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="snap-start shrink-0 w-[82%] sm:w-auto bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-slate-400" strokeWidth={1.6} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-medium text-emerald-500">
            <TrendingUp size={11} strokeWidth={2} />
            Live count
          </div>
        </div>
      ))}
    </div>
  );
}
