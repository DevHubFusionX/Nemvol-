import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface ToolsConfig {
  whatsapp: string
  trackers: Record<string, string>
  toolsConfig: {
    whatsappEnabled?: boolean
    accessGate?: {
      enabled: boolean
      fields: string[]           // e.g. ['Full Name', 'Email Address', 'Phone Number']
      title?: string
      description?: string
      buttonLabel?: string
      accessDuration?: number    // days
      showInstagram?: boolean
      deduplicateBy?: string[]   // ['email', 'phone', 'instagram']
    }
  }
}

export interface ToolLead {
  id: string
  name?: string
  email?: string
  phone?: string
  source?: string
  createdAt: string
}

export const useToolsConfig = () =>
  useQuery<ToolsConfig>({
    queryKey: ['tools-config'],
    queryFn: () => api.get('/tools/config').then(r => r.data),
  })

export const useSaveWhatsapp = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { whatsapp?: string; whatsappEnabled?: boolean }) =>
      api.patch('/tools/whatsapp', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tools-config'] })
      toast.success('WhatsApp settings saved')
    },
    onError: () => toast.error('Failed to save WhatsApp settings'),
  })
}

export const useSaveTrackers = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Record<string, string>) =>
      api.put('/tools/trackers', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tools-config'] })
      toast.success('Tracker saved')
    },
    onError: () => toast.error('Failed to save tracker'),
  })
}

export const useSaveAccessGate = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: {
      enabled: boolean
      fields: string[]
      title?: string
      description?: string
      buttonLabel?: string
      accessDuration?: number
      showInstagram?: boolean
      deduplicateBy?: string[]
    }) => api.put('/tools/access-gate', data).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tools-config'] })
      toast.success('Access gate configured')
    },
    onError: () => toast.error('Failed to save access gate'),
  })
}

export const useToolLeads = (q?: string) =>
  useQuery<{ data: ToolLead[]; total: number }>({
    queryKey: ['tool-leads', q],
    queryFn: () => api.get('/tools/leads', { params: q ? { q } : {} }).then(r => r.data),
  })

export const useDeleteToolLead = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/tools/leads/${id}`).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tool-leads'] })
      toast.success('Lead removed')
    },
    onError: () => toast.error('Failed to remove lead'),
  })
}
