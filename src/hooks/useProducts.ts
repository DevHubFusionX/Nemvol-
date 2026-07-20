import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../lib/api'

export interface Product {
  id: string; storeId: string; name: string; slug: string; description?: string
  categoryId?: string; status: 'draft' | 'active' | 'archived'; tags: string
  rating?: string; reviewCount?: string; createdAt: string; updatedAt: string
  variants: { id: string; sku?: string; price: string; compareAtPrice?: string; attributes?: string }[]
  media: { id: string; url: string; position: string }[]
}

export interface CreateProductInput {
  name: string; slug: string; description?: string; categoryId?: string
  status?: 'draft' | 'active'; tags?: string[]
  variants: { sku?: string; price: string; compareAtPrice?: string; attributes?: string }[]
  mediaUrls?: string[]
}

// Fix 5: parallel uploads instead of sequential
export async function uploadProductImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map(async (file) => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve((e.target?.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const res = await api.post('/upload', { base64, mimeType: file.type, folder: 'products' })
    return res.data.url
  }))
}

export const useProducts = (filters?: { category?: string; status?: string; q?: string }) =>
  useQuery<{ data: Product[]; total: number }>({
    queryKey: ['products', filters],
    queryFn: () => api.get('/products', { params: filters }).then(r => r.data),
  })

export const useCreateProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProductInput) => api.post('/products', data).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); toast.success('Product created') },
    onError: (e: any) => toast.error(e?.response?.data?.error ?? 'Failed to create product'),
  })
}

export const useUpdateProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, variants, ...data }: Partial<Product> & { id: string }) =>
      api.patch(`/products/${id}`, { ...data, variants }).then(r => r.data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); toast.success('Product updated') },
    onError: () => toast.error('Failed to update product'),
  })
}

// Fix 4: optimistic delete
export const useDeleteProduct = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`).then(r => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['products'] })
      const prev = qc.getQueriesData<{ data: Product[]; total: number }>({ queryKey: ['products'] })
      qc.setQueriesData<{ data: Product[]; total: number }>({ queryKey: ['products'] }, (old) =>
        old ? { ...old, data: old.data.filter(p => p.id !== id), total: old.total - 1 } : old
      )
      return { prev }
    },
    onError: (_e, _id, ctx) => {
      ctx?.prev.forEach(([key, data]) => qc.setQueryData(key, data))
      toast.error('Failed to delete product')
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })
}
