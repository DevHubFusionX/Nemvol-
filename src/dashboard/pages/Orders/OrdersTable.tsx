import { useState } from 'react';
import { PackageOpen, X, MapPin, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOrders, useUpdateOrderStatus, type Order } from '../../../hooks/useOrders';
import { useStore } from '../../../hooks/useStore';

const STATUS_STYLES: Record<string, string> = {
  pending:    'bg-amber-50 text-amber-600',
  confirmed:  'bg-blue-50 text-blue-600',
  processing: 'bg-violet-50 text-violet-600',
  shipped:    'bg-sky-50 text-sky-600',
  delivered:  'bg-emerald-50 text-emerald-600',
  cancelled:  'bg-red-50 text-red-500',
  refunded:   'bg-slate-100 text-slate-400',
};

const NEXT_STATUS: Record<string, string> = {
  pending: 'confirmed', confirmed: 'processing', processing: 'shipped', shipped: 'delivered',
};

const ALL_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

function customerName(order: Order): string {
  const c = order.customer;
  if (!c) return '—';
  const name = [c.firstName, c.lastName].filter(Boolean).join(' ');
  return name || c.email || '—';
}

function OrderDetailDrawer({ order, onClose, currency }: { order: Order; onClose: () => void; currency: string }) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-[100] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
        <div>
          <p className="text-[15px] font-bold text-slate-900">#{order.orderNumber}</p>
          <p className="text-[12px] text-slate-400 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-slate-100 text-slate-400'}`}>
            {order.status}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <X size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

        {/* Customer */}
        {order.customer && (
          <div className="rounded-xl border border-slate-100 p-4 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">Customer</p>
            <p className="text-[13px] font-semibold text-slate-800">{customerName(order)}</p>
            {order.customer.email && <p className="text-[12px] text-slate-400">{order.customer.email}</p>}
            {order.customer.phone && <p className="text-[12px] text-slate-400">{order.customer.phone}</p>}
          </div>
        )}

        {/* Line items */}
        <div className="rounded-xl border border-slate-100 overflow-hidden">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-4 pt-4 pb-3 border-b border-slate-100">
            Items ({order.lines.length})
          </p>
          <div className="divide-y divide-slate-100">
            {order.lines.map(line => (
              <div key={line.id} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-slate-800 truncate">{line.productName}</p>
                  {line.variantLabel && <p className="text-[11px] text-slate-400 mt-0.5">{line.variantLabel}</p>}
                  <p className="text-[11px] text-slate-400 mt-0.5">Qty: {line.quantity} × {currency}{parseFloat(line.unitPrice).toLocaleString()}</p>
                </div>
                <p className="text-[13px] font-semibold text-slate-800 shrink-0 ml-3">
                  {currency}{parseFloat(line.lineTotal).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-slate-100 space-y-1.5">
            <div className="flex justify-between text-[12px] text-slate-400">
              <span>Subtotal</span><span>{currency}{parseFloat(order.subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[12px] text-slate-400">
              <span>Shipping</span>
              <span>{parseFloat(order.shippingCost) === 0 ? 'Free' : `${currency}${parseFloat(order.shippingCost).toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between text-[14px] font-bold text-slate-900 pt-1 border-t border-slate-100">
              <span>Total</span><span>{currency}{parseFloat(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        {order.shippingAddress && (
          <div className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
            <MapPin size={13} strokeWidth={1.5} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Shipping Address</p>
              <p className="text-[12px] text-slate-600 leading-relaxed">{order.shippingAddress}</p>
            </div>
          </div>
        )}

        {/* Notes */}
        {order.notes && (
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Notes</p>
            <p className="text-[12px] text-slate-600 leading-relaxed">{order.notes}</p>
          </div>
        )}

        {/* Update status */}
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">Update Status</p>
          <div className="flex flex-wrap gap-2">
            {ALL_STATUSES.map(s => (
              <button
                key={s}
                disabled={order.status === s || isPending}
                onClick={() => updateStatus({ id: order.id, status: s })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  order.status === s
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface Props { status?: string; q?: string }

export default function OrdersTable({ status, q }: Props) {
  const { data, isLoading } = useOrders({ status, q });
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { data: store } = useStore();
  const [selected, setSelected] = useState<Order | null>(null);
  const orders = data?.data ?? [];
  const currency = store?.currency ?? '₦';

  if (isLoading) return (
    <div className="bg-white rounded-xl border border-slate-100 flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-[1.5fr_1.5fr_1fr_0.5fr_1fr_1fr_1fr] px-5 py-3 border-b border-slate-100">
          {['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Action'].map(col => (
            <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <PackageOpen size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-slate-800">No orders found</p>
            <p className="text-[12px] text-slate-400 text-center max-w-xs">
              When a customer places an order, it will show up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {orders.map(order => (
              <div key={order.id}>
                {/* Desktop row */}
                <div className="hidden sm:grid grid-cols-[1.5fr_1.5fr_1fr_0.5fr_1fr_1fr_1fr] items-center px-5 py-4">
                  <button
                    onClick={() => setSelected(order)}
                    className="text-[13px] font-semibold text-slate-800 hover:text-blue-600 transition-colors text-left"
                  >
                    {order.orderNumber}
                  </button>
                  <span className="text-[13px] text-slate-600 truncate pr-2">{customerName(order)}</span>
                  <span className="text-[12px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="text-[13px] text-slate-600">{order.lines.length}</span>
                  <span className="text-[13px] font-semibold text-slate-800">{currency}{parseFloat(order.total).toLocaleString()}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit ${STATUS_STYLES[order.status] ?? 'bg-slate-100 text-slate-400'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {order.status}
                  </span>
                  <div className="flex items-center gap-2">
                    {NEXT_STATUS[order.status] ? (
                      <button
                        onClick={() => updateStatus({ id: order.id, status: NEXT_STATUS[order.status] })}
                        className="text-[12px] font-medium text-blue-600 hover:underline"
                      >
                        Mark {NEXT_STATUS[order.status]}
                      </button>
                    ) : <span className="text-[12px] text-slate-300">—</span>}
                    <button onClick={() => setSelected(order)} className="text-slate-300 hover:text-slate-600 transition-colors ml-auto">
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Mobile row */}
                <button
                  onClick={() => setSelected(order)}
                  className="sm:hidden w-full flex items-center justify-between px-4 py-4 text-left"
                >
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{order.orderNumber}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">{customerName(order)} · {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[order.status] ?? 'bg-slate-100 text-slate-400'}`}>
                      {order.status}
                    </span>
                    <span className="text-[13px] font-bold text-slate-800">{currency}{parseFloat(order.total).toLocaleString()}</span>
                    <ChevronRight size={13} strokeWidth={1.5} className="text-slate-300" />
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[99]"
            />
            <OrderDetailDrawer
              order={selected}
              onClose={() => setSelected(null)}
              currency={currency}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
