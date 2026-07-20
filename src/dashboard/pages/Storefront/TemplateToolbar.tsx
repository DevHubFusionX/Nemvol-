import { Eye, Copy, Settings2, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useStorefrontConfig } from '../../../hooks/useStorefront'
import { getTemplateCount } from '../../../storefront/templates/registry'
import { getStorefrontUrl } from '../../../storefront/lib/storeUrl'

interface TemplateToolbarProps {
  onMoreConfig: () => void
}

export default function TemplateToolbar({ onMoreConfig }: TemplateToolbarProps) {
  const [copied, setCopied] = useState(false)
  const { data: config } = useStorefrontConfig()

  const storeUrl = config?.slug
    ? getStorefrontUrl(config.slug)
    : getStorefrontUrl('yourstore')

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 rounded-xl bg-white border border-slate-100">
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Storefront Template</p>
          <p className="text-[12px] text-slate-400 mt-0.5">
            {getTemplateCount()} premium storefront templates available for your brand
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
          <a
            href={storeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            <Eye size={13} strokeWidth={1.8} />
            View Store
            <ExternalLink size={11} strokeWidth={1.8} className="text-slate-400" />
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            {copied ? <Check size={13} strokeWidth={2.5} className="text-emerald-500" /> : <Copy size={13} strokeWidth={1.8} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          <button
            onClick={onMoreConfig}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            <Settings2 size={13} strokeWidth={1.8} />
            <span className="hidden sm:inline">More Config</span>
            <span className="sm:hidden">Config</span>
          </button>


        </div>
      </div>
    </>
  )
}
