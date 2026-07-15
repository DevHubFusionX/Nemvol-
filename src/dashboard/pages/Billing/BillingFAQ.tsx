import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How long does each plan last?', a: 'Each plan lasts for 3 months from the date of activation.' },
  { q: 'Is my Nemvol sub-domain free?', a: 'Yes. Your Nemvol sub-domain (e.g. yourbrand.Nemvol.ng) is free on all plans and remains active for the duration of your plan.' },
  { q: 'Is a custom domain free?', a: 'Custom domains are free for the first year on Growth and Premium plans only. After the first year, renewal is paid separately.' },
  { q: 'Can I upgrade later?', a: 'Yes. You can upgrade your plan at any time from this page. Your store data and products are preserved.' },
  { q: 'Can I add unlimited products?', a: 'Unlimited product uploads are available on Growth and Premium plans. Starter has a product limit.' },
  { q: 'Can I receive unlimited orders?', a: 'Unlimited order receiving is available on Growth and Premium plans.' },
  { q: 'Which plan is best for most brands?', a: 'Growth is recommended for most serious brands. It balances affordability, professional trust, unlimited selling tools, and buyer follow-up features.' },
  { q: 'What makes Premium different?', a: 'Premium adds priority support, advanced analytics, custom design touches, a dedicated account manager, and conversion guidance on top of everything in Growth.' },
];

export default function BillingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">FAQ</p>
        <h2 className="text-[17px] font-bold text-slate-900">Questions customers usually ask</h2>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100">
        {faqs.map(({ q, a }, i) => (
          <div key={q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
            >
              <span className="text-[13px] font-semibold text-slate-800">{q}</span>
              <ChevronDown
                size={15}
                strokeWidth={2}
                className={`text-slate-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <p className="px-5 pb-4 text-[13px] text-slate-500 leading-relaxed">{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
