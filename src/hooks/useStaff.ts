import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'
import type { StaffMember } from '../dashboard/pages/Staffs/StaffsList'

const KEY = ['staff']

export const useStaff = () =>
  useQuery<StaffMember[]>({
    queryKey: KEY,
    queryFn: () => api.get('/staff').then(r => r.data),
  })

export const useAddStaff = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<StaffMember, 'id'>) => api.post('/staff', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Staff member added') },
    onError: () => toast.error('Failed to add staff member'),
  })
}

export const useUpdateStaff = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<StaffMember> & { id: string }) =>
      api.patch(`/staff/${id}`, data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Staff member updated') },
    onError: () => toast.error('Failed to update staff member'),
  })
}

export const useRemoveStaff = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/staff/${id}`).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: KEY }); toast.success('Staff member removed') },
    onError: () => toast.error('Failed to remove staff member'),
  })
}
