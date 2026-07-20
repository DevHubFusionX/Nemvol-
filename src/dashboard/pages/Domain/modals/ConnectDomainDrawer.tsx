import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, Copy, Check } from 'lucide-react'
import { useConnectDomain } from '../../../../hooks/useStorefront'

interface Props {
  open: boolean
  onClose: () => void
}

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition-colors bg-white'

type DnsRecord = { type: string; name: string; value: string }
type Step = 'enter' | 'dns' | 'done'

export default function ConnectDomainDrawer({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const submitting = useRef(false)
  const [step, setStep] = useState<Step>('enter')
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>([])
  const connectDomain = useConnectDomain()

  const reset = () => {
    setStep('enter')
    setDomain('')
    setError('')
    setCopied(null)
    setDnsRecords([])
  }

  const handleClose = () => { reset(); onClose() }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  const handleNext = () => {
    const trimmed = domain.trim()
    if (!trimmed) { setError('Please enter a domain name'); return }
    const valid = /^([a-z0-9-]+\.)+[a-z]{2,}$/.test(trimmed.toLowerCase())
    if (!valid) { setError('Enter a valid domain (e.g. yourdomain.com)'); return }
    setError('')
    setStep('dns')
  }

  const handleVerify = () => {
    if (submitting.current) return
    submitting.current = true
    connectDomain.mutate(domain.trim().toLowerCase(), {
      onSuccess: (data) => {
        if (data.dnsRecords) setDnsRecords(data.dnsRecords)
        setStep('done')
      },
      onError: () => setError('Failed to connect domain. Please try again.'),
      onSettled: () => { submitting.current = false },
    })
  }

  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 2000)
  }

  // Static fallback DNS records shown before API call
  const displayRecords: DnsRecord[] = dnsRecords.length > 0 ? dnsRecords : [
    { type: 'CNAME', name: domain || 'yourdomain.com', value: 'storefronts.nemvol.com' },
    { type: 'TXT',   name: `_nemvol.${domain || 'yourdomain.com'}`, value: 'verification-token-pending' },
  ]

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={e => { if (e.target === overlayRef.current) handleClose() }}
          className="fixed inset-0 z-[100] flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full sm:max-w-lg bg-white shadow-2xl shadow-slate-900/20 flex flex-col h-full"
          >
            <button onClick={handleClose} className="absolute top-4 left-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10">
              <X size={15} strokeWidth={2} />
            </button>

            <div className="flex-1 overflow-y-auto px-6 pt-12 pb-4">
              <AnimatePresence mode="wait">

                {step === 'enter' && (
                  <motion.div key="enter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Connect Existing Domain</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Point your domain to your Nemvol store by updating your DNS records.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                      <p className="text-[13px] font-semibold text-slate-800">Your Domain</p>
                      <div>
                        <input
                          type="text"
                          placeholder="yourdomain.com"
                          value={domain}
                          onChange={e => { setDomain(e.target.value); setError('') }}
                          className={inputCls}
                          autoFocus
                        />
                        {error && <p className="text-[11px] text-red-500 mt-1">• {error}</p>}
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-4 space-y-2">
                      <p className="text-[13px] font-semibold text-slate-800">How it works</p>
                      {[
                        'Enter your domain name below',
                        "We'll show you the DNS records to add",
                        'Add them in your domain registrar',
                        'Come back and verify — done',
                      ].map((s, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-[12px] text-slate-500">{s}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 'dns' && (
                  <motion.div key="dns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div>
                      <h2 className="text-[17px] font-bold text-slate-900">Add DNS Records</h2>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        Add these records in your domain registrar's DNS settings for{' '}
                        <span className="font-semibold text-slate-700">{domain}</span>.
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 overflow-hidden">
                      <div className="grid grid-cols-[60px_1fr_1fr_36px] gap-3 px-4 py-2.5 border-b border-slate-100">
                        {['Type', 'Name', 'Value', ''].map(h => (
                          <span key={h} className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{h}</span>
                        ))}
                      </div>
                      {displayRecords.map((rec, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-[60px_1fr_1fr_36px] gap-3 items-center px-4 py-3 ${i < displayRecords.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                          <span className="text-[12px] font-bold text-slate-700">{rec.type}</span>
                          <span className="text-[12px] text-slate-600 font-mono truncate">{rec.name}</span>
                          <span className="text-[12px] text-slate-600 font-mono truncate">{rec.value}</span>
                          <button
                            onClick={() => copyValue(rec.value)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            {copied === rec.value
                              ? <Check size={13} strokeWidth={2} className="text-emerald-500" />
                              : <Copy size={13} strokeWidth={1.8} />}
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                      <p className="text-[12px] font-semibold text-amber-700">DNS changes can take up to 48 hours</p>
                      <p className="text-[11px] text-amber-600 mt-0.5 leading-relaxed">
                        Once you've added the records, click Verify below. If it doesn't work immediately, try again after a few hours.
                      </p>
                    </div>

                    {error && <p className="text-[11px] text-red-500">• {error}</p>}
                  </motion.div>
                )}

                {step === 'done' && (
                  <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-16 gap-3">
                    <CheckCircle2 size={44} className="text-emerald-500" strokeWidth={1.5} />
                    <p className="text-[15px] font-bold text-slate-900">Domain connected!</p>
                    <p className="text-[13px] text-slate-400 max-w-xs leading-relaxed">
                      <span className="font-semibold text-slate-700">{domain}</span> has been linked to your store. DNS propagation may take up to 48 hours.
                    </p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 shrink-0">
              {step === 'enter' && (
                <div className="flex gap-2">
                  <button onClick={handleClose} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleNext} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                    Continue
                  </button>
                </div>
              )}
              {step === 'dns' && (
                <div className="flex gap-2">
                  <button onClick={() => setStep('enter')} className="flex-1 py-3 rounded-xl border border-slate-200 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    Back
                  </button>
                  <button onClick={handleVerify} disabled={connectDomain.isPending} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {connectDomain.isPending && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    {connectDomain.isPending ? 'Connecting…' : 'Verify Connection'}
                  </button>
                </div>
              )}
              {step === 'done' && (
                <button onClick={handleClose} className="w-full py-3 rounded-xl bg-slate-900 text-white text-[13px] font-semibold hover:bg-slate-700 transition-colors">
                  Done
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
