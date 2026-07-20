import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface GiftCard {
  id: string
  storeId: string
  code: string
  value: string
  quantity: string
  status: string
  expiresAt?: string
  message?: string
  createdAt: string
}

export const useGiftCards = () =>
  useQuery<GiftCard[]>({
    queryKey: ['gift-cards'],
    queryFn: () => api.get('/gift-cards').then(r => r.data),
  })

export const useCreateGiftCards = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { value: string; quantity: string; expiresAt?: string; message?: string }) =>
      api.post('/gift-cards', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['gift-cards'] }); toast.success('Gift card(s) created') },
    onError: () => toast.error('Failed to create gift card'),
  })
}

export const useDeleteGiftCard = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/gift-cards/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['gift-cards'] }); toast.success('Gift card deleted') },
    onError: () => toast.error('Failed to delete gift card'),
  })
}
