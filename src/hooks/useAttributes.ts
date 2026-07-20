import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface ProductAttribute {
  id: string
  storeId: string
  name: string
  type: string
  values: string
  createdAt: string
}

export const useAttributes = () =>
  useQuery<ProductAttribute[]>({
    queryKey: ['attributes'],
    queryFn: () => api.get('/attributes').then(r => r.data),
  })

export const useCreateAttribute = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { name: string; type: string; values: string[] }) =>
      api.post('/attributes', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['attributes'] }); toast.success('Attribute added') },
    onError: () => toast.error('Failed to add attribute'),
  })
}

export const useDeleteAttribute = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/attributes/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['attributes'] }); toast.success('Attribute deleted') },
    onError: () => toast.error('Failed to delete attribute'),
  })
}
