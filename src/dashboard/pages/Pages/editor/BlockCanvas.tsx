import { useRef, useState } from 'react'
import {
  GripVertical, Trash2, ChevronUp, ChevronDown,
  Plus, Image as ImageIcon, Upload, X,
} from 'lucide-react'
import { type Block, type BlockType } from './blocks'
import { api } from '../../../../lib/api'

interface Props {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

const ADD_BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: 'heading',    label: 'Heading',    icon: 'H1' },
  { type: 'subheading', label: 'Subheading', icon: 'H2' },
  { type: 'paragraph',  label: 'Paragraph',  icon: '¶' },
  { type: 'quote',      label: 'Quote',      icon: '"' },
  { type: 'list',       label: 'List',       icon: '•' },
  { type: 'image',      label: 'Image',      icon: '🖼' },
  { type: 'divider',    label: 'Divider',    icon: '—' },
  { type: 'columns',    label: '2 Columns',  icon: '⊞' },
  { type: 'cta',        label: 'CTA Button', icon: '→' },
]

function newBlock(type: BlockType): Block {
  const id = Math.random().toString(36).slice(2, 9)
  switch (type) {
    case 'heading':    return { id, type, text: 'New Heading', align: 'left' }
    case 'subheading': return { id, type, text: 'New Subheading', align: 'left' }
    case 'paragraph':  return { id, type, text: 'Write something here...', align: 'left' }
    case 'quote':      return { id, type, text: 'An inspiring quote goes here.', align: 'center' }
    case 'list':       return { id, type, items: ['Item one', 'Item two', 'Item three'], align: 'left' }
    case 'image':      return { id, type, imageUrl: '', imageAlt: '', imageCaption: '' }
    case 'divider':    return { id, type }
    case 'columns':    return { id, type, col1: 'Column one content', col2: 'Column two content' }
    case 'cta':        return { id, type, ctaText: 'Shop Now', ctaUrl: '/products', ctaStyle: 'filled', align: 'center' }
    default:           return { id, type: 'paragraph', text: '' }
  }
}

// ── Individual block editors ──────────────────────────────────────────────────

