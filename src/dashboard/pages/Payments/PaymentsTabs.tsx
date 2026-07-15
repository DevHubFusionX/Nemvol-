export type PaymentTab = 'payments' | 'expenses';

interface PaymentsTabsProps {
  active: PaymentTab;
  onChange: (t: PaymentTab) => void;
}

const tabs: { id: PaymentTab; label: string }[] = [
  { id: 'payments', label: 'Payments' },
  { id: 'expenses', label: 'Expenses' },
];

export default function PaymentsTabs({ active, onChange }: PaymentsTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-xl w-fit">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
            active === id
              ? 'bg-slate-900 text-white'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
