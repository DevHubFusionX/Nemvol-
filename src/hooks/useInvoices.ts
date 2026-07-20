import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface InvoiceLineItem {
  description: string
  qty: number
  price: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId?: string
  orderId?: string
  customerName?: string
  customerEmail?: string
  status: string
  total: string
  lineItems?: string
  note?: string
  dueDate?: string
  createdAt: string
}

export interface InvoiceStats {
  total: number
  paid: number
  unpaid: number
  overdue: number
}

export const useInvoiceStats = () =>
  useQuery<InvoiceStats>({
    queryKey: ['invoice-stats'],
    queryFn: () => api.get('/invoices/stats').then(r => r.data),
  })

export const useInvoices = (status?: string, q?: string) =>
  useQuery<{ data: Invoice[]; total: number }>({
    queryKey: ['invoices', status, q],
    queryFn: () => api.get('/invoices', { params: { ...(status ? { status } : {}), ...(q ? { q } : {}) } }).then(r => r.data),
  })

export const useCreateInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: {
      customerName: string; customerEmail: string; dueDate?: string
      total: string; lineItems?: string; note?: string; status?: string; orderId?: string
    }) => api.post('/invoices', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] })
      qc.invalidateQueries({ queryKey: ['invoice-stats'] })
      toast.success('Invoice created')
    },
    onError: () => toast.error('Failed to create invoice'),
  })
}

// Fix 4: optimistic status update
export const useUpdateInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Invoice> & { id: string }) =>
      api.patch(`/invoices/${id}`, data).then(r => r.data),
    onMutate: async ({ id, ...data }) => {
      await qc.cancelQueries({ queryKey: ['invoices'] })
      const prev = qc.getQueriesData<{ data: Invoice[]; total: number }>({ queryKey: ['invoices'] })
      qc.setQueriesData<{ data: Invoice[]; total: number }>({ queryKey: ['invoices'] }, (old) =>
        old ? { ...old, data: old.data.map(inv => inv.id === id ? { ...inv, ...data } : inv) } : old
      )
      return { prev }
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev.forEach(([key, d]) => qc.setQueryData(key, d))
      toast.error('Failed to update invoice')
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] })
      qc.invalidateQueries({ queryKey: ['invoice-stats'] })
      toast.success('Invoice updated')
    },
  })
}

// Fix 4: optimistic delete
export const useDeleteInvoice = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/invoices/${id}`).then(r => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['invoices'] })
      const prev = qc.getQueriesData<{ data: Invoice[]; total: number }>({ queryKey: ['invoices'] })
      qc.setQueriesData<{ data: Invoice[]; total: number }>({ queryKey: ['invoices'] }, (old) =>
        old ? { ...old, data: old.data.filter(inv => inv.id !== id), total: old.total - 1 } : old
      )
      return { prev }
    },
    onError: (_e, _id, ctx) => {
      ctx?.prev.forEach(([key, d]) => qc.setQueryData(key, d))
      toast.error('Failed to delete invoice')
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] })
      qc.invalidateQueries({ queryKey: ['invoice-stats'] })
      toast.success('Invoice deleted')
    },
  })
}
