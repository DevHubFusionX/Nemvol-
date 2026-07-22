import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface ShippingZone {
  id: string
  name: string
  regions: string   // JSON string of string[]
  rateType: string  // flat | free | weight
  rate: string
  minOrderFree?: string | null
  minWeight?: string | null
  maxWeight?: string | null
  weightRate?: string | null
  createdAt: string
}

export interface ShippingSettings {
  shippingEnabled: boolean
  deliveryMode: string
}

const SETTINGS_KEY = ['shipping-settings']
const ZONES_KEY = ['shipping-zones']

export const useShippingSettings = () =>
  useQuery<ShippingSettings>({
    queryKey: SETTINGS_KEY,
    queryFn: () => api.get('/shipping/settings').then(r => r.data),
  })

export const useSaveShippingSettings = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<ShippingSettings>) => api.patch('/shipping/settings', data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: SETTINGS_KEY }),
    onError: () => toast.error('Failed to save settings'),
  })
}

export const useShippingZones = () =>
  useQuery<ShippingZone[]>({
    queryKey: ZONES_KEY,
    queryFn: () => api.get('/shipping').then(r => r.data),
  })

export const useAddShippingZone = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<ShippingZone, 'id' | 'createdAt' | 'regions'> & { regions: string[] }) =>
      api.post('/shipping', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ZONES_KEY }); toast.success('Shipping zone added') },
    onError: () => toast.error('Failed to add zone'),
  })
}

export const useUpdateShippingZone = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Omit<Partial<ShippingZone>, 'regions'> & { id: string; regions?: string[] }) =>
      api.patch(`/shipping/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ZONES_KEY }); toast.success('Zone updated') },
    onError: () => toast.error('Failed to update zone'),
  })
}

export const useDeleteShippingZone = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/shipping/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ZONES_KEY }); toast.success('Zone removed') },
    onError: () => toast.error('Failed to remove zone'),
  })
}
