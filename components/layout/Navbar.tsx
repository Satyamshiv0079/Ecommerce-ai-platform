'use client'

import Link from 'next/link'
import { ShoppingCart, User, Store } from 'lucide-react'
import { useCart } from '@/store/cart'

export default function Navbar() {
  const items = useCart((state) => state.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Store className="w-6 h-6 text-green-600" />
          <span>ShopAI</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-black transition">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-black transition">
            Products
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login">
            <User className="w-6 h-6 text-gray-700 hover:text-black transition" />
          </Link>
        </div>

      </div>
    </nav>
  )
}