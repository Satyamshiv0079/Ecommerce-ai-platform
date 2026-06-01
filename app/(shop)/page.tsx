import Link from 'next/link'
import { ShoppingBag, Zap, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Shop Smarter with <span className="text-green-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover products tailored just for you with our AI-powered recommendations and smart chatbot assistant.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/products"
              className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why ShopAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
              <p className="text-gray-600">Get personalized product suggestions based on your preferences and browsing history.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Chatbot</h3>
              <p className="text-gray-600">Ask our AI assistant anything about products, orders, or get shopping advice.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">Seamless shopping experience with secure payments and fast delivery.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
