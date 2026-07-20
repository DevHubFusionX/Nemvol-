import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'
import { useSubscriptionStore, type Subscription } from '../stores/subscriptionStore'
import { useEffect } from 'react'

export const useSubscription = () => {
  const setSubscription = useSubscriptionStore(s => s.setSubscription)
  const query = useQuery<Subscription>({
    queryKey: ['subscription'],
    queryFn: () => api.get('/subscription').then(r => r.data),
  })
  useEffect(() => {
    if (query.data) setSubscription(query.data)
  }, [query.data, setSubscription])
  return query
}

export const useVerifyPayment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { reference: string; planId: 'pro' | 'business' }) =>
      api.post('/subscription/verify', payload).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['subscription'] })
      toast.success('Plan activated!')
    },
    onError: () => toast.error('Payment verification failed'),
  })
}

export const useInitiatePayment = () =>
  useMutation({
    mutationFn: (payload: { planId: string; email: string }) =>
      api.post('/subscription/initiate', payload).then(r => r.data as { url: string; reference: string }),
    onSuccess: (data) => { window.location.href = data.url },
    onError: () => toast.error('Failed to initiate payment'),
  })
