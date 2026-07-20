import { ShoppingBag, CheckCircle } from 'lucide-react';
import { useOrders } from '../../../hooks/useOrders';

export default function OrdersStats() {
  const { data } = useOrders();
  const orders = data?.data ?? [];
  const total = orders.length;
  const completed = orders.filter(o => o.status === 'delivered').length;

  const stats = [
    { label: 'Total Orders',     value: total,     icon: ShoppingBag  },
    { label: 'Completed Orders', value: completed, icon: CheckCircle  },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
