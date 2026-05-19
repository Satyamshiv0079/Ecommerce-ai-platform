'use client'

import { useCart } from '@/store/cart'
import Link from 'next/link'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [success, setSuccess] = useState(false)

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Browse Products
        </Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-3xl font-bold mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Thank you for your order. We will contact you soon.</p>
        <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    setSuccess(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Form */}
        <form onSubmit={handleOrder} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Your full address"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total()}</span>
          </div>
        </div>

      </div>
    </div>
  )
}