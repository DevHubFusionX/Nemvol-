import { useState } from 'react';

type Tracker = { id: string; name: string; sub: string; placeholder: string; color: string };

const trackers: Tracker[] = [
  { id: 'meta', name: 'Meta Pixel', sub: 'Pixel ID', placeholder: '123456789012345', color: 'bg-blue-500' },
  { id: 'tiktok', name: 'TikTok Pixel', sub: 'Pixel ID', placeholder: 'CXXXXXXXXXXXXXXX', color: 'bg-slate-900' },
  { id: 'google', name: 'Google Analytics', sub: 'Measurement ID', placeholder: 'G-XXXXXXXXXX', color: 'bg-red-400' },
];

export default function MarketingTracking() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const connectedCount = Object.values(connected).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 pl-1 border-l-2 border-slate-200">
            Marketing & Tracking
          </p>
          <p className="text-[12px] text-slate-400 mt-0.5 pl-1">
            Connect your ad platforms to track visitors and conversions.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
          {connectedCount} / {trackers.length} connected
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {trackers.map(({ id, name, sub, placeholder, color }) => (
          <div key={id} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}>
                  <span className="text-white text-[11px] font-bold">{name[0]}</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">{name}</p>
                  <p className="text-[10px] text-slate-400">{sub}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${connected[id] ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {connected[id] ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {id === 'meta' && 'Track conversions and build retargeting audiences for Facebook and Instagram ads.'}
                {id === 'tiktok' && 'Measure TikTok ad performance, track purchases, and build custom audiences.'}
                {id === 'google' && 'Understand your traffic, user behaviour, and conversion funnels in detail.'}
              </p>
            </div>

            <div className="mt-auto">
              <p className="text-[11px] text-slate-400 mb-1.5">Enter your {sub}</p>
              <input
                type="text"
                placeholder={placeholder}
                value={values[id] ?? ''}
                onChange={e => setValues(v => ({ ...v, [id]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[12px] text-slate-700 placeholder:text-slate-300 outline-none focus:border-slate-400 transition-colors"
              />
              <button
                onClick={() => setConnected(v => ({ ...v, [id]: !!values[id] }))}
                className="w-full mt-2 py-2 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors"
              >
                {connected[id] ? 'Update' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
