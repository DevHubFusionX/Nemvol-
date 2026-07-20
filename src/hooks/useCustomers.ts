import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface Customer {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  totalOrders: string
  totalSpent: string
  createdAt: string
}

export const useCustomers = (q?: string) =>
  useQuery<{ data: Customer[]; total: number }>({
    queryKey: ['customers', q],
    queryFn: () => api.get('/customers', { params: q ? { q } : {} }).then(r => r.data),
  })

export const useCreateCustomer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'createdAt'>) =>
      api.post('/customers', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['customers'] }); toast.success('Customer added') },
    onError: () => toast.error('Failed to add customer'),
  })
}

export const useUpdateCustomer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Customer> & { id: string }) =>
      api.patch(`/customers/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['customers'] }); toast.success('Customer updated') },
    onError: () => toast.error('Failed to update customer'),
  })
}

// Fix 4: optimistic delete
export const useDeleteCustomer = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/customers/${id}`).then(r => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['customers'] })
      const prev = qc.getQueriesData<{ data: Customer[]; total: number }>({ queryKey: ['customers'] })
      qc.setQueriesData<{ data: Customer[]; total: number }>({ queryKey: ['customers'] }, (old) =>
        old ? { ...old, data: old.data.filter(c => c.id !== id), total: old.total - 1 } : old
      )
      return { prev }
    },
    onError: (_e, _id, ctx) => {
      ctx?.prev.forEach(([key, data]) => qc.setQueryData(key, data))
      toast.error('Failed to remove customer')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['customers'] }),
  })
}

export const useImportCustomers = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (rows: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'createdAt'>[]) =>
      api.post('/customers/import', { rows }).then(r => r.data),
    onSuccess: (data: { imported: number }) => {
      qc.invalidateQueries({ queryKey: ['customers'] })
      toast.success(`${data.imported} customers imported`)
    },
    onError: () => toast.error('Import failed'),
  })
}
