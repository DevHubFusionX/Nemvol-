import { useState, useEffect } from 'react'
import { Package, LogOut, ArrowLeft, MapPin, Calendar, Hash } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStorefront } from '../useStorefront'
import PageTransition from '../ui/PageTransition'
import { useFormatPrice } from '../../hooks/useFormatPrice'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

interface OrderLine {
  id: string
  productName: string
  variantLabel?: string | null
  quantity: string
  unitPrice: string
  lineTotal: string
  imageUrl?: string | null
}

interface Order {
  id: string
  orderNumber: string
  status: string
  subtotal: string
  shippingCost: string
  total: string
  currency: string
  shippingAddress?: string | null
  createdAt: string
  lines: OrderLine[]
}

const STATUS_COLOR: Record<string, string> = {
  pending:    'text-amber-600 bg-amber-50 border-amber-100',
  confirmed:  'text-blue-600 bg-blue-50 border-blue-100',
  processing: 'text-violet-600 bg-violet-50 border-violet-100',
  shipped:    'text-indigo-600 bg-indigo-50 border-indigo-100',
  delivered:  'text-green-600 bg-green-50 border-green-100',
  cancelled:  'text-red-500 bg-red-50 border-red-100',
  refunded:   'text-stone-500 bg-stone-100 border-stone-200',
}

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

