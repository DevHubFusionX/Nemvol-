import type { TrackerConfig } from './modals/EditTrackerDrawer';

export const trackers: TrackerConfig[] = [
  {
    id: 'meta',
    name: 'Meta Pixel',
    sub: 'Pixel ID',
    placeholder: '123456789012345',
    color: 'bg-blue-500',
    description: 'Track conversions and build retargeting audiences for Facebook and Instagram ads.',
  },
  {
    id: 'tiktok',
    name: 'TikTok Pixel',
    sub: 'Pixel ID',
    placeholder: 'CXXXXXXXXXXXXXXX',
    color: 'bg-slate-900',
    description: 'Measure TikTok ad performance, track purchases, and build custom audiences.',
  },
  {
    id: 'google',
    name: 'Google Analytics',
    sub: 'Measurement ID',
    placeholder: 'G-XXXXXXXXXX',
    color: 'bg-red-400',
    description: 'Understand your traffic, user behaviour, and conversion funnels in detail.',
  },
];

interface Props {
  trackerValues: Record<string, string>;
  onEdit: (tracker: TrackerConfig) => void;
}

export default function MarketingTracking({ trackerValues, onEdit }: Props) {
  const connectedCount = trackers.filter(t => trackerValues[t.id]?.trim()).length;

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
        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
          {connectedCount} / {trackers.length} connected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trackers.map(tracker => {
          const isConnected = !!trackerValues[tracker.id]?.trim();
          return (
            <div key={tracker.id} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${tracker.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-[11px] font-bold">{tracker.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">{tracker.name}</p>
                    <p className="text-[10px] text-slate-400">{tracker.sub}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${isConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  {isConnected ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed flex-1">
                {tracker.description}
              </p>

              {isConnected && (
                <p className="text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-2 rounded-lg truncate">
                  {trackerValues[tracker.id]}
                </p>
              )}

              <button
                onClick={() => onEdit(tracker)}
                className="w-full py-2 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors"
              >
                {isConnected ? 'Update' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
