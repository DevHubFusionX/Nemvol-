import { useState } from 'react'
import InvoicesHeader from './InvoicesHeader'
import InvoicesStats from './InvoicesStats'
import InvoicesToolbar, { type InvoiceFilter } from './InvoicesToolbar'
import InvoicesTable from './InvoicesTable'
import CreateInvoiceDrawer from './modals/CreateInvoiceDrawer'
import { useInvoices } from '../../../hooks/useInvoices'
import { useDebounce } from '../../../hooks/useDebounce'

function exportCSV(rows: { invoiceNumber: string; customerName?: string; customerEmail?: string; status: string; total: string; createdAt: string; dueDate?: string }[]) {
  const header = 'Invoice #,Customer,Email,Status,Total,Issued,Due Date'
  const lines = rows.map(r => [
    r.invoiceNumber,
    r.customerName ?? '',
    r.customerEmail ?? '',
    r.status,
    r.total,
    new Date(r.createdAt).toLocaleDateString(),
    r.dueDate ? new Date(r.dueDate).toLocaleDateString() : '',
  ].map(v => `"${v}"`).join(','))
  const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = 'invoices.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function Invoices() {
  const [filter, setFilter] = useState<InvoiceFilter>('all')
  const [q, setQ] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { data } = useInvoices()
  const debouncedQ = useDebounce(q)

  return (
    <div className="space-y-5">
      <InvoicesHeader onCreate={() => setDrawerOpen(true)} onExport={() => exportCSV(data?.data ?? [])} />
      <InvoicesStats />
      <InvoicesToolbar filter={filter} onFilter={setFilter} q={q} onSearch={setQ} />
      <InvoicesTable filter={filter} q={debouncedQ} />
      <CreateInvoiceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
