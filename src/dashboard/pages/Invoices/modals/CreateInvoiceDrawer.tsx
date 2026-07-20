import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus, Trash2, CheckCircle2, ShoppingBag, FileText } from 'lucide-react'
import { useCreateInvoice } from '../../../../hooks/useInvoices'
import { useOrders, type Order } from '../../../../hooks/useOrders'

interface Props {
  open: boolean
  onClose: () => void
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white'

interface LineItem {
  id: number
  description: string
  qty: string
  price: string
}

type Mode = 'order' | 'manual'

function orderToForm(order: Order) {
  const customerName = [order.customer?.firstName, order.customer?.lastName].filter(Boolean).join(' ') || 'Customer'
  const customerEmail = order.customer?.email ?? ''
  const items: LineItem[] = order.lines.map((l, i) => ({
    id: i + 1,
    description: l.variantLabel ? `${l.productName} (${l.variantLabel})` : l.productName,
    qty: l.quantity,
    price: l.unitPrice,
  }))
  return { customerName, customerEmail, items, total: order.total, orderId: order.id }
}

export default function CreateInvoiceDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)
  const [mode, setMode] = useState<Mode>('order')
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ customerName: '', customerEmail: '', dueDate: '', note: '' })
  const [items, setItems] = useState<LineItem[]>([{ id: 1, description: '', qty: '1', price: '' }])
  const [prefillOrderId, setPrefillOrderId] = useState<string | undefined>()
  const createInvoice = useCreateInvoice()

  // Only fetch delivered/completed orders
  const { data: ordersData, isLoading: ordersLoading } = useOrders({ status: 'delivered' })
  const completedOrders = ordersData?.data ?? []

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }))

  const setItem = (id: number, k: keyof LineItem, v: string) =>
    setItems(p => p.map(i => (i.id === id ? { ...i, [k]: v } : i)))

  const addItem = () => setItems(p => [...p, { id: Date.now(), description: '', qty: '1', price: '' }])
  const removeItem = (id: number) => setItems(p => p.filter(i => i.id !== id))

  const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.price) || 0), 0)

  const reset = () => {
    setDone(false)
    setErrors({})
    setMode('order')
    setForm({ customerName: '', customerEmail: '', dueDate: '', note: '' })
    setItems([{ id: 1, description: '', qty: '1', price: '' }])
    setPrefillOrderId(undefined)
  }

  const handleClose = () => { reset(); onClose() }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const handleSelectOrder = (order: Order) => {
    const prefilled = orderToForm(order)
    setForm(p => ({ ...p, customerName: prefilled.customerName, customerEmail: prefilled.customerEmail }))
    setItems(prefilled.items.length > 0 ? prefilled.items : [{ id: 1, description: '', qty: '1', price: '' }])
    setPrefillOrderId(prefilled.orderId)
    setMode('manual')
  }

  const handleSubmit = () => {
    const errs: Record<string, string> = {}
    if (!form.customerName.trim()) errs.customerName = 'Customer name is required'
    if (!form.customerEmail.trim()) errs.customerEmail = 'Customer email is required'
    if (!form.dueDate) errs.dueDate = 'Due date is required'
    if (items.some(i => !i.description.trim())) errs.items = 'All items need a description'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    if (submitting.current) return
    submitting.current = true

    const lineItemsPayload = items.map(i => ({
      description: i.description,
      qty: parseFloat(i.qty) || 1,
      price: parseFloat(i.price) || 0,
    }))

    createInvoice.mutate({
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      dueDate: form.dueDate,
      total: String(subtotal || 0),
      lineItems: JSON.stringify(lineItemsPayload),
      note: form.note || undefined,
      status: 'draft',
      orderId: prefillOrderId,
    }, { onSuccess: () => setDone(true), onSettled: () => { submitting.current = false } })
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) handleClose() }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            <button onClick={handleClose} className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10">
              <X size={15} strokeWidth={2} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-16 gap-3">
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Invoice created!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      Invoice for <span className="font-semibold text-slate-700">{form.customerName}</span> has been created successfully.
                    </p>
                  </motion.div>
                ) : mode === 'order' ? (
                  <motion.div key="order-picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Create Invoice</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">Pick a completed order or create manually.</p>
                    </div>

                    {/* Mode toggle */}
                    <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                      <button
                        onClick={() => setMode('order')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold bg-slate-900 text-white transition-colors"
                      >
                        <ShoppingBag size={12} strokeWidth={2} /> From Order
                      </button>
                      <button
                        onClick={() => setMode('manual')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                      >
                        <FileText size={12} strokeWidth={2} /> Manual
                      </button>
                    </div>

                    {ordersLoading ? (
                      <div className="flex items-center justify-center py-16">
                        <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
                      </div>
                    ) : completedOrders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                          <ShoppingBag size={20} className="text-slate-300" strokeWidth={1.5} />
                        </div>
                        <p className="text-[13px] font-semibold text-slate-700">No completed orders</p>
                        <p className="text-[12px] text-slate-400 max-w-xs">No delivered orders found. Switch to Manual to create an invoice from scratch.</p>
                        <button
                          onClick={() => setMode('manual')}
                          className="mt-1 px-4 py-2 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors"
                        >
                          Create Manually
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Delivered Orders</p>
                        <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
                          {completedOrders.map(order => {
                            const name = [order.customer?.firstName, order.customer?.lastName].filter(Boolean).join(' ') || 'Customer'
                            return (
                              <button
                                key={order.id}
                                onClick={() => handleSelectOrder(order)}
                                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors text-left"
                              >
                                <div>
                                  <p className="text-[13px] font-semibold text-slate-800">{order.orderNumber}</p>
                                  <p className="text-[11px] text-slate-400 mt-0.5">{name}{order.customer?.email ? ` · ${order.customer.email}` : ''}</p>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                  <p className="text-[13px] font-bold text-slate-900">₦{Number(order.total).toLocaleString()}</p>
                                  <p className="text-[11px] text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { setMode('order'); setPrefillOrderId(undefined) }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <X size={14} strokeWidth={2} />
                      </button>
                      <div>
                        <h2 className="text-[17px] font-bold text-slate-900">
                          {prefillOrderId ? 'Invoice from Order' : 'Create Invoice'}
                        </h2>
                        <p className="text-[12px] text-slate-400 mt-0.5">
                          {prefillOrderId ? 'Review and confirm the invoice details.' : 'Fill in the invoice details manually.'}
                        </p>
                      </div>
                    </div>

                    {/* Mode toggle */}
                    <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                      <button
                        onClick={() => { setMode('order'); setPrefillOrderId(undefined) }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                      >
                        <ShoppingBag size={12} strokeWidth={2} /> From Order
                      </button>
                      <button
                        onClick={() => setMode('manual')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-semibold bg-slate-900 text-white transition-colors"
                      >
                        <FileText size={12} strokeWidth={2} /> Manual
                      </button>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Bill To</p>
                      <div>
                        <input type="text" placeholder="Customer name *" value={form.customerName} onChange={set('customerName')} className={inputCls} />
                        {errors.customerName && <p className="text-[11px] text-red-500 mt-1">• {errors.customerName}</p>}
                      </div>
                      <div>
                        <input type="email" placeholder="Customer email *" value={form.customerEmail} onChange={set('customerEmail')} className={inputCls} />
                        {errors.customerEmail && <p className="text-[11px] text-red-500 mt-1">• {errors.customerEmail}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Due Date *</label>
                        <input type="date" value={form.dueDate} onChange={set('dueDate')} className={inputCls} />
                        {errors.dueDate && <p className="text-[11px] text-red-500 mt-1">• {errors.dueDate}</p>}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Line Items</p>
                      {errors.items && <p className="text-[11px] text-red-500">• {errors.items}</p>}
                      {items.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={`Item ${idx + 1}`}
                            value={item.description}
                            onChange={e => setItem(item.id, 'description', e.target.value)}
                            className={`${inputCls} flex-1`}
                          />
                          <input
                            type="number"
                            placeholder="Qty"
                            value={item.qty}
                            onChange={e => setItem(item.id, 'qty', e.target.value)}
                            className={`${inputCls} w-16 text-center`}
                            min="1"
                          />
                          <input
                            type="number"
                            placeholder="₦"
                            value={item.price}
                            onChange={e => setItem(item.id, 'price', e.target.value)}
                            className={`${inputCls} w-24`}
                            min="0"
                          />
                          {items.length > 1 && (
                            <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                              <Trash2 size={14} strokeWidth={1.8} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={addItem} className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
                        <Plus size={13} strokeWidth={2} /> Add line item
                      </button>
                      {subtotal > 0 && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-[12px] text-slate-400">Subtotal</span>
                          <span className="text-[14px] font-bold text-slate-900">₦{subtotal.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-slate-800 mb-1.5">
                        Note <span className="text-[11px] font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea rows={3} placeholder="Payment instructions or additional notes…" value={form.note} onChange={set('note')} className={`${inputCls} resize-none`} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {done ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              ) : mode === 'order' ? (
                <button onClick={handleClose} className="w-full py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} disabled={createInvoice.isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {createInvoice.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {createInvoice.isPending ? 'Creating…' : 'Create Invoice'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
