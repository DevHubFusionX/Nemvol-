import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowLeft, CheckCircle2, Copy, Upload,
  CreditCard, Building, Zap,
} from 'lucide-react';
import { usePlanGate } from './PlanGateContext';
import type { PlanId } from './PlanGateContext';

type Method = 'paystack' | 'bank' | 'card';

interface Props {
  planId: PlanId;
  planName: string;
  planPrice: string;
  onClose: () => void;
}

const BANK = {
  name: 'Nemvol Technologies Ltd',
  bank: 'Guaranty Trust Bank (GTB)',
  account: '0123456789',
  sort: '058152036',
};

function copyText(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800 mt-0.5">{value}</p>
      </div>
      <button
        onClick={() => { copyText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 transition-colors"
      >
        <Copy size={12} strokeWidth={1.5} />
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function PaymentDrawer({ planId, planName, planPrice, onClose }: Props) {
  const { choosePlan } = usePlanGate();
  const [step, setStep] = useState<'method' | 'paystack' | 'bank' | 'card' | 'success'>('method');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  function handleSuccess() {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep('success'); }, 1400);
  }

  function handleDone() {
    choosePlan(planId);
    onClose();
  }

  function formatCard(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExpiry(val: string) {
    const d = val.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
  }

  const backStep: Partial<Record<typeof step, typeof step>> = {
    paystack: 'method', bank: 'method', card: 'method',
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="w-full max-w-md bg-white flex flex-col h-full shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {backStep[step] && (
              <button onClick={() => setStep(backStep[step]!)} className="text-slate-400 hover:text-slate-700 mr-1">
                <ArrowLeft size={16} strokeWidth={1.5} />
              </button>
            )}
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {step === 'success' ? 'Payment Confirmed' : `Subscribe to ${planName}`}
              </p>
              <p className="text-[11px] text-slate-400">{planPrice} / month</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <AnimatePresence mode="wait">

            {/* Step: method */}
            {step === 'method' && (
              <motion.div key="method" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-3">
                <p className="text-xs text-slate-500 mb-1">Select a payment method</p>
                {([
                  { id: 'paystack', icon: <Zap size={16} strokeWidth={1.5} />, label: 'Paystack', sub: 'Pay securely via Paystack' },
                  { id: 'bank', icon: <Building size={16} strokeWidth={1.5} />, label: 'Bank Transfer', sub: 'Transfer to our account & upload proof' },
                  { id: 'card', icon: <CreditCard size={16} strokeWidth={1.5} />, label: 'Debit / Credit Card', sub: 'Visa, Mastercard, Verve' },
                ] as { id: Method; icon: React.ReactNode; label: string; sub: string }[]).map(m => (
                  <button
                    key={m.id}
                    onClick={() => setStep(m.id)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-slate-500">{m.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{m.label}</p>
                      <p className="text-[11px] text-slate-400">{m.sub}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step: paystack */}
            {step === 'paystack' && (
              <motion.div key="paystack" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
                  <Zap size={28} strokeWidth={1.5} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-800">Pay with Paystack</p>
                  <p className="text-xs text-slate-400 mt-1">You'll be redirected to Paystack's secure checkout to complete your payment of <span className="font-semibold text-slate-700">{planPrice}</span>.</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-4 flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Order Summary</p>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-600">{planName} Plan</span>
                    <span className="font-semibold text-slate-900">{planPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Billing</span>
                    <span className="text-slate-500">Monthly</span>
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2 flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>{planPrice}</span>
                  </div>
                </div>
                <button
                  onClick={handleSuccess}
                  disabled={processing}
                  className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-60"
                >
                  {processing ? 'Redirecting…' : 'Continue to Paystack →'}
                </button>
              </motion.div>
            )}

            {/* Step: bank */}
            {step === 'bank' && (
              <motion.div key="bank" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Transfer to this account</p>
                  <CopyRow label="Account Name" value={BANK.name} />
                  <CopyRow label="Bank" value={BANK.bank} />
                  <CopyRow label="Account Number" value={BANK.account} />
                  <CopyRow label="Sort Code" value={BANK.sort} />
                  <CopyRow label="Amount" value={planPrice} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2">Upload payment proof (screenshot / receipt)</p>
                  <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors ${proofFile ? 'border-slate-400 bg-slate-50' : 'border-slate-200 hover:border-slate-400'}`}>
                    <Upload size={20} strokeWidth={1.5} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{proofFile ? proofFile.name : 'Click to upload'}</span>
                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => setProofFile(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
                <button
                  onClick={handleSuccess}
                  disabled={!proofFile || processing}
                  className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  {processing ? 'Submitting…' : 'Submit for Verification'}
                </button>
                <p className="text-[11px] text-slate-400 text-center">Your account will be activated within 1–2 hours after verification.</p>
              </motion.div>
            )}

            {/* Step: card */}
            {step === 'card' && (
              <motion.div key="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-slate-400">Card Number</label>
                    <input
                      className="input-field mt-1"
                      placeholder="0000 0000 0000 0000"
                      value={card.number}
                      onChange={e => setCard(c => ({ ...c, number: formatCard(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-slate-400">Cardholder Name</label>
                    <input
                      className="input-field mt-1"
                      placeholder="Name on card"
                      value={card.name}
                      onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400">Expiry</label>
                      <input
                        className="input-field mt-1"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400">CVV</label>
                      <input
                        className="input-field mt-1"
                        placeholder="•••"
                        maxLength={4}
                        value={card.cvv}
                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 p-4 flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Order Summary</p>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-600">{planName} Plan</span>
                    <span className="font-semibold text-slate-900">{planPrice}</span>
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2 flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>{planPrice}</span>
                  </div>
                </div>
                <button
                  onClick={handleSuccess}
                  disabled={card.number.length < 19 || !card.name || card.expiry.length < 5 || card.cvv.length < 3 || processing}
                  className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  {processing ? 'Processing…' : `Pay ${planPrice}`}
                </button>
                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <CreditCard size={11} strokeWidth={1.5} /> Secured with 256-bit SSL encryption
                </p>
              </motion.div>
            )}

            {/* Step: success */}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                  <CheckCircle2 size={52} strokeWidth={1.5} className="text-emerald-500" />
                </motion.div>
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {step === 'success' && planId === 'free' ? 'Trial Started!' : 'Payment Received!'}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Your <span className="font-medium text-slate-700">{planName}</span> plan is now active.
                  </p>
                </div>
                <button
                  onClick={handleDone}
                  className="mt-4 px-8 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
