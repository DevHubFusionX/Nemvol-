import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Lock, Eye, User, Mail, Phone, Users, Save } from 'lucide-react'

const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)
import { useToolsConfig, useSaveAccessGate } from '../../../../hooks/useTools'
import { useStore } from '../../../../hooks/useStore'

interface Props {
  open: boolean
  onClose: () => void
}

const inputCls =
  'w-full px-3 py-2.5 rounded-lg border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white'

function Toggle({ on, onToggle, disabled }: { on: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 disabled:opacity-50 ${on ? 'bg-slate-900' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300 bg-white'}`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-[12px] text-slate-700">{label}</span>
    </label>
  )
}

// ── Live Preview ──────────────────────────────────────────────────────────────

interface PreviewProps {
  storeName: string
  logoUrl?: string | null
  title: string
  description: string
  buttonLabel: string
  fields: string[]
  showInstagram: boolean
}

function GatePreview({ storeName, logoUrl, title, description, buttonLabel, fields, showInstagram }: PreviewProps) {
  const initial = (storeName?.[0] ?? 'N').toUpperCase()

  const fieldRows = [
    { key: 'Full Name',       icon: User,      placeholder: 'Full name',      show: fields.includes('Full Name') },
    { key: 'Email Address',   icon: Mail,      placeholder: 'Email address',  show: fields.includes('Email Address') },
    { key: 'Phone Number',    icon: Phone,     placeholder: 'Phone number',   show: fields.includes('Phone Number') },
    { key: 'Instagram', icon: null as null, placeholder: 'Instagram handle', show: showInstagram },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center gap-4 w-full max-w-[280px] mx-auto">
      <div className="w-12 h-12 rounded-xl bg-emerald-700 flex items-center justify-center shrink-0 overflow-hidden">
        {logoUrl
          ? <img src={logoUrl} alt={storeName} className="w-full h-full object-cover" />
          : <span className="text-white text-lg font-bold">{initial}</span>
        }
      </div>
      <div className="text-center">
        <p className="text-[15px] font-bold text-slate-900">{title || 'Access this storefront'}</p>
        <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">
          {description || 'Enter your details below to access this store.'}
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        {fieldRows.filter(f => f.show).map(({ key, icon: Icon, placeholder }) => (
          <div key={key} className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2">
            {Icon ? <Icon size={13} className="text-slate-300 shrink-0" strokeWidth={1.5} /> : <IgIcon />}
            <span className="text-[12px] text-slate-300 flex-1">{placeholder}</span>
            <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wide">Required</span>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <button className="w-full bg-slate-900 text-white text-[12px] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2">
        {buttonLabel || 'Continue to Store'} →
      </button>

      {/* Trust note */}
      <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
        <svg viewBox="0 0 16 16" className="w-3 h-3 fill-emerald-500 shrink-0">
          <path d="M8 1l6 2.5v4C14 11 11.5 14 8 15 4.5 14 2 11 2 7.5v-4L8 1z" />
        </svg>
        Your information will be shared securely with this merchant.
      </p>
    </div>
  )
}

// ── Main Drawer ───────────────────────────────────────────────────────────────

export default function AccessGateDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { data: config } = useToolsConfig()
  const { data: store } = useStore()
  const saveGate = useSaveAccessGate()

  const [enabled, setEnabled]           = useState(false)
  const [title, setTitle]               = useState('Access this storefront')
  const [description, setDescription]   = useState('Enter your details below to access this store.')
  const [buttonLabel, setButtonLabel]   = useState('Continue to Store')
  const [accessDuration, setAccessDuration] = useState(30)
  const [showInstagram, setShowInstagram]   = useState(false)
  const [deduplicateBy, setDeduplicateBy]   = useState<string[]>(['email', 'phone'])
  const [fields, setFields]             = useState<string[]>(['Full Name', 'Email Address', 'Phone Number'])

  // Hydrate from API
  useEffect(() => {
    if (!config?.toolsConfig?.accessGate || !open) return
    const g = config.toolsConfig.accessGate
    setEnabled(g.enabled)
    setFields(g.fields ?? ['Full Name', 'Email Address', 'Phone Number'])
    setTitle(g.title ?? 'Access this storefront')
    setDescription(g.description ?? 'Enter your details below to access this store.')
    setButtonLabel(g.buttonLabel ?? 'Continue to Store')
    setAccessDuration(g.accessDuration ?? 30)
    setShowInstagram(g.showInstagram ?? false)
    setDeduplicateBy(g.deduplicateBy ?? ['email', 'phone'])
  }, [config, open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const toggleDedup = (key: string) =>
    setDeduplicateBy(p => p.includes(key) ? p.filter(x => x !== key) : [...p, key])

  const handleSave = () => {
    saveGate.mutate({
      enabled, fields, title, description, buttonLabel,
      accessDuration, showInstagram, deduplicateBy,
    }, { onSuccess: onClose })
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) onClose() }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-4xl bg-slate-50 rounded-2xl shadow-2xl shadow-slate-900/20 flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <Lock size={15} className="text-slate-500" strokeWidth={1.8} />
                <p className="text-[14px] font-bold text-slate-900">Access Gate</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-500">
                    {enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <Toggle on={enabled} onToggle={() => setEnabled(v => !v)} />
                </div>
                <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Body — two columns */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

                {/* Left — settings */}
                <div className="p-6 space-y-5">
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">Gate Settings</p>
                    <p className="text-[12px] text-slate-400 mt-0.5">Personalise the entry screen your customers will see.</p>
                  </div>

                  {/* Gate title */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Gate title</label>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Access this storefront"
                      className={inputCls}
                    />
                  </div>

                  {/* Gate description */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Gate description</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Enter your details below to access this store."
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {/* Button label + Access duration */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Button label</label>
                      <input
                        value={buttonLabel}
                        onChange={e => setButtonLabel(e.target.value)}
                        placeholder="Continue to Store"
                        className={inputCls}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Access duration</label>
                      <div className="relative">
                        <input
                          type="number"
                          min={1}
                          value={accessDuration}
                          onChange={e => setAccessDuration(Number(e.target.value))}
                          className={`${inputCls} pr-10`}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">days</span>
                      </div>
                    </div>
                  </div>

                  {/* Instagram handle toggle */}
                  <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400">
                      <IgIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13px] font-semibold text-slate-800">Instagram handle</p>
                        <Toggle on={showInstagram} onToggle={() => setShowInstagram(v => !v)} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Display an optional Instagram field for customers.
                      </p>
                    </div>
                  </div>

                  {/* Duplicate prevention */}
                  <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <Users size={14} className="text-slate-400" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">Duplicate prevention</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          If any selected field matches an existing lead, the lead is updated instead of duplicated.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pl-11">
                      <Checkbox checked={deduplicateBy.includes('email')} onChange={() => toggleDedup('email')} label="Email" />
                      <Checkbox checked={deduplicateBy.includes('phone')} onChange={() => toggleDedup('phone')} label="Phone" />
                      <Checkbox checked={deduplicateBy.includes('instagram')} onChange={() => toggleDedup('instagram')} label="Instagram" />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400">Changes apply to your live storefront once saved.</p>
                </div>

                {/* Right — live preview */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye size={14} className="text-slate-400" strokeWidth={1.5} />
                      <p className="text-[13px] font-bold text-slate-900">Storefront Preview</p>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Customer view
                    </span>
                  </div>

                  <div className="flex-1 bg-slate-100 rounded-xl flex items-center justify-center p-6 min-h-[400px]">
                    {enabled ? (
                      <GatePreview
                        storeName={store?.name ?? 'N'}
                        logoUrl={store?.logoUrl}
                        title={title}
                        description={description}
                        buttonLabel={buttonLabel}
                        fields={fields}
                        showInstagram={showInstagram}
                      />
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto">
                          <Lock size={18} className="text-slate-300" strokeWidth={1.5} />
                        </div>
                        <p className="text-[13px] font-semibold text-slate-500">Gate is disabled</p>
                        <p className="text-[12px] text-slate-400 max-w-[200px]">
                          Enable the gate to see a live preview of what customers will see.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveGate.isPending}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-700 text-white text-[13px] font-semibold hover:bg-emerald-800 transition-colors disabled:opacity-60"
              >
                {saveGate.isPending
                  ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Save size={13} strokeWidth={2} />
                }
                {saveGate.isPending ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
