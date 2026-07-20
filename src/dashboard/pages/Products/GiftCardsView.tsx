import { Gift, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddGiftCardModal from './modals/AddGiftCardModal';
import { useGiftCards, useDeleteGiftCard } from '../../../hooks/useGiftCards';

export default function GiftCardsView() {
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: giftCards = [], isLoading } = useGiftCards();
  const deleteGiftCard = useDeleteGiftCard();

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-slate-900">Gift Cards</p>
            <p className="text-[12px] text-slate-400 mt-0.5">Create and manage gift cards for your store</p>
          </div>
          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors">
            <Plus size={13} strokeWidth={2.5} /> Add Gift Card
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-[13px] text-slate-400">Loading...</p>
          </div>
        ) : giftCards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <Gift size={20} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-slate-800">No gift cards yet</p>
            <p className="text-[12px] text-slate-400 text-center max-w-xs">
              Create gift cards to let customers share the love with friends and family.
            </p>
            <button onClick={() => setOpen(true)} className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <Plus size={13} strokeWidth={2.5} /> Create your first gift card
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {giftCards.map(gc => (
              <li key={gc.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-[13px] font-semibold text-slate-800">
                    ₦{Number(gc.value).toLocaleString()}
                    <span className={`ml-2 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      gc.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                      gc.status === 'used' ? 'bg-slate-100 text-slate-500' : 'bg-red-50 text-red-500'
                    }`}>{gc.status}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">{gc.code}</p>
                </div>
                <button
                  onClick={() => {
                    if (deletingId) return;
                    setDeletingId(gc.id);
                    deleteGiftCard.mutate(gc.id, { onSettled: () => setDeletingId(null) });
                  }}
                  disabled={deletingId === gc.id}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {deletingId === gc.id
                    ? <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                    : <Trash2 size={14} strokeWidth={2} />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <AddGiftCardModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