function TextareaField({ value, onChange, rows = 3, placeholder, mono = false }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; mono?: boolean
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-0 py-1 bg-transparent border-none outline-none resize-none text-slate-800 placeholder:text-slate-300 ${mono ? 'font-mono text-[12px]' : 'text-[14px]'}`}
    />
  )
}

function AlignButtons({ value, onChange }: { value: string; onChange: (v: 'left' | 'center' | 'right') => void }) {
  return (
    <div className="flex gap-1 mt-1">
      {(['left', 'center', 'right'] as const).map(a => (
        <button
          key={a}
          onClick={() => onChange(a)}
          className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${value === a ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
        >
          {a[0].toUpperCase() + a.slice(1)}
        </button>
      ))}
    </div>
  )
}

function ImageBlock({ block, onChange }: { block: Block; onChange: (b: Partial<Block>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const base64 = await new Promise<string>((res, rej) => {
        const reader = new FileReader()
        reader.onload = ev => res((ev.target?.result as string).split(',')[1])
        reader.onerror = rej
        reader.readAsDataURL(file)
      })
      const { data } = await api.post('/upload', { base64, mimeType: file.type, folder: 'pages' })
      onChange({ imageUrl: data.url })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {block.imageUrl ? (
        <div className="relative rounded-lg overflow-hidden">
          <img src={block.imageUrl} alt={block.imageAlt} className="w-full max-h-64 object-cover" />
          <button
            onClick={() => onChange({ imageUrl: '' })}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
          >
            <X size={11} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full py-8 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center gap-2 text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors disabled:opacity-60"
        >
          {uploading
            ? <><span className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" /><span className="text-[12px]">Uploading...</span></>
            : <><Upload size={18} strokeWidth={1.5} /><span className="text-[12px]">Click to upload image</span></>
          }
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      <input
        value={block.imageAlt ?? ''}
        onChange={e => onChange({ imageAlt: e.target.value })}
        placeholder="Alt text (for accessibility)"
        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-600 focus:outline-none focus:border-slate-400"
      />
      <input
        value={block.imageCaption ?? ''}
        onChange={e => onChange({ imageCaption: e.target.value })}
        placeholder="Caption (optional)"
        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] text-slate-600 focus:outline-none focus:border-slate-400"
      />
    </div>
  )
}

function ListBlock({ block, onChange }: { block: Block; onChange: (b: Partial<Block>) => void }) {
  const items = block.items ?? []
  const update = (i: number, val: string) => {
    const next = [...items]; next[i] = val; onChange({ items: next })
  }
  const add = () => onChange({ items: [...items, ''] })
  const remove = (i: number) => onChange({ items: items.filter((_, idx) => idx !== i) })

  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-slate-300 text-[12px] shrink-0">•</span>
          <input
            value={item}
            onChange={e => update(i, e.target.value)}
            className="flex-1 px-0 py-0.5 bg-transparent border-none outline-none text-[14px] text-slate-800 placeholder:text-slate-300"
            placeholder="List item"
          />
          <button onClick={() => remove(i)} className="text-slate-300 hover:text-red-400 transition-colors shrink-0">
            <X size={12} strokeWidth={2} />
          </button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-700 transition-colors mt-1">
        <Plus size={12} strokeWidth={2} /> Add item
      </button>
    </div>
  )
}

// ── Block renderer ────────────────────────────────────────────────────────────

function BlockEditor({ block, onChange }: { block: Block; onChange: (b: Partial<Block>) => void }) {
  const align = block.align ?? 'left'

  switch (block.type) {
    case 'heading':
      return (
        <div>
          <input
            value={block.text ?? ''}
            onChange={e => onChange({ text: e.target.value })}
            placeholder="Heading text"
            className={`w-full bg-transparent border-none outline-none text-[22px] font-bold text-slate-900 placeholder:text-slate-300 text-${align}`}
          />
          <AlignButtons value={align} onChange={v => onChange({ align: v })} />
        </div>
      )
    case 'subheading':
      return (
        <div>
          <input
            value={block.text ?? ''}
            onChange={e => onChange({ text: e.target.value })}
            placeholder="Subheading text"
            className={`w-full bg-transparent border-none outline-none text-[17px] font-semibold text-slate-800 placeholder:text-slate-300 text-${align}`}
          />
          <AlignButtons value={align} onChange={v => onChange({ align: v })} />
        </div>
      )
    case 'paragraph':
      return (
        <div>
          <TextareaField
            value={block.text ?? ''}
            onChange={v => onChange({ text: v })}
            rows={4}
            placeholder="Write your paragraph here..."
          />
          <AlignButtons value={align} onChange={v => onChange({ align: v })} />
        </div>
      )
    case 'quote':
      return (
        <div className="border-l-4 border-slate-300 pl-4">
          <TextareaField
            value={block.text ?? ''}
            onChange={v => onChange({ text: v })}
            rows={2}
            placeholder="Quote text..."
          />
          <AlignButtons value={align} onChange={v => onChange({ align: v })} />
        </div>
      )
    case 'list':
      return <ListBlock block={block} onChange={onChange} />
    case 'image':
      return <ImageBlock block={block} onChange={onChange} />
    case 'divider':
      return <hr className="border-slate-200 my-1" />
    case 'columns':
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-slate-100 rounded-lg p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-300 mb-1">Column 1</p>
            <TextareaField value={block.col1 ?? ''} onChange={v => onChange({ col1: v })} rows={4} placeholder="Column 1 content..." />
          </div>
          <div className="border border-slate-100 rounded-lg p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-300 mb-1">Column 2</p>
            <TextareaField value={block.col2 ?? ''} onChange={v => onChange({ col2: v })} rows={4} placeholder="Column 2 content..." />
          </div>
        </div>
      )
    case 'cta':
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              value={block.ctaText ?? ''}
              onChange={e => onChange({ ctaText: e.target.value })}
              placeholder="Button text"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-800 focus:outline-none focus:border-slate-400"
            />
            <input
              value={block.ctaUrl ?? ''}
              onChange={e => onChange({ ctaUrl: e.target.value })}
              placeholder="URL e.g. /products"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-600 focus:outline-none focus:border-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Style:</span>
            {(['filled', 'outline', 'ghost'] as const).map(s => (
              <button
                key={s}
                onClick={() => onChange({ ctaStyle: s })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${block.ctaStyle === s ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-400'}`}
              >
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
            <AlignButtons value={align} onChange={v => onChange({ align: v })} />
          </div>
        </div>
      )
    default:
      return null
  }
}

