import { Link2, Globe, Copy, ExternalLink } from 'lucide-react';

export default function DomainCards() {
  const freeDomain = 'yourstore.nemvol.com';
  const hasCustomDomain = false;

  return (
    <div className="grid grid-cols-[280px_1fr] gap-4 items-start">

      {/* Network status panel */}
      <div className="bg-slate-900 rounded-xl p-6 flex flex-col gap-4 min-h-[220px]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Network Status
        </p>
        <div>
          <p className="text-[18px] font-bold text-white leading-snug">
            {hasCustomDomain ? 'Custom domain active' : 'No custom domain yet'}
          </p>
          <p className="text-[12px] text-slate-400 mt-2 leading-relaxed">
            You can keep using your free domain, connect an existing domain, or get a new branded domain.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
          <span className="text-[12px] text-slate-400">
            {hasCustomDomain ? 'Custom domain connected' : 'No custom domain yet'}
          </span>
        </div>
      </div>

      {/* Right column — free + custom domain cards */}
      <div className="flex flex-col gap-4">

        {/* Free domain */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Link2 size={16} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Free Domain
            </p>
            <p className="text-[15px] font-bold text-slate-900">{freeDomain}</p>
            <p className="text-[12px] text-slate-400 mt-0.5">
              This domain remains available even when you add a custom domain.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Always Available
            </span>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => navigator.clipboard.writeText(freeDomain)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Copy size={12} strokeWidth={1.8} />
              Copy Link
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-700 transition-colors">
              <ExternalLink size={12} strokeWidth={1.8} />
              View Site
            </button>
          </div>
        </div>

        {/* Custom domain */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
            <Globe size={16} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Custom Domain
            </p>
            <p className="text-[15px] font-bold text-slate-900">
              {hasCustomDomain ? 'yourdomain.com' : 'No custom domain yet'}
            </p>
            <p className="text-[12px] text-slate-400 mt-0.5">
              You can keep using your free domain, connect an existing domain, or get a new branded domain.
            </p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              <span className={`w-1.5 h-1.5 rounded-full ${hasCustomDomain ? 'bg-emerald-400' : 'bg-slate-300'}`} />
              {hasCustomDomain ? 'Active' : 'No custom domain yet'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
