import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface Review {
  id: string
  productId?: string
  productName: string
  customerName: string
  customerEmail?: string
  rating: string
  body?: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export interface ReviewFilters {
  status?: string
  rating?: 'low' | 'high'
  q?: string
}

export const useReviews = (filters?: ReviewFilters) =>
  useQuery<{ data: Review[]; total: number }>({
    queryKey: ['reviews', filters],
    queryFn: () => api.get('/reviews', { params: filters }).then(r => r.data),
  })

export const useUpdateReviewStatus = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'approved' | 'rejected' }) =>
      api.patch(`/reviews/${id}/status`, { status }).then(r => r.data),
    onSuccess: (_d, { status }) => {
      qc.invalidateQueries({ queryKey: ['reviews'] })
      toast.success(status === 'approved' ? 'Review approved' : 'Review rejected')
    },
    onError: () => toast.error('Failed to update review'),
  })
}

export const useDeleteReview = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/reviews/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['reviews'] }); toast.success('Review deleted') },
    onError: () => toast.error('Failed to delete review'),
  })
}
