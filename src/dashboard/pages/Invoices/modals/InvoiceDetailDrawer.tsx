import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, Send } from 'lucide-react';

export interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  issued: string;
  dueDate: string;
  items: { description: string; qty: number; price: number }[];
  status: 'paid' | 'unpaid' | 'overdue' | 'draft';
  note?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const statusStyles: Record<Invoice['status'], string> = {
  paid: 'bg-emerald-50 text-emerald-600',
  unpaid: 'bg-amber-50 text-amber-500',
  overdue: 'bg-red-50 text-red-500',
  draft: 'bg-slate-100 text-slate-400',
};

const statusLabel: Record<Invoice['status'], string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  overdue: 'Overdue',
  draft: 'Draft',
};

export default function InvoiceDetailDrawer({ open, onClose, invoice }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const subtotal = invoice?.items.reduce((s, i) => s + i.qty * i.price, 0) ?? 0;

  return createPortal(
    <AnimatePresence>
      {open && invoice && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) onClose(); }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
            >
              <X size={15} strokeWidth={2} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[17px] font-bold text-slate-900">{invoice.id}</h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Issued {invoice.issued} · Due {invoice.dueDate}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[invoice.status]}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {statusLabel[invoice.status]}
                </span>
              </div>

              {/* Bill to */}
              <div className="rounded-xl border border-slate-100 p-4 space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Bill To
                </p>
                <p className="text-[13px] font-semibold text-slate-800">{invoice.customerName}</p>
                <p className="text-[12px] text-slate-400">{invoice.customerEmail}</p>
              </div>

              {/* Line items */}
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-slate-100">
                  {['Description', 'Qty', 'Amount'].map(h => (
                    <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      {h}
                    </span>
                  ))}
                </div>
                {invoice.items.map((item, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 items-center ${
                      i < invoice.items.length - 1 ? 'border-b border-slate-100' : ''
                    }`}
                  >
                    <span className="text-[13px] text-slate-700">{item.description}</span>
                    <span className="text-[13px] text-slate-500 text-center">{item.qty}</span>
                    <span className="text-[13px] font-semibold text-slate-800">
                      ₦{(item.qty * item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
                  <span className="text-[12px] font-semibold text-slate-500">Total</span>
                  <span className="text-[15px] font-bold text-slate-900">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Note */}
              {invoice.note && (
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
                    Note
                  </p>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{invoice.note}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0 flex gap-2">
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Download size={14} strokeWidth={1.8} />
                Download
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors"
              >
                <Send size={14} strokeWidth={1.8} />
                Send Invoice
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