function OrderDetailPanel({ order, onClose }: { order: Order; onClose: () => void }) {
  const formatPrice = useFormatPrice()
  const stepIndex = STATUS_STEPS.indexOf(order.status)
  const isCancelled = order.status === 'cancelled' || order.status === 'refunded'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-stone-700"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-stone-900">Order #{order.orderNumber}</p>
          <p className="text-xs text-stone-400">
            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 border rounded-full ${STATUS_COLOR[order.status] ?? 'text-stone-500 bg-stone-100 border-stone-200'}`}>
          {order.status}
        </span>
      </div>

      {/* Progress tracker */}
      {!isCancelled && (
        <div className="bg-stone-50 border border-stone-100 rounded-xl p-4">
          <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-4">Order Progress</p>
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                    i <= stepIndex
                      ? 'bg-stone-900 border-stone-900'
                      : 'bg-white border-stone-200'
                  }`}>
                    {i < stepIndex && (
                      <svg viewBox="0 0 10 10" className="w-3 h-3 fill-white">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {i === stepIndex && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className={`text-[9px] uppercase tracking-wide whitespace-nowrap ${i <= stepIndex ? 'text-stone-700 font-medium' : 'text-stone-300'}`}>
                    {step}
                  </span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-1 mb-4 ${i < stepIndex ? 'bg-stone-900' : 'bg-stone-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items */}
      <div>
        <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-3">Items Ordered</p>
        <div className="flex flex-col gap-3">
          {order.lines.map((line) => (
            <div key={line.id} className="flex gap-4 p-3 border border-stone-100 bg-white rounded-lg">
              {/* Image */}
              <div className="w-16 h-16 bg-stone-100 rounded-md shrink-0 overflow-hidden flex items-center justify-center">
                {line.imageUrl
                  ? <img src={line.imageUrl} alt={line.productName} className="w-full h-full object-cover" />
                  : <Package size={18} strokeWidth={1} className="text-stone-300" />
                }
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-900 truncate">{line.productName}</p>
                  {line.variantLabel && (
                    <p className="text-xs text-stone-400 mt-0.5">{line.variantLabel}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-stone-400">Qty: {line.quantity}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-900">{formatPrice(parseFloat(line.lineTotal))}</p>
                    <p className="text-[10px] text-stone-400">{formatPrice(parseFloat(line.unitPrice))} each</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="border border-stone-100 rounded-xl overflow-hidden">
        <p className="text-[10px] tracking-widest text-stone-400 uppercase px-4 pt-4 pb-3 border-b border-stone-100">Order Summary</p>
        <div className="px-4 py-3 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-stone-500">
            <span>Subtotal</span>
            <span>{formatPrice(parseFloat(order.subtotal))}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500">
            <span>Shipping</span>
            <span>{parseFloat(order.shippingCost) === 0 ? 'Free' : formatPrice(parseFloat(order.shippingCost))}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-stone-900 border-t border-stone-100 pt-2 mt-1">
            <span>Total</span>
            <span>{formatPrice(parseFloat(order.total))}</span>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      {order.shippingAddress && (
        <div className="flex gap-3 p-4 border border-stone-100 rounded-xl bg-stone-50">
          <MapPin size={14} strokeWidth={1.5} className="text-stone-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-1">Shipping Address</p>
            <p className="text-xs text-stone-600 leading-relaxed">{order.shippingAddress}</p>
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-col gap-2 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <Hash size={11} strokeWidth={1.5} />
          <span>Order ID: {order.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={11} strokeWidth={1.5} />
          <span>Placed on {new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function AccountPage() {
  const { customer, logout, go, slug } = useStorefront()
  const formatPrice = useFormatPrice()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [fetched, setFetched] = useState(false)
  const [selected, setSelected] = useState<Order | null>(null)

  if (!customer) {
    go('login')
    return null
  }

  async function fetchOrders() {
    setLoadingOrders(true)
    try {
      const res = await fetch(
        `${API_BASE}/public/store/${slug}/orders?email=${encodeURIComponent(customer?.email ?? '')}`,
      )
      if (res.ok) {
        const json = await res.json()
        setOrders(json.data ?? [])
      }
    } catch { /* ignore */ }
    setFetched(true)
    setLoadingOrders(false)
  }

  useEffect(() => {
    if (customer?.email) fetchOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.email])

  const initials = customer.firstName
    ? customer.firstName[0].toUpperCase()
    : (customer.email?.[0] ?? 'U').toUpperCase()

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-24">

        {/* Profile header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center shrink-0">
            <span className="text-white text-lg font-light">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-light text-stone-900 truncate">
              {customer.firstName ? `Hi, ${customer.firstName}` : 'My Account'}
            </p>
            <p className="text-xs text-stone-400 truncate">{customer.email}</p>
          </div>
          <button
            onClick={() => { logout(); go() }}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors shrink-0"
          >
            <LogOut size={13} strokeWidth={1.5} />
            Sign out
          </button>
        </div>

        {/* Order detail or list */}
        <AnimatePresence mode="wait">
          {selected ? (
            <OrderDetailPanel key="detail" order={selected} onClose={() => setSelected(null)} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                <Package size={15} strokeWidth={1.5} className="text-stone-400" />
                <p className="text-sm font-medium text-stone-900">Your Orders</p>
                {orders.length > 0 && (
                  <span className="ml-auto text-xs text-stone-400">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
                )}
              </div>

              {loadingOrders && (
                <div className="flex justify-center py-12">
                  <span className="w-5 h-5 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
                </div>
              )}

              {fetched && orders.length === 0 && (
                <div className="text-center py-16">
                  <Package size={32} strokeWidth={1} className="text-stone-200 mx-auto mb-4" />
                  <p className="text-sm text-stone-400">No orders yet.</p>
                  <button
                    onClick={() => go('products')}
                    className="mt-4 text-xs underline underline-offset-2 text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    Start shopping
                  </button>
                </div>
              )}

              {orders.length > 0 && (
                <div className="flex flex-col gap-2">
                  {orders.map((order, i) => (
                    <motion.button
                      key={order.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelected(order)}
                      className="w-full text-left border border-stone-100 bg-white hover:border-stone-300 hover:shadow-sm transition-all rounded-lg overflow-hidden"
                    >
                      {/* Product image strip */}
                      {order.lines.length > 0 && (
                        <div className="flex gap-0 border-b border-stone-100">
                          {order.lines.slice(0, 4).map((line, j) => (
                            <div key={j} className="w-16 h-16 bg-stone-100 shrink-0 overflow-hidden flex items-center justify-center border-r border-stone-100 last:border-r-0">
                              {line.imageUrl
                                ? <img src={line.imageUrl} alt={line.productName} className="w-full h-full object-cover" />
                                : <Package size={14} strokeWidth={1} className="text-stone-300" />
                              }
                            </div>
                          ))}
                          {order.lines.length > 4 && (
                            <div className="w-16 h-16 bg-stone-50 shrink-0 flex items-center justify-center border-r border-stone-100">
                              <span className="text-xs text-stone-400">+{order.lines.length - 4}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Order info row */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-stone-900">#{order.orderNumber}</p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {' · '}{order.lines.length} item{order.lines.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-stone-900">{formatPrice(parseFloat(order.total))}</p>
                            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 border rounded-full ${STATUS_COLOR[order.status] ?? 'text-stone-500 bg-stone-100 border-stone-200'}`}>
                              {order.status}
                            </span>
                          </div>
                          <svg viewBox="0 0 16 16" className="w-4 h-4 text-stone-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
