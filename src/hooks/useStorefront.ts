import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

// ── Storefront Config ────────────────────────────────────────────────────────
export interface StorefrontConfig {
  theme: string
  published: string
  accentColor: string
  heroData?: string   // JSON
  slug: string
  name: string
  whatsapp?: string
}

export interface StorefrontStats {
  pageCount: number
  domainCount: number
  leadCount: number
}

export const useStorefrontConfig = () =>
  useQuery<StorefrontConfig>({
    queryKey: ['storefront-config'],
    queryFn: () => api.get('/storefront/config').then(r => r.data),
  })

export const useUpdateStorefrontConfig = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<StorefrontConfig>) =>
      api.put('/storefront/config', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['storefront-config'] })
      qc.invalidateQueries({ queryKey: ['store'] })
      toast.success('Storefront updated')
    },
    onError: () => toast.error('Failed to update storefront'),
  })
}

export const useStorefrontStats = () =>
  useQuery<StorefrontStats>({
    queryKey: ['storefront-stats'],
    queryFn: () => api.get('/storefront/stats').then(r => r.data),
  })

// ── Shipping Zones ──────────────────────────────────────────────────────────
export interface ShippingZone { id: string; name: string; regions?: string; rate: string; rateType: string }

export const useShippingZones = () =>
  useQuery<ShippingZone[]>({ queryKey: ['shipping'], queryFn: () => api.get('/shipping').then(r => r.data) })

export const useCreateShippingZone = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<ShippingZone, 'id'>) => api.post('/shipping', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['shipping'] }); toast.success('Shipping zone added') },
    onError: () => toast.error('Failed to add zone'),
  })
}

export const useDeleteShippingZone = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/shipping/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['shipping'] }); toast.success('Zone removed') },
    onError: () => toast.error('Failed to remove zone'),
  })
}

// ── Store Pages ─────────────────────────────────────────────────────────────
export interface StorePage { id: string; title: string; slug: string; content?: string; published: string; createdAt: string; isSystem?: boolean }

export const usePages = () =>
  useQuery<StorePage[]>({ queryKey: ['pages'], queryFn: () => api.get('/storefront/pages').then(r => r.data) })

export const useCreatePage = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<StorePage, 'id' | 'createdAt'>) => api.post('/storefront/pages', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pages'] }); toast.success('Page created') },
    onError: () => toast.error('Failed to create page'),
  })
}

export const useUpdatePage = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<StorePage> & { id: string }) =>
      api.patch(`/storefront/pages/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pages'] }); toast.success('Page updated') },
    onError: () => toast.error('Failed to update page'),
  })
}

export const useDeletePage = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/storefront/pages/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pages'] }); toast.success('Page deleted') },
    onError: () => toast.error('Failed to delete page'),
  })
}

// ── Domains ─────────────────────────────────────────────────────────────────
export interface Domain { id: string; domain: string; status: string; verificationToken?: string; verifiedAt?: string; dnsRecords?: { type: string; name: string; value: string }[] }

export const useDomains = () =>
  useQuery<Domain[]>({ queryKey: ['domains'], queryFn: () => api.get('/storefront/domains').then(r => r.data) })

export const useConnectDomain = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (domain: string) => api.post('/storefront/domains/connect', { domain }).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['domains'] }); toast.success('Domain connected — add DNS records') },
    onError: () => toast.error('Failed to connect domain'),
  })
}

export const useDeleteDomain = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/storefront/domains/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['domains'] }); toast.success('Domain removed') },
    onError: () => toast.error('Failed to remove domain'),
  })
}

// ── Leads ────────────────────────────────────────────────────────────────────
export interface Lead { id: string; email?: string; phone?: string; name?: string; source?: string; createdAt: string }

export const useLeads = () =>
  useQuery<Lead[]>({ queryKey: ['leads'], queryFn: () => api.get('/storefront/leads').then(r => r.data) })
