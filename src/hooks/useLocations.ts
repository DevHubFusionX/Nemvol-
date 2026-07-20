import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'
import type { Location } from '../dashboard/pages/Locations/LocationsList'

const KEY = ['locations']

export const useLocations = () =>
  useQuery<Location[]>({
    queryKey: KEY,
    queryFn: () => api.get('/locations').then(r => r.data),
  })

export const useAddLocation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Location, 'id'>) => api.post('/locations', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Location added') },
    onError: () => toast.error('Failed to add location'),
  })
}

export const useUpdateLocation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Location) => api.patch(`/locations/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Location saved') },
    onError: () => toast.error('Failed to save location'),
  })
}

export const useDeleteLocation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/locations/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Location removed') },
    onError: () => toast.error('Failed to remove location'),
  })
}
