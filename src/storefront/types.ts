export interface PublicPaymentMethods {
  cards?: { enabled: boolean }
  transfer?: { enabled: boolean; bankName?: string; accountName?: string; accountNumber?: string }
  pod?: { enabled: boolean }
}

export interface ProductVariant {
  id: string
  productId: string
  sku: string | null
  price: string // Store as string (in Kobo or Naira)
  compareAtPrice: string | null
  attributes: string | null // JSON string or object
  weight: string | null
}

export interface ProductMedia {
  id: string
  productId: string
  url: string
  position: string | null
}

export interface Product {
  id: string
  storeId: string
  categoryId?: string | null
  name: string
  slug: string
  description: string | null
  status: 'draft' | 'active' | 'archived'
  tags: string // JSON string of tags array
  sku?: string | null
  createdAt?: string
  updatedAt?: string

  // Joined relations
  variants?: ProductVariant[]
  media?: ProductMedia[]

  // UI convenience fields (guaranteed by context normalization)
  category: string
  price: number
  compareAt?: number
  stock: number
  images: string[]
  tagList: string[] // parsed tags array
  rating?: number
  reviewCount?: number
}

export interface StoreSettings {
  storeId: string
  storeName: string
  tagline: string
  logo?: string
  logoUrl?: string | null
  template: 'nubia' | 'luna' | 'nova' | 'arc'
  accentColor: string
  currency?: string
  whatsapp?: string | null
  instagram?: string | null
  phone?: string | null
  address?: string | null
  country?: string | null
}
