import { useState } from 'react';

const currencies = [
  { symbol: '$', name: 'US Dollar', code: 'USD' },
  { symbol: '₦', name: 'Nigerian Naira', code: 'NGN' },
  { symbol: '£', name: 'British Pound', code: 'GBP' },
  { symbol: '€', name: 'Euro', code: 'EUR' },
  { symbol: 'GH₵', name: 'Ghanaian Cedi', code: 'GHS' },
];

export default function StoreCurrency() {
  const [selected, setSelected] = useState('NGN');

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6">
      <p className="text-[14px] font-bold text-slate-900 mb-0.5">Store Currency</p>
      <p className="text-[12px] text-slate-400 mb-5">
        Set the base currency for your store products and transactions.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {currencies.map(({ symbol, name, code }) => (
          <button
            key={code}
            onClick={() => setSelected(code)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              selected === code
                ? 'border-slate-900 bg-slate-50'
                : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-[18px] font-bold text-slate-700 w-6 shrink-0">{symbol}</span>
            <div>
              <p className="text-[12px] font-semibold text-slate-800 leading-tight">{name}</p>
              <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{code}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
