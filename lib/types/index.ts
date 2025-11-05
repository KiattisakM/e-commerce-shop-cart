import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  image?: SanityImageSource
}

export type BadgeType = 'sale' | 'new' | 'hot' | 'lowstock'

export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  price: number
  compareAtPrice?: number
  images: SanityImageSource[]
  stock: number
  category: Category
  badges?: BadgeType[]
  featured?: boolean
  createdAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  itemCount: number
}
