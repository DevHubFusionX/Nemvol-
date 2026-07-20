import { DollarSign, TrendingUp, Landmark, Users } from 'lucide-react';
import { useOrders } from '../../../hooks/useOrders';
import { useCustomers } from '../../../hooks/useCustomers';

export default function StatCards() {
  const { data: ordersData } = useOrders()
  const { data: customersData } = useCustomers()

  const totalRevenue = ordersData?.data
    .filter(o => o.status !== 'cancelled' && o.status !== 'refunded')
    .reduce((sum, o) => sum + parseFloat(o.total), 0) ?? 0

  const stats = [
    { label: 'Available Balance',  icon: DollarSign, value: `₦${totalRevenue.toLocaleString()}`, sub: 'Total revenue', change: null },
    { label: 'Total Sales',        icon: TrendingUp,  value: `₦${totalRevenue.toLocaleString()}`, sub: 'All time', change: null },
    { label: 'Total Orders',       icon: Landmark,    value: String(ordersData?.total ?? 0), sub: 'All orders' },
    { label: 'Total Customers',    icon: Users,       value: String(customersData?.total ?? 0), sub: 'Registered' },
  ]
  return (
    <>
      {/* Mobile — horizontal snap scroll carousel */}
      <div className="lg:hidden -mx-4 px-4">
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {stats.map(({ label, icon: Icon, value, sub, change }) => (
            <div
              key={label}
              className="snap-start shrink-0 w-[82%] bg-white rounded-xl border border-slate-100 p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Icon size={15} className="text-slate-500" strokeWidth={1.8} />
                </div>
                {change && (
                  <span className="text-[11px] font-semibold text-slate-400">{change}</span>
                )}
              </div>
              <div>
                <p className="text-[11px] text-slate-400 mb-0.5">{label}</p>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-[10px] text-slate-400 mt-1">{sub}</p>
              </div>
            </div>
          ))}
          {/* Trailing spacer so last card doesn't hug the edge */}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* Desktop — 4-column grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {stats.map(({ label, icon: Icon, value, sub, change }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                <Icon size={16} className="text-slate-500" strokeWidth={1.8} />
              </div>
              {change && (
                <span className="text-[11px] font-semibold text-slate-400">{change}</span>
              )}
            </div>
            <div>
              <p className="text-[12px] text-slate-400 mb-1">{label}</p>
              <p className="text-xl font-bold text-slate-900">{value}</p>
              <p className="text-[11px] text-slate-400 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
