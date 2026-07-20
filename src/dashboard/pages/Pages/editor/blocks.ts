// ── Block type definitions ────────────────────────────────────────────────────

export type BlockType =
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'image'
  | 'divider'
  | 'cta'
  | 'columns'
  | 'quote'
  | 'list'

export interface Block {
  id: string
  type: BlockType
  // heading / subheading / paragraph / quote
  text?: string
  // image
  imageUrl?: string
  imageAlt?: string
  imageCaption?: string
  // cta
  ctaText?: string
  ctaUrl?: string
  ctaStyle?: 'filled' | 'outline' | 'ghost'
  // columns (2 col — each col is a paragraph)
  col1?: string
  col2?: string
  // list
  items?: string[]
  // shared style
  align?: 'left' | 'center' | 'right'
}

function id() {
  return Math.random().toString(36).slice(2, 9)
}

// ── Pre-built layout templates ────────────────────────────────────────────────

export interface LayoutTemplate {
  id: string
  label: string
  description: string
  icon: string          // emoji used in the picker
  blocks: Block[]
}

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'blank',
    label: 'Blank',
    description: 'Start from scratch',
    icon: '📄',
    blocks: [
      { id: id(), type: 'heading', text: 'Page Title', align: 'left' },
      { id: id(), type: 'paragraph', text: 'Start writing your content here...', align: 'left' },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    description: 'Brand story with intro and values',
    icon: '🏢',
    blocks: [
      { id: id(), type: 'heading', text: 'About Us', align: 'center' },
      { id: id(), type: 'paragraph', text: 'We are a passionate team dedicated to bringing you the best products. Our story started with a simple idea — quality should be accessible to everyone.', align: 'center' },
      { id: id(), type: 'divider' },
      { id: id(), type: 'subheading', text: 'Our Mission', align: 'left' },
      { id: id(), type: 'paragraph', text: 'To deliver exceptional products with outstanding customer service, building lasting relationships with every customer we serve.', align: 'left' },
      { id: id(), type: 'subheading', text: 'Our Values', align: 'left' },
      { id: id(), type: 'columns', col1: '✦ Quality First\nWe never compromise on the quality of our products.', col2: '✦ Customer Focus\nYour satisfaction is our top priority, always.' },
      { id: id(), type: 'cta', ctaText: 'Shop Our Products', ctaUrl: '/products', ctaStyle: 'filled', align: 'center' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    description: 'Contact info and reach-out details',
    icon: '📬',
    blocks: [
      { id: id(), type: 'heading', text: 'Contact Us', align: 'center' },
      { id: id(), type: 'paragraph', text: "We'd love to hear from you. Reach out through any of the channels below and we'll get back to you as soon as possible.", align: 'center' },
      { id: id(), type: 'divider' },
      { id: id(), type: 'subheading', text: 'Get In Touch', align: 'left' },
      { id: id(), type: 'columns', col1: '📧 Email\nhello@yourstore.com\n\n📞 Phone\n+234 800 000 0000', col2: '📍 Address\n123 Store Street\nLagos, Nigeria\n\n🕐 Hours\nMon–Fri: 9am – 6pm' },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions layout',
    icon: '❓',
    blocks: [
      { id: id(), type: 'heading', text: 'Frequently Asked Questions', align: 'center' },
      { id: id(), type: 'paragraph', text: 'Find answers to the most common questions about our products and services.', align: 'center' },
      { id: id(), type: 'divider' },
      { id: id(), type: 'subheading', text: 'How long does delivery take?', align: 'left' },
      { id: id(), type: 'paragraph', text: 'Standard delivery takes 3–5 business days. Express delivery is available at checkout for next-day delivery.', align: 'left' },
      { id: id(), type: 'subheading', text: 'What is your return policy?', align: 'left' },
      { id: id(), type: 'paragraph', text: 'We offer a 30-day return policy on all items. Products must be in original condition with tags attached.', align: 'left' },
      { id: id(), type: 'subheading', text: 'How do I track my order?', align: 'left' },
      { id: id(), type: 'paragraph', text: 'Once your order ships, you will receive a tracking number via email. Use it on our tracking page to follow your delivery.', align: 'left' },
      { id: id(), type: 'subheading', text: 'Do you ship internationally?', align: 'left' },
      { id: id(), type: 'paragraph', text: 'Yes! We ship to over 30 countries. International shipping rates and times vary by destination.', align: 'left' },
    ],
  },
  {
    id: 'policy',
    label: 'Policy',
    description: 'Terms, privacy or refund policy',
    icon: '📋',
    blocks: [
      { id: id(), type: 'heading', text: 'Refund Policy', align: 'left' },
      { id: id(), type: 'paragraph', text: 'Last updated: ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), align: 'left' },
      { id: id(), type: 'divider' },
      { id: id(), type: 'subheading', text: '1. Returns', align: 'left' },
      { id: id(), type: 'paragraph', text: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging. To initiate a return, contact our support team.', align: 'left' },
      { id: id(), type: 'subheading', text: '2. Refunds', align: 'left' },
      { id: id(), type: 'paragraph', text: 'Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds are processed within 5–7 business days.', align: 'left' },
      { id: id(), type: 'subheading', text: '3. Exchanges', align: 'left' },
      { id: id(), type: 'paragraph', text: 'We only replace items if they are defective or damaged. If you need an exchange, contact us at support@yourstore.com.', align: 'left' },
    ],
  },
  {
    id: 'landing',
    label: 'Landing',
    description: 'Promo page with image and CTA',
    icon: '🚀',
    blocks: [
      { id: id(), type: 'heading', text: 'Special Offer', align: 'center' },
      { id: id(), type: 'paragraph', text: 'Discover our exclusive collection — limited time only. Premium quality at unbeatable prices.', align: 'center' },
      { id: id(), type: 'image', imageUrl: '', imageAlt: 'Promo image', imageCaption: 'Our latest collection' },
      { id: id(), type: 'divider' },
      { id: id(), type: 'subheading', text: 'Why Choose Us?', align: 'center' },
      { id: id(), type: 'columns', col1: '🚚 Free Shipping\nOn all orders over ₦10,000', col2: '🔒 Secure Payment\n100% safe & encrypted checkout' },
      { id: id(), type: 'cta', ctaText: 'Shop the Collection', ctaUrl: '/products', ctaStyle: 'filled', align: 'center' },
    ],
  },
]

// ── Serialise blocks → HTML (for storage & storefront rendering) ──────────────

export function blocksToHtml(blocks: Block[]): string {
  return blocks.map(b => {
    const align = b.align ?? 'left'
    const aStyle = `text-align:${align}`

    switch (b.type) {
      case 'heading':
        return `<h1 style="${aStyle}">${b.text ?? ''}</h1>`
      case 'subheading':
        return `<h2 style="${aStyle}">${b.text ?? ''}</h2>`
      case 'paragraph':
        return `<p style="${aStyle}">${(b.text ?? '').replace(/\n/g, '<br/>')}</p>`
      case 'quote':
        return `<blockquote style="${aStyle}">${b.text ?? ''}</blockquote>`
      case 'list':
        return `<ul>${(b.items ?? []).map(i => `<li>${i}</li>`).join('')}</ul>`
      case 'image':
        return b.imageUrl
          ? `<figure><img src="${b.imageUrl}" alt="${b.imageAlt ?? ''}" style="max-width:100%"/>${b.imageCaption ? `<figcaption>${b.imageCaption}</figcaption>` : ''}</figure>`
          : ''
      case 'divider':
        return `<hr/>`
      case 'cta':
        return `<div style="${aStyle}"><a href="${b.ctaUrl ?? '#'}" class="page-cta page-cta--${b.ctaStyle ?? 'filled'}">${b.ctaText ?? 'Click here'}</a></div>`
      case 'columns':
        return `<div class="page-columns"><div class="page-col">${(b.col1 ?? '').replace(/\n/g, '<br/>')}</div><div class="page-col">${(b.col2 ?? '').replace(/\n/g, '<br/>')}</div></div>`
      default:
        return ''
    }
  }).join('\n')
}

// ── Parse HTML back to blocks (best-effort for editing saved pages) ───────────

export function htmlToBlocks(html: string): Block[] {
  if (!html?.trim()) return []
  // Simple line-by-line tag detection — good enough for our own generated HTML
  const lines = html.split('\n').filter(l => l.trim())
  const blocks: Block[] = []

  for (const line of lines) {
    const t = line.trim()
    if (t.startsWith('<h1')) {
      blocks.push({ id: id(), type: 'heading', text: t.replace(/<[^>]+>/g, ''), align: 'left' })
    } else if (t.startsWith('<h2')) {
      blocks.push({ id: id(), type: 'subheading', text: t.replace(/<[^>]+>/g, ''), align: 'left' })
    } else if (t.startsWith('<p')) {
      blocks.push({ id: id(), type: 'paragraph', text: t.replace(/<br\/>/g, '\n').replace(/<[^>]+>/g, ''), align: 'left' })
    } else if (t.startsWith('<blockquote')) {
      blocks.push({ id: id(), type: 'quote', text: t.replace(/<[^>]+>/g, ''), align: 'left' })
    } else if (t.startsWith('<hr')) {
      blocks.push({ id: id(), type: 'divider' })
    } else if (t.includes('page-cta')) {
      const text = t.replace(/<[^>]+>/g, '')
      const style = t.includes('outline') ? 'outline' : t.includes('ghost') ? 'ghost' : 'filled'
      blocks.push({ id: id(), type: 'cta', ctaText: text, ctaUrl: '#', ctaStyle: style, align: 'center' })
    }
  }

  return blocks.length ? blocks : [{ id: id(), type: 'paragraph', text: html.replace(/<[^>]+>/g, ''), align: 'left' }]
}
