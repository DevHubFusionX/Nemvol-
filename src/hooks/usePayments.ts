import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface PaymentStats {
  totalRevenue: number
  pendingPayouts: number
  completedPayouts: number
  failedCount: number
}

export interface Transaction {
  id: string
  orderNumber: string
  status: string
  total: string
  currency: string
  createdAt: string
  customer?: { firstName?: string; lastName?: string; email?: string }
}

export interface Expense {
  id: string
  title: string
  amount: string
  category: string
  date?: string
  note?: string
  createdAt: string
}

export interface PaymentMethodsConfig {
  cards?: { enabled: boolean }
  transfer?: { enabled: boolean; bankName?: string; accountName?: string; accountNumber?: string }
  pod?: { enabled: boolean }
}

export const usePaymentStats = () =>
  useQuery<PaymentStats>({
    queryKey: ['payment-stats'],
    queryFn: () => api.get('/payments/stats').then(r => r.data),
  })

export const useTransactions = (params?: { status?: string; q?: string; date?: string }) =>
  useQuery<{ data: Transaction[]; total: number }>({
    queryKey: ['transactions', params],
    queryFn: () => api.get('/payments/transactions', { params }).then(r => r.data),
  })

export const usePaymentMethods = () =>
  useQuery<{ methods: PaymentMethodsConfig }>({
    queryKey: ['payment-methods'],
    queryFn: () => api.get('/payments/methods').then(r => r.data),
  })

export const useSavePaymentMethods = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (methods: PaymentMethodsConfig) =>
      api.put('/payments/methods', { methods }).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['payment-methods'] })
      toast.success('Payment methods saved')
    },
    onError: () => toast.error('Failed to save payment methods'),
  })
}

export const useExpenses = () =>
  useQuery<{ data: Expense[]; total: number }>({
    queryKey: ['expenses'],
    queryFn: () => api.get('/payments/expenses').then(r => r.data),
  })

export const useLogExpense = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Expense, 'id' | 'createdAt'>) =>
      api.post('/payments/expenses', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] })
      qc.invalidateQueries({ queryKey: ['payment-stats'] })
      toast.success('Expense logged')
    },
    onError: () => toast.error('Failed to log expense'),
  })
}

export const useDeleteExpense = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/payments/expenses/${id}`).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] })
      qc.invalidateQueries({ queryKey: ['payment-stats'] })
      toast.success('Expense deleted')
    },
    onError: () => toast.error('Failed to delete expense'),
  })
}