// ── Block type label ──────────────────────────────────────────────────────────

const BLOCK_LABELS: Record<BlockType, string> = {
  heading: 'Heading', subheading: 'Subheading', paragraph: 'Paragraph',
  quote: 'Quote', list: 'List', image: 'Image', divider: 'Divider',
  columns: '2 Columns', cta: 'CTA Button',
}

// ── Main canvas ───────────────────────────────────────────────────────────────

export default function BlockCanvas({ blocks, onChange }: Props) {
  const [addingAfter, setAddingAfter] = useState<string | null>(null)

  const update = (id: string, patch: Partial<Block>) =>
    onChange(blocks.map(b => b.id === id ? { ...b, ...patch } : b))

  const remove = (id: string) => onChange(blocks.filter(b => b.id !== id))

  const moveUp = (i: number) => {
    if (i === 0) return
    const next = [...blocks]; [next[i - 1], next[i]] = [next[i], next[i - 1]]; onChange(next)
  }

  const moveDown = (i: number) => {
    if (i === blocks.length - 1) return
    const next = [...blocks]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; onChange(next)
  }

  const addBlock = (type: BlockType, afterId: string) => {
    const idx = blocks.findIndex(b => b.id === afterId)
    const next = [...blocks]
    next.splice(idx + 1, 0, newBlock(type))
    onChange(next)
    setAddingAfter(null)
  }

  return (
    <div className="space-y-1">
      {blocks.map((block, i) => (
        <div key={block.id} className="group relative">
          {/* Block card */}
          <div className="flex gap-2 items-start">
            {/* Drag handle + controls */}
            <div className="flex flex-col items-center gap-0.5 pt-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <GripVertical size={14} className="text-slate-300 cursor-grab" />
              <button onClick={() => moveUp(i)} disabled={i === 0} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors">
                <ChevronUp size={12} strokeWidth={2} />
              </button>
              <button onClick={() => moveDown(i)} disabled={i === blocks.length - 1} className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors">
                <ChevronDown size={12} strokeWidth={2} />
              </button>
            </div>

            {/* Block content */}
            <div className="flex-1 bg-white rounded-xl border border-transparent group-hover:border-slate-200 px-4 py-3 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-300">
                  {BLOCK_LABELS[block.type]}
                </span>
                <button
                  onClick={() => remove(block.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={12} strokeWidth={1.8} />
                </button>
              </div>
              <BlockEditor block={block} onChange={patch => update(block.id, patch)} />
            </div>
          </div>

          {/* Add block button between blocks */}
          <div className="flex items-center justify-center h-6 opacity-0 group-hover:opacity-100 transition-opacity">
            {addingAfter === block.id ? (
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-sm flex-wrap">
                {ADD_BLOCK_TYPES.map(({ type, label, icon }) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type, block.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                    title={label}
                  >
                    <span className="text-[12px]">{icon}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
                <button onClick={() => setAddingAfter(null)} className="p-1 text-slate-300 hover:text-slate-600">
                  <X size={11} strokeWidth={2} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAddingAfter(block.id)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[11px] text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <Plus size={11} strokeWidth={2} /> Add block
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add block at end */}
      {blocks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 border-2 border-dashed border-slate-200 rounded-xl">
          <ImageIcon size={24} className="text-slate-300" strokeWidth={1.2} />
          <p className="text-[13px] text-slate-400">No blocks yet</p>
          <button
            onClick={() => setAddingAfter('__end')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12px] font-semibold hover:bg-slate-700 transition-colors"
          >
            <Plus size={13} strokeWidth={2} /> Add first block
          </button>
          {addingAfter === '__end' && (
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 shadow-sm flex-wrap justify-center">
              {ADD_BLOCK_TYPES.map(({ type, label, icon }) => (
                <button
                  key={type}
                  onClick={() => { onChange([newBlock(type)]); setAddingAfter(null) }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
