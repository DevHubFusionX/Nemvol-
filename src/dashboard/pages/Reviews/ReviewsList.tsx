import { useState } from 'react';
import { MessageSquareOff, Check, X, Trash2 } from 'lucide-react';
import { useReviews, useUpdateReviewStatus, useDeleteReview } from '../../../hooks/useReviews';
import type { ReviewFilter } from './ReviewsToolbar';

const cols = ['Customer', 'Product', 'Rating', 'Review', 'Date', 'Status', 'Actions'];

const STATUS_STYLES: Record<string, string> = {
  pending:  'bg-amber-50 text-amber-500',
  approved: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-red-50 text-red-500',
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className={`w-3 h-3 ${i < rating ? 'fill-amber-400' : 'fill-slate-200'}`}>
          <path d="M6 0l1.5 3.5L11 4l-2.5 2.5.6 3.5L6 8.5 2.9 10l.6-3.5L1 4l3.5-.5z" />
        </svg>
      ))}
      <span className="text-[11px] text-slate-400 ml-1">{rating}.0</span>
    </div>
  );
}

interface Props {
  filter: ReviewFilter;
  q: string;
}

export default function ReviewsList({ filter, q }: Props) {
  const apiFilters = {
    status: filter === 'all' || filter === 'recents' ? undefined : undefined,
    rating: filter === 'low' ? 'low' as const : filter === 'high' ? 'high' as const : undefined,
    q: q || undefined,
  };

  const { data, isLoading } = useReviews(apiFilters);
  const { mutate: updateStatus } = useUpdateReviewStatus();
  const { mutate: deleteReview } = useDeleteReview();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const reviews = data?.data ?? [];

  // client-side recents sort (already sorted by createdAt desc from API)
  const displayed = filter === 'recents' ? reviews.slice(0, 10) : reviews;

  if (isLoading) return (
    <div className="bg-white rounded-xl border border-slate-100 flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="hidden sm:grid grid-cols-7 px-5 py-3 border-b border-slate-100">
        {cols.map(col => (
          <span key={col} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{col}</span>
        ))}
      </div>

      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <MessageSquareOff size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800">No reviews available</p>
          <p className="text-[12px] text-slate-400 text-center max-w-xs">
            Customer reviews will appear here once they start rating your products.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {displayed.map(r => (
            <div key={r.id}>
              {/* Desktop row */}
              <div className="hidden sm:grid grid-cols-7 items-start px-5 py-4 gap-2">
                <div>
                  <p className="text-[13px] font-semibold text-slate-800 truncate">{r.customerName}</p>
                  {r.customerEmail && (
                    <p className="text-[11px] text-slate-400 truncate">{r.customerEmail}</p>
                  )}
                </div>
                <p className="text-[13px] text-slate-600 truncate">{r.productName}</p>
                <Stars rating={parseInt(r.rating)} />
                <p className="text-[12px] text-slate-500 line-clamp-2 col-span-1">{r.body ?? '—'}</p>
                <p className="text-[12px] text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit h-fit ${STATUS_STYLES[r.status]}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {r.status}
                </span>
                <div className="flex items-center gap-1.5">
                  {r.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus({ id: r.id, status: 'approved' })}
                        title="Approve"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <Check size={13} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => updateStatus({ id: r.id, status: 'rejected' })}
                        title="Reject"
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <X size={13} strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                  {r.status === 'rejected' && (
                    <button
                      onClick={() => updateStatus({ id: r.id, status: 'approved' })}
                      title="Approve"
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                    >
                      <Check size={13} strokeWidth={2.5} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (deletingId) return;
                      setDeletingId(r.id);
                      deleteReview(r.id, { onSettled: () => setDeletingId(null) });
                    }}
                    disabled={deletingId === r.id}
                    title="Delete"
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    {deletingId === r.id
                      ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                      : <Trash2 size={13} strokeWidth={1.8} />}
                  </button>
                </div>
              </div>

              {/* Mobile card */}
              <div className="sm:hidden px-4 py-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{r.customerName}</p>
                    <p className="text-[11px] text-slate-400">{r.productName}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${STATUS_STYLES[r.status]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />{r.status}
                  </span>
                </div>
                <Stars rating={parseInt(r.rating)} />
                {r.body && <p className="text-[12px] text-slate-500">{r.body}</p>}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1.5">
                    {r.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus({ id: r.id, status: 'approved' })} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600"><Check size={12} strokeWidth={2.5} /></button>
                        <button onClick={() => updateStatus({ id: r.id, status: 'rejected' })} className="p-1.5 rounded-lg bg-red-50 text-red-500"><X size={12} strokeWidth={2.5} /></button>
                      </>
                    )}
                    <button onClick={() => {
                      if (deletingId) return;
                      setDeletingId(r.id);
                      deleteReview(r.id, { onSettled: () => setDeletingId(null) });
                    }} disabled={deletingId === r.id} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 disabled:opacity-50">
                      {deletingId === r.id
                        ? <span className="w-3 h-3 border-2 border-slate-300 border-t-red-400 rounded-full animate-spin block" />
                        : <Trash2 size={12} strokeWidth={1.8} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
