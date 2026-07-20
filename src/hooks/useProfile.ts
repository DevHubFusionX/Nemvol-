import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface ProfileData {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  avatarUrl?: string | null
}

const KEY = ['profile']

export const useProfile = () =>
  useQuery<ProfileData>({
    queryKey: KEY,
    queryFn: () => api.get('/profile').then(r => r.data),
  })

export const useUpdateProfile = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: { firstName?: string; lastName?: string; phone?: string }) =>
      api.patch('/profile', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Profile saved') },
    onError: () => toast.error('Failed to save profile'),
  })
}

export const useUploadAvatar = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file: File) =>
      new Promise<{ avatarUrl: string }>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (ev) => {
          const dataUrl = ev.target?.result as string
          const [meta, avatarBase64] = dataUrl.split(',')
          const mimeType = meta.split(':')[1].split(';')[0]
          try {
            const res = await api.post('/profile/avatar', { avatarBase64, mimeType })
            resolve(res.data)
          } catch (e) { reject(e) }
        }
        reader.readAsDataURL(file)
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
    onError: () => toast.error('Failed to upload photo'),
  })
}

export const useChangePassword = () =>
  useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      api.post('/profile/password', data).then(r => r.data),
    onSuccess: () => toast.success('Password updated'),
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      toast.error(msg ?? 'Failed to update password')
    },
  })
