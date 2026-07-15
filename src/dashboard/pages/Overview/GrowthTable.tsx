import { Eye } from 'lucide-react';

const cols = ['Today', 'This Week', 'This Month', 'Year to Date'];

const rows = [
  {
    label: 'Your Orders',
    tag: 'Live Monitor',
    values: ['0', '0', '0', '0'],
  },
  {
    label: 'Revenue from Best-selling',
    tag: 'Live Monitor',
    values: ['—', '0 Units', '₦0', '0 Units'],
  },
];

export default function GrowthTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Recent Growth Updates</p>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Performance metrics across different time periods
          </p>
        </div>
        <button className="text-[12px] font-semibold text-[var(--color-brand-blue)] hover:underline flex items-center gap-1 shrink-0 ml-3">
          View reports →
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[480px] px-4 sm:px-0">
          <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 w-1/3">
              Metrics
            </th>
            {cols.map((c) => (
              <th
                key={c}
                className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 text-center"
              >
                {c}
              </th>
            ))}
            <th className="pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, tag, values }) => (
            <tr key={label} className="border-b border-slate-50 last:border-0">
              <td className="py-4">
                <p className="text-[13px] font-semibold text-slate-800">{label}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">
                  {tag}
                </p>
              </td>
              {values.map((v, i) => (
                <td key={i} className="py-4 text-[13px] text-slate-700 text-center">
                  {v}
                </td>
              ))}
              <td className="py-4 text-center">
                <button className="text-slate-300 hover:text-slate-500 transition-colors">
                  <Eye size={15} strokeWidth={1.8} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
