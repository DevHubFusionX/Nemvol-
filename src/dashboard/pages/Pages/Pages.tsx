import { useState } from 'react'
import PagesHeader from './PagesHeader'
import PagesStats from './PagesStats'
import PagesList from './PagesList'
import PageEditor from './editor/PageEditor'
import { usePages, type StorePage } from '../../../hooks/useStorefront'

const SYSTEM_PAGES: StorePage[] = [
  { id: '__about',   title: 'About Us',           slug: 'about',              published: 'false', createdAt: '', isSystem: true },
  { id: '__refund',  title: 'Refund Policy',       slug: 'refund-policy',      published: 'false', createdAt: '', isSystem: true },
  { id: '__terms',   title: 'Terms & Conditions',  slug: 'terms',              published: 'false', createdAt: '', isSystem: true },
  { id: '__privacy', title: 'Privacy Policy',      slug: 'privacy-policy',     published: 'false', createdAt: '', isSystem: true },
  { id: '__contact', title: 'Contact Us',          slug: 'contact',            published: 'false', createdAt: '', isSystem: true },
  { id: '__faq',     title: 'FAQ',                 slug: 'faq',                published: 'false', createdAt: '', isSystem: true },
]

export default function Pages() {
  const { data: apiPages = [] } = usePages()
  const [editorMode, setEditorMode] = useState<'add' | 'edit' | null>(null)
  const [editPage, setEditPage] = useState<StorePage | null>(null)

  const allPages: StorePage[] = [
    ...SYSTEM_PAGES,
    ...apiPages.map(p => ({ ...p, isSystem: false })),
  ]

  const total     = allPages.length
  const published = allPages.filter(p => p.published === 'true').length
  const drafts    = allPages.filter(p => p.published === 'false').length

  const handleEdit = (page: StorePage) => {
    setEditPage(page)
    setEditorMode('edit')
  }

  const handleClose = () => {
    setEditorMode(null)
    setEditPage(null)
  }

  if (editorMode) {
    return (
      <PageEditor
        mode={editorMode}
        page={editPage}
        onClose={handleClose}
      />
    )
  }

  return (
    <div className="space-y-5">
      <PagesHeader onAdd={() => setEditorMode('add')} />
      <PagesStats total={total} published={published} drafts={drafts} />
      <PagesList pages={allPages} onEdit={handleEdit} />
    </div>
  )
}
