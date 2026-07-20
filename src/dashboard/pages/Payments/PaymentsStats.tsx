import { TrendingUp, TrendingDown, Banknote, Clock, CheckCircle, XCircle } from 'lucide-react'
import { usePaymentStats } from '../../../hooks/usePayments'

const fmt = (n: number) =>
  '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 0 })

export default function PaymentsStats() {
  const { data } = usePaymentStats()

  const stats = [
    { label: 'Total Revenue',        value: fmt(data?.totalRevenue ?? 0),    icon: Banknote,     up: true },
    { label: 'Pending Payouts',      value: fmt(data?.pendingPayouts ?? 0),  icon: Clock,        up: false },
    { label: 'Completed Payouts',    value: fmt(data?.completedPayouts ?? 0),icon: CheckCircle,  up: true },
    { label: 'Failed Transactions',  value: String(data?.failedCount ?? 0),  icon: XCircle,      up: data?.failedCount === 0 },
  ]

  return (
    <div
      className="flex lg:grid lg:grid-cols-4 gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory pb-1"
      style={{ scrollbarWidth: 'none' }}
    >
      {stats.map(({ label, value, icon: Icon, up }) => (
        <div key={label} className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-auto bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
              <Icon size={16} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <span className={`flex items-center gap-0.5 text-[11px] font-medium ${up ? 'text-emerald-500' : 'text-red-400'}`}>
              {up ? <TrendingUp size={11} strokeWidth={2} /> : <TrendingDown size={11} strokeWidth={2} />}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-1">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  )
}
