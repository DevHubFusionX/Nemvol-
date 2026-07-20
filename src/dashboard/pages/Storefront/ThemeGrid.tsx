import { useStorefrontConfig, useUpdateStorefrontConfig } from '../../../hooks/useStorefront'
import { storefrontTemplates } from '../../../storefront/templates/registry'

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${on ? 'bg-slate-900' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${on ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  )
}

export default function ThemeGrid() {
  const { data: config } = useStorefrontConfig()
  const update = useUpdateStorefrontConfig()

  const activeId = config?.theme ?? 'nubia'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {storefrontTemplates.map(({ id, displayName, bgClass, description }) => {
        const isActive = activeId === id
        return (
          <div
            key={id}
            className={`rounded-xl border overflow-hidden transition-all ${isActive ? 'border-slate-900' : 'border-slate-100'}`}
          >
            <div className={`h-40 sm:h-52 ${bgClass} flex items-center justify-center`}>
              <div className="text-center px-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block">
                  {displayName} preview
                </span>
                <p className="mt-2 text-[12px] text-slate-500">{description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-white gap-3">
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{displayName}</p>
                <p className="text-[11px] text-slate-400">{isActive ? 'Active template' : 'Available template'}</p>
              </div>
              <Toggle
                on={isActive}
                onToggle={() => { if (!isActive) update.mutate({ theme: id }) }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
