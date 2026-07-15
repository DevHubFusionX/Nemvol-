import { useState } from 'react';
import { FileStack, Eye } from 'lucide-react';
import InvoiceDetailDrawer, { type Invoice } from './modals/InvoiceDetailDrawer';

const cols = ['Invoice #', 'Customer', 'Issued', 'Due Date', 'Amount', 'Status', 'Action'];

type InvoiceStatus = 'paid' | 'unpaid' | 'overdue' | 'draft';

const statusStyles: Record<InvoiceStatus, string> = {
  paid: 'bg-emerald-50 text-emerald-600',
  unpaid: 'bg-amber-50 text-amber-500',
  overdue: 'bg-red-50 text-red-500',
  draft: 'bg-slate-100 text-slate-400',
};

const statusLabel: Record<InvoiceStatus, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  overdue: 'Overdue',
  draft: 'Draft',
};

// Sample data — replace with real data when available
const sampleInvoices: Invoice[] = [
  {
    id: 'INV-0001',
    customerName: 'Adaeze Okonkwo',
    customerEmail: 'adaeze@example.com',
    issued: '10 Jul 2026',
    dueDate: '24 Jul 2026',
    status: 'unpaid',
    items: [
      { description: 'Web Design Package', qty: 1, price: 150000 },
      { description: 'Domain Setup', qty: 1, price: 15000 },
    ],
    note: 'Please pay via bank transfer. Account details sent separately.',
  },
  {
    id: 'INV-0002',
    customerName: 'Emeka Nwosu',
    customerEmail: 'emeka@example.com',
    issued: '5 Jul 2026',
    dueDate: '19 Jul 2026',
    status: 'paid',
    items: [{ description: 'Monthly Retainer', qty: 1, price: 80000 }],
  },
  {
    id: 'INV-0003',
    customerName: 'Fatima Bello',
    customerEmail: 'fatima@example.com',
    issued: '1 Jun 2026',
    dueDate: '15 Jun 2026',
    status: 'overdue',
    items: [
      { description: 'Logo Design', qty: 1, price: 45000 },
      { description: 'Brand Guidelines', qty: 1, price: 30000 },
    ],
  },
];

interface Props {
  filter: 'all' | 'paid' | 'unpaid' | 'overdue' | 'draft';
}

export default function InvoicesTable({ filter }: Props) {
  const [selected, setSelected] = useState<Invoice | null>(null);

  const invoices =
    filter === 'all' ? sampleInvoices : sampleInvoices.filter(i => i.status === filter);

  const isEmpty = invoices.length === 0;

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {/* Column headers — desktop only */}
        <div className="hidden sm:grid grid-cols-7 px-5 py-3 border-b border-slate-100">
          {cols.map(col => (
            <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {col}
            </span>
          ))}
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <FileStack size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-slate-800">No invoices yet</p>
            <p className="text-[12px] text-slate-400 text-center max-w-xs">
              Create your first invoice and send it directly to your customer.
            </p>
          </div>
        ) : (
          invoices.map((inv, i) => {
            const total = inv.items.reduce((s, item) => s + item.qty * item.price, 0);
            return (
              <div key={inv.id}>
                {/* Desktop row */}
                <div
                  className={`hidden sm:grid grid-cols-7 items-center px-5 py-4 ${
                    i < invoices.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span className="text-[13px] font-semibold text-slate-800">{inv.id}</span>
                  <span className="text-[13px] text-slate-600">{inv.customerName}</span>
                  <span className="text-[12px] text-slate-400">{inv.issued}</span>
                  <span className="text-[12px] text-slate-400">{inv.dueDate}</span>
                  <span className="text-[13px] font-semibold text-slate-800">
                    ₦{total.toLocaleString()}
                  </span>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[inv.status]}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {statusLabel[inv.status]}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(inv)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors w-fit"
                  >
                    <Eye size={12} strokeWidth={1.8} />
                    View
                  </button>
                </div>

                {/* Mobile card */}
                <div
                  className={`sm:hidden px-4 py-4 ${
                    i < invoices.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800">{inv.id}</p>
                      <p className="text-[12px] text-slate-500 mt-0.5">{inv.customerName}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[inv.status]}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {statusLabel[inv.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-slate-400">Due {inv.dueDate}</span>
                      <span className="text-[13px] font-bold text-slate-900">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelected(inv)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Eye size={12} strokeWidth={1.8} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <InvoiceDetailDrawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        invoice={selected}
      />
    </>
  );
}
