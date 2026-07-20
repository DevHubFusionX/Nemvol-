import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface StoreData {
  id: string; name: string; slug: string; tagline?: string; logoUrl?: string
  phone?: string; whatsapp?: string; address?: string; country?: string
  state?: string; currency?: string; theme?: string; published?: string
  accentColor?: string; heroData?: string; socialLinks?: string
}

export const useStore = () =>
  useQuery<StoreData>({
    queryKey: ['store'],
    queryFn: () => api.get('/store').then(r => r.data),
  })

export const useUpdateStore = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<StoreData>) => api.patch('/store', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['store'] }); toast.success('Store saved') },
    onError: () => toast.error('Failed to save store'),
  })
}

export const useUploadLogo = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file: File) =>
      new Promise<{ logoUrl: string }>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (ev) => {
          const dataUrl = ev.target?.result as string
          const [meta, logoBase64] = dataUrl.split(',')
          const mimeType = meta.split(':')[1].split(';')[0]
          try {
            const res = await api.post('/store/logo', { logoBase64, mimeType })
            resolve(res.data)
          } catch (e) { reject(e) }
        }
        reader.readAsDataURL(file)
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['store'] }),
    onError: () => toast.error('Failed to upload logo'),
  })
}
