import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface OrderLine {
  id: string; productName: string; variantLabel?: string
  quantity: string; unitPrice: string; lineTotal: string
}

export interface OrderCustomer {
  id: string; firstName?: string | null; lastName?: string | null; email?: string | null; phone?: string | null
}

export interface Order {
  id: string; orderNumber: string; status: string; subtotal: string
  shippingCost: string; total: string; currency: string
  shippingAddress?: string; notes?: string; couponCode?: string
  createdAt: string; updatedAt: string
  customerId?: string; customer?: OrderCustomer | null; lines: OrderLine[]
}

export interface CreateOrderInput {
  customerId?: string; subtotal: string; shippingCost?: string; total: string
  shippingAddress?: string; notes?: string; couponCode?: string
  lines: Omit<OrderLine, 'id'>[]
}

export const useOrders = (params?: { status?: string; q?: string }) =>
  useQuery<{ data: Order[]; total: number }>({
    queryKey: ['orders', params],
    queryFn: () => api.get('/orders', { params }).then(r => r.data),
  })

export const useCreateOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateOrderInput) => api.post('/orders', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['orders'] }); toast.success('Order created') },
    onError: () => toast.error('Failed to create order'),
  })
}

// Fix 4: optimistic status update
export const useUpdateOrderStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/orders/${id}/status`, { status }).then(r => r.data),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: ['orders'] })
      const prev = qc.getQueriesData<{ data: Order[]; total: number }>({ queryKey: ['orders'] })
      qc.setQueriesData<{ data: Order[]; total: number }>({ queryKey: ['orders'] }, (old) =>
        old ? { ...old, data: old.data.map(o => o.id === id ? { ...o, status } : o) } : old
      )
      return { prev }
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev.forEach(([key, data]) => qc.setQueryData(key, data))
      toast.error('Failed to update order')
    },
    onSettled: () => { qc.invalidateQueries({ queryKey: ['orders'] }); toast.success('Order updated') },
  })
}
