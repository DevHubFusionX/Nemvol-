const months = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];

export default function CustomersCharts() {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-4">
      {/* New vs Returning */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[14px] font-semibold text-slate-900">New vs Returning Customers</p>
            <p className="text-[11px] text-slate-400 mt-0.5">January – Present</p>
          </div>
          <select className="text-[12px] border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 outline-none bg-white">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>

        {/* Chart placeholder */}
        <div className="relative h-36 border border-dashed border-slate-200 rounded-lg flex items-end px-4 pb-2 gap-2">
          {months.map((m) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full h-1 bg-slate-100 rounded" />
              <span className="text-[10px] text-slate-400">{m}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 inline-block" />
            New Customer
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" />
            Returning Customer
          </div>
        </div>
      </div>

      {/* Segmentation */}
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <p className="text-[14px] font-semibold text-slate-900">Customer Segmentation</p>
        <p className="text-[11px] text-slate-400 mt-0.5 mb-4">January – Present</p>
        <div className="flex items-center justify-center h-36 border border-dashed border-slate-200 rounded-lg">
          <p className="text-[11px] text-slate-400">No segmentation data yet</p>
        </div>
      </div>
    </div>
  );
}
