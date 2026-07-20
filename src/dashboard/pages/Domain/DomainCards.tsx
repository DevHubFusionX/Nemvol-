import { useState } from 'react'
import { Link2, Globe, Copy, ExternalLink, Check, Trash2, Clock, AlertCircle } from 'lucide-react'
import { useDomains, useDeleteDomain, useStorefrontConfig } from '../../../hooks/useStorefront'
import { getStorefrontUrl } from '../../../storefront/lib/storeUrl'

const statusStyle: Record<string, string> = {
  verified: 'text-emerald-500',
  pending:  'text-amber-500',
  failed:   'text-red-400',
}

const statusDot: Record<string, string> = {
  verified: 'bg-emerald-400',
  pending:  'bg-amber-400',
  failed:   'bg-red-400',
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'verified') return <Check size={12} strokeWidth={2.5} className="text-emerald-500" />
  if (status === 'failed')   return <AlertCircle size={12} strokeWidth={1.8} className="text-red-400" />
  return <Clock size={12} strokeWidth={1.8} className="text-amber-500" />
}

export default function DomainCards() {
  const { data: domains = [] } = useDomains()
  const { data: config } = useStorefrontConfig()
  const deleteDomain = useDeleteDomain()
  const [copied, setCopied] = useState<string | null>(null)

  const freeDomain = config?.slug ? `${config.slug}.nemvol.com` : 'yourstore.nemvol.com'
  const storeUrl = config?.slug ? getStorefrontUrl(config.slug) : getStorefrontUrl('yourstore')
  const primaryDomain = domains.find(d => d.status === 'verified') ?? null

  const copy = (val: string) => {
    navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Network status panel */}
      <div className="bg-slate-900 rounded-xl p-6 flex flex-col gap-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Network Status</p>
        <div>
          <p className="text-[18px] font-bold text-white leading-snug">
            {primaryDomain ? `${primaryDomain.domain} is live` : 'No custom domain yet'}
          </p>
          <p className="text-[12px] text-slate-400 mt-2 leading-relaxed">
            {primaryDomain
              ? 'Your custom domain is connected. DNS changes may take up to 48 hours to fully propagate.'
              : 'You can keep using your free domain, connect an existing domain, or get a new branded domain.'}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className={`w-1.5 h-1.5 rounded-full ${primaryDomain ? 'bg-emerald-400' : 'bg-slate-500'}`} />
          <span className="text-[12px] text-slate-400">
            {primaryDomain ? 'Custom domain connected' : 'Using free domain only'}
          </span>
        </div>
      </div>

      {/* Free domain + custom domains */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Free domain */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
              <Link2 size={16} className="text-slate-400" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Free Domain</p>
              <p className="text-[15px] font-bold text-slate-900 truncate">{freeDomain}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">Always available, even with a custom domain.</p>
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
              {copied === freeDomain ? <Check size={12} strokeWidth={2} className="text-emerald-500" /> : <Copy size={12} strokeWidth={1.8} />}
              {copied === freeDomain ? 'Copied!' : 'Copy Link'}
            </button>
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-700 transition-colors"
            >
              <ExternalLink size={12} strokeWidth={1.8} />
              View Site
            </a>
          </div>
        </div>

        {/* Custom domain — show first connected or empty state */}
        {domains.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Globe size={16} className="text-slate-400" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Custom Domain</p>
                <p className="text-[15px] font-bold text-slate-900">No custom domain yet</p>
                <p className="text-[12px] text-slate-400 mt-0.5">Connect an existing domain or get a new one.</p>
                <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  Not connected
                </span>
              </div>
            </div>
          </div>
        ) : (
          domains.map(d => (
            <div key={d.id} className="bg-white rounded-xl border border-slate-100 p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Globe size={16} className={statusStyle[d.status] ?? 'text-slate-400'} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Custom Domain</p>
                  <p className="text-[15px] font-bold text-slate-900 truncate">{d.domain}</p>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    {d.status === 'verified' ? 'Your branded domain is connected to this store.' :
                     d.status === 'failed'   ? 'DNS verification failed. Check your records.' :
                     'Awaiting DNS propagation — can take up to 48 hours.'}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 mt-2 text-[10px] font-semibold uppercase tracking-widest ${statusStyle[d.status] ?? 'text-slate-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[d.status] ?? 'bg-slate-300'}`} />
                    <StatusIcon status={d.status} />
                    {d.status === 'verified' ? 'Connected' : d.status === 'failed' ? 'Failed' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => copy(d.domain)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  {copied === d.domain ? <Check size={12} strokeWidth={2} className="text-emerald-500" /> : <Copy size={12} strokeWidth={1.8} />}
                  {copied === d.domain ? 'Copied!' : 'Copy Link'}
                </button>
                {d.status === 'verified' && (
                  <a
                    href={`https://${d.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-700 transition-colors"
                  >
                    <ExternalLink size={12} strokeWidth={1.8} />
                    View Site
                  </a>
                )}
                <button
                  onClick={() => deleteDomain.mutate(d.id)}
                  disabled={deleteDomain.isPending}
                  className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                  title="Remove domain"
                >
                  <Trash2 size={14} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DNS records for pending domains */}
      {domains.filter(d => d.status === 'pending' && d.dnsRecords).map(d => (
        <div key={`dns-${d.id}`} className="bg-white rounded-xl border border-amber-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-amber-100 bg-amber-50">
            <p className="text-[13px] font-semibold text-amber-700">DNS records required for <span className="font-bold">{d.domain}</span></p>
            <p className="text-[11px] text-amber-600 mt-0.5">Add these records in your domain registrar. Changes can take up to 48 hours.</p>
          </div>
          <div className="divide-y divide-slate-50">
            {(d.dnsRecords ?? []).map((rec, i) => (
              <div key={i} className="grid grid-cols-[60px_1fr_1fr] gap-4 px-5 py-3 items-center">
                <span className="text-[12px] font-bold text-slate-700">{rec.type}</span>
                <span className="text-[12px] font-mono text-slate-600 truncate">{rec.name}</span>
                <span className="text-[12px] font-mono text-slate-600 truncate">{rec.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
