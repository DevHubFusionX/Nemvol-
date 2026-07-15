import { useState } from 'react';
import { Link2, Globe, Copy, ExternalLink, Check, Trash2 } from 'lucide-react';

interface Props {
  customDomain: string | null;
  onRemoveCustom: () => void;
}

const freeDomain = 'yourstore.nemvol.com';

export default function DomainCards({ customDomain, onRemoveCustom }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Network status panel */}
      <div className="bg-slate-900 rounded-xl p-6 flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Network Status
        </p>
        <div>
          <p className="text-[18px] font-bold text-white leading-snug">
            {customDomain ? `${customDomain} is live` : 'No custom domain yet'}
          </p>
          <p className="text-[12px] text-slate-400 mt-2 leading-relaxed">
            {customDomain
              ? 'Your custom domain is connected. DNS changes may take up to 48 hours to fully propagate.'
              : 'You can keep using your free domain, connect an existing domain, or get a new branded domain.'}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className={`w-1.5 h-1.5 rounded-full ${customDomain ? 'bg-emerald-400' : 'bg-slate-500'}`} />
          <span className="text-[12px] text-slate-400">
            {customDomain ? 'Custom domain connected' : 'Using free domain only'}
          </span>
        </div>
      </div>

      {/* Domain cards — stack on mobile, side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Free domain */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Link2 size={16} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                Free Domain
              </p>
              <p className="text-[15px] font-bold text-slate-900 truncate">{freeDomain}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">
                Always available, even with a custom domain.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Always Active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => copy(freeDomain)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {copied === freeDomain
                ? <Check size={12} strokeWidth={2} className="text-emerald-500" />
                : <Copy size={12} strokeWidth={1.8} />
              }
              {copied === freeDomain ? 'Copied!' : 'Copy Link'}
            </button>
            <a
              href={`https://${freeDomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-700 transition-colors"
            >
              <ExternalLink size={12} strokeWidth={1.8} />
              View Site
            </a>
          </div>
        </div>

        {/* Custom domain */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Globe size={16} className={customDomain ? 'text-emerald-400' : 'text-slate-400'} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                Custom Domain
              </p>
              <p className="text-[15px] font-bold text-slate-900 truncate">
                {customDomain ?? 'No custom domain yet'}
              </p>
              <p className="text-[12px] text-slate-400 mt-0.5">
                {customDomain
                  ? 'Your branded domain is connected to this store.'
                  : 'Connect an existing domain or get a new one.'}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                <span className={`w-1.5 h-1.5 rounded-full ${customDomain ? 'bg-emerald-400' : 'bg-slate-300'}`} />
                {customDomain ? 'Connected' : 'Not connected'}
              </span>
            </div>
          </div>

          {customDomain && (
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => copy(customDomain)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {copied === customDomain
                  ? <Check size={12} strokeWidth={2} className="text-emerald-500" />
                  : <Copy size={12} strokeWidth={1.8} />
                }
                {copied === customDomain ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={`https://${customDomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-700 transition-colors"
              >
                <ExternalLink size={12} strokeWidth={1.8} />
                View Site
              </a>
              <button
                onClick={onRemoveCustom}
                className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove domain"
              >
                <Trash2 size={14} strokeWidth={1.8} />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
