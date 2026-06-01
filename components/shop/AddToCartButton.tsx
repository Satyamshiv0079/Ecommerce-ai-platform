'use client'

import { useCart } from '@/lib/store/cart'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)

  return (
    <button
      onClick={() => addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })}
      className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition w-fit"
    >
      <ShoppingCart className="w-6 h-6" />
      Add to Cart
    </button>
  )
}
