import { ArrowRight, MessageCircle } from 'lucide-react';

export default function BillingRecommended() {
  return (
    <div className="bg-slate-900 rounded-xl p-6 flex items-center justify-between gap-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
          Recommended plan
        </p>
        <h3 className="text-[16px] font-bold text-white">Most brands choose Growth</h3>
        <p className="text-[13px] text-slate-400 mt-1 max-w-md leading-relaxed">
          Growth gives you your own domain, unlimited products, unlimited orders, abandoned cart reminders, and stronger tools to follow up with interested customers.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 text-white text-[13px] font-semibold hover:bg-white/5 transition-colors"
        >
          <MessageCircle size={14} strokeWidth={1.8} />
          Ask on WhatsApp
        </a>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold hover:bg-slate-100 transition-colors">
          Start with Growth
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
