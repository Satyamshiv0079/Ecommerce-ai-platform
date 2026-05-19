export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  featured: boolean
  createdAt: Date
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface User {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  total: number
  status: string
  createdAt: Date
}