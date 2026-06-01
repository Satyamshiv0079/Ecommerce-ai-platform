import Link from 'next/link'
import { Store } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <Store className="w-6 h-6 text-green-600" />
              <span>ShopAI</span>
            </div>
            <p className="text-gray-500 text-sm">
              Shop smarter with AI-powered recommendations and a smart chatbot assistant.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <div><Link href="/" className="hover:text-green-600 transition">Home</Link></div>
              <div><Link href="/products" className="hover:text-green-600 transition">Products</Link></div>
              <div><Link href="/cart" className="hover:text-green-600 transition">Cart</Link></div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="space-y-2 text-sm text-gray-500">
              <div><Link href="/login" className="hover:text-green-600 transition">Login</Link></div>
              <div><Link href="/signup" className="hover:text-green-600 transition">Sign Up</Link></div>
            </div>
          </div>

        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-400">
          © 2026 ShopAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
