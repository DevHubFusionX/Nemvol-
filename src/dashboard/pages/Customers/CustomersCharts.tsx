import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCustomers } from '../../../hooks/useCustomers';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function CustomersCharts() {
  const { data } = useCustomers();
  const customers = data?.data ?? [];

  // New customers per month (current year)
  const monthlyData = useMemo(() => {
    const counts: Record<number, number> = {};
    const year = new Date().getFullYear();
    customers.forEach(c => {
      const d = new Date(c.createdAt);
      if (d.getFullYear() === year) {
        counts[d.getMonth()] = (counts[d.getMonth()] ?? 0) + 1;
      }
    });
    return MONTHS.map((m, i) => ({ month: m, count: counts[i] ?? 0 }));
  }, [customers]);

  // Top 5 spenders
  const topSpenders = useMemo(() =>
    [...customers]
      .sort((a, b) => parseFloat(b.totalSpent) - parseFloat(a.totalSpent))
      .slice(0, 5),
    [customers]
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
      {/* New customers per month */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-[14px] font-semibold text-slate-900">New Customers</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Monthly signups — {new Date().getFullYear()}</p>
          </div>
          <span className="text-[12px] font-semibold text-slate-400 self-start">
            {customers.length} total
          </span>
        </div>

        {customers.length === 0 ? (
          <div className="h-36 border border-dashed border-slate-200 rounded-lg flex items-center justify-center">
            <p className="text-[12px] text-slate-400">No customer data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={144}>
            <BarChart data={monthlyData} barSize={18} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: 'none' }}
                formatter={(v) => [Number(v ?? 0), 'New customers']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {monthlyData.map((_, i) => (
                  <Cell key={i} fill={i === new Date().getMonth() ? '#0f172a' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top spenders */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <p className="text-[14px] font-semibold text-slate-900">Top Spenders</p>
        <p className="text-[11px] text-slate-400 mt-0.5 mb-4">By total order value</p>

        {topSpenders.length === 0 ? (
          <div className="h-36 border border-dashed border-slate-200 rounded-lg flex items-center justify-center">
            <p className="text-[11px] text-slate-400">No data yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topSpenders.map((c, i) => {
              const name = [c.firstName, c.lastName].filter(Boolean).join(' ') || c.email || 'Unknown';
              const maxSpent = parseFloat(topSpenders[0].totalSpent) || 1;
              const pct = (parseFloat(c.totalSpent) / maxSpent) * 100;
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 w-4">{i + 1}</span>
                      <span className="text-[12px] font-semibold text-slate-800 truncate max-w-[140px]">{name}</span>
                    </div>
                    <span className="text-[12px] font-bold text-slate-900">
                      ₦{parseFloat(c.totalSpent).toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
