import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface Supplier {
  id: string
  name: string
  email?: string
  phone?: string
}

export interface Purchase {
  id: string
  supplierId?: string
  supplier?: Supplier
  status: string
  total: string
  createdAt: string
}

export interface CreatePurchaseInput {
  supplierId?: string
  status?: string
  total: string
  items?: string
  notes?: string
  expectedDate?: string
}

export const usePurchases = (status?: string, search?: string) =>
  useQuery<{ data: Purchase[]; total: number }>({
    queryKey: ['purchases', status, search],
    queryFn: () => {
      const params: Record<string, string> = {}
      if (status && status !== 'all') params.status = status
      if (search) params.q = search
      return api.get('/purchases', { params }).then(r => r.data)
    },
  })

export const useCreatePurchase = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePurchaseInput) => api.post('/purchases', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['purchases'] }); toast.success('Purchase order created') },
    onError: () => toast.error('Failed to create purchase'),
  })
}

// Fix 4: optimistic status update
export const useUpdatePurchaseStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/purchases/${id}/status`, { status }).then(r => r.data),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ['purchases'] })
      const prev = qc.getQueriesData<{ data: Purchase[]; total: number }>({ queryKey: ['purchases'] })
      qc.setQueriesData<{ data: Purchase[]; total: number }>({ queryKey: ['purchases'] }, (old) =>
        old ? { ...old, data: old.data.map(p => p.id === id ? { ...p, status } : p) } : old
      )
      return { prev }
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev.forEach(([key, data]) => qc.setQueryData(key, data))
      toast.error('Failed to update status')
    },
    onSettled: () => { qc.invalidateQueries({ queryKey: ['purchases'] }); toast.success('Status updated') },
  })
}

// Fix 4: optimistic delete
export const useDeletePurchase = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/purchases/${id}`).then(r => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['purchases'] })
      const prev = qc.getQueriesData<{ data: Purchase[]; total: number }>({ queryKey: ['purchases'] })
      qc.setQueriesData<{ data: Purchase[]; total: number }>({ queryKey: ['purchases'] }, (old) =>
        old ? { ...old, data: old.data.filter(p => p.id !== id), total: old.total - 1 } : old
      )
      return { prev }
    },
    onError: (_e, _id, ctx) => {
      ctx?.prev.forEach(([key, data]) => qc.setQueryData(key, data))
      toast.error('Failed to delete purchase')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['purchases'] }),
  })
}

export const useSuppliers = () =>
  useQuery<Supplier[]>({
    queryKey: ['suppliers'],
    queryFn: () => api.get('/purchases/suppliers').then(r => r.data),
  })

export const useCreateSupplier = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Supplier, 'id'>) => api.post('/purchases/suppliers', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['suppliers'] }); toast.success('Supplier added') },
    onError: () => toast.error('Failed to add supplier'),
  })
}

// Fix 4: optimistic delete
export const useDeleteSupplier = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/purchases/suppliers/${id}`).then(r => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['suppliers'] })
      const prev = qc.getQueryData<Supplier[]>(['suppliers'])
      qc.setQueryData<Supplier[]>(['suppliers'], (old) => old?.filter(s => s.id !== id) ?? [])
      return { prev }
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(['suppliers'], ctx.prev)
      toast.error('Failed to remove supplier')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['suppliers'] }),
  })
}
