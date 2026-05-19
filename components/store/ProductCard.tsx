'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/store/cart'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem)

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs text-green-600 font-medium">{product.category}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mt-1 hover:text-green-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <button
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            })}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}