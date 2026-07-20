interface Props {
  current: number
}

const steps = ['Shipping', 'Payment', 'Confirmation']

export default function CheckoutSteps({ current }: Props) {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center shrink-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors shrink-0 ${
              i <= current ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-400'
            }`}>
              {i < current ? '✓' : i + 1}
            </span>
            <span className={`text-xs tracking-wide whitespace-nowrap ${i <= current ? 'text-stone-900' : 'text-stone-400'}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span className="mx-3 w-8 h-px bg-stone-200 shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}
