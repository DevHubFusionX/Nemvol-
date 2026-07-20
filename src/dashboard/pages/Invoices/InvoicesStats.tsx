import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useInvoiceStats } from '../../../hooks/useInvoices'

const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 0 })

export default function InvoicesStats() {
  const { data } = useInvoiceStats()

  const stats = [
    { label: 'Total Invoices', value: String(data?.total ?? 0),      icon: FileText,     color: 'text-slate-400' },
    { label: 'Paid',           value: fmt(data?.paid ?? 0),           icon: CheckCircle,  color: 'text-emerald-400' },
    { label: 'Unpaid',         value: fmt(data?.unpaid ?? 0),         icon: Clock,        color: 'text-amber-400' },
    { label: 'Overdue',        value: String(data?.overdue ?? 0),     icon: AlertCircle,  color: 'text-red-400' },
  ]

  return (
    <>
      <div className="lg:hidden -mx-4 px-4">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2" style={{ scrollbarWidth: 'none' }}>
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="snap-start shrink-0 w-[72%] bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Icon size={16} className={color} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Icon size={17} className={color} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
