import { LockKeyhole, Users } from 'lucide-react';

interface Props {
  onConfigureGate: () => void;
  onViewLeads: () => void;
}

export default function LeadCapture({ onConfigureGate, onViewLeads }: Props) {
  const cards = [
    {
      icon: LockKeyhole,
      title: 'Access Gate',
      desc: 'Require visitors to submit contact details before browsing your storefront.',
      action: 'Configure Gate',
      onClick: onConfigureGate,
    },
    {
      icon: Users,
      title: 'Access Gate Leads',
      desc: 'Search, review, export, and manage contacts captured by your gate.',
      action: 'View Leads',
      onClick: onViewLeads,
    },
  ];

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3 pl-1 border-l-2 border-slate-200">
        Lead Capture
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map(({ icon: Icon, title, desc, action, onClick }) => (
          <div key={title} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <Icon size={17} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-slate-900">{title}</p>
              <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">{desc}</p>
            </div>
            <button
              onClick={onClick}
              className="text-[13px] font-semibold text-[var(--color-brand-blue)] hover:underline w-fit mt-auto"
            >
              {action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
