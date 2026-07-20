import { useState } from 'react';
import { Users, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCustomers, useDeleteCustomer } from '../../../hooks/useCustomers';
import type { CustomerFilter } from './CustomersToolbar';

const cols = ['Customer', 'Email', 'Phone', 'Orders', 'Total Spent', 'Joined', 'Actions'];

interface Props {
  filter: CustomerFilter;
  q: string;
}

export default function CustomersTable({ filter, q }: Props) {
  const { data, isLoading } = useCustomers(q || undefined);
  const { mutate: deleteCustomer } = useDeleteCustomer();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  let customers = data?.data ?? [];

  // client-side recent filter (last 30 days)
  if (filter === 'recent') {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    customers = customers.filter(c => new Date(c.createdAt).getTime() > cutoff);
  }

  if (isLoading) return (
    <div className="bg-white rounded-xl border border-slate-100 flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-7 px-5 py-3 border-b border-slate-100">
        {cols.map(col => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
        ))}
      </div>

      {customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <Users size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No customers found</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            {q ? `No results for "${q}"` : 'Customers will appear here once they place an order or are added manually.'}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {customers.map(c => {
            const name = [c.firstName, c.lastName].filter(Boolean).join(' ') || '—';
            const isOpen = expanded === c.id;

            return (
              <div key={c.id}>
                {/* Desktop row */}
                <div className="hidden sm:grid grid-cols-7 items-center px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-slate-500">
                        {(c.firstName?.[0] ?? c.email?.[0] ?? '?').toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[13px] font-semibold text-slate-800 truncate">{name}</span>
                  </div>
                  <span className="text-[13px] text-slate-500 truncate">{c.email ?? '—'}</span>
                  <span className="text-[13px] text-slate-500">{c.phone ?? '—'}</span>
                  <span className="text-[13px] text-slate-700">{c.totalOrders}</span>
                  <span className="text-[13px] font-semibold text-slate-800">
                    ₦{parseFloat(c.totalSpent).toLocaleString()}
                  </span>
                  <span className="text-[12px] text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors">
                      <Edit2 size={13} strokeWidth={1.8} />
                    </button>
                    <button
                      onClick={() => {
                        if (deletingId) return;
                        setDeletingId(c.id);
                        deleteCustomer(c.id, { onSettled: () => setDeletingId(null) });
                      }}
                      disabled={deletingId === c.id}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      {deletingId === c.id
                        ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                        : <Trash2 size={13} strokeWidth={1.8} />}
                    </button>
                  </div>
                </div>

                {/* Mobile card */}
                <div className="sm:hidden px-4 py-4">
                  <button
                    className="w-full flex items-center justify-between"
                    onClick={() => setExpanded(isOpen ? null : c.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-bold text-slate-500">
                          {(c.firstName?.[0] ?? c.email?.[0] ?? '?').toUpperCase()}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-slate-800">{name}</p>
                        <p className="text-[11px] text-slate-400">{c.email ?? c.phone ?? '—'}</p>
                      </div>
                    </div>
                    {isOpen
                      ? <ChevronUp size={14} className="text-slate-400 shrink-0" />
                      : <ChevronDown size={14} className="text-slate-400 shrink-0" />
                    }
                  </button>

                  {isOpen && (
                    <div className="mt-3 pl-11 space-y-2">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-slate-400">Orders</span>
                        <span className="font-semibold text-slate-800">{c.totalOrders}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-slate-400">Total Spent</span>
                        <span className="font-semibold text-slate-800">₦{parseFloat(c.totalSpent).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-slate-400">Joined</span>
                        <span className="text-slate-600">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                          <Edit2 size={12} strokeWidth={1.8} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (deletingId) return;
                            setDeletingId(c.id);
                            deleteCustomer(c.id, { onSettled: () => setDeletingId(null) });
                          }}
                          disabled={deletingId === c.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {deletingId === c.id
                            ? <span className="w-3 h-3 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
                            : <Trash2 size={12} strokeWidth={1.8} />}
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
