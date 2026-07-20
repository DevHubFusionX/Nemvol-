import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface Category {
  id: string
  storeId: string
  name: string
  slug: string
  parentId?: string
}

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then(r => r.data),
  })

export const useCreateCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; slug: string }) => api.post('/categories', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['categories'] }); toast.success('Category added') },
    onError: (err: any) => {
      const msg = err?.response?.data?.error
      toast.error(msg ?? 'Failed to add category')
    },
  })
}

export const useDeleteCategory = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['categories'] }); toast.success('Category deleted') },
    onError: () => toast.error('Failed to delete category'),
  })
}
