import Link from 'next/link'
import { ShoppingBag, Zap, MessageCircle, Sparkles } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/shop/ProductCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch trending/featured products for the storefront home showcase
  let trendingProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      featured: true,
    },
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Fallback: If no products are marked as featured, fetch any 4 active items
  if (trendingProducts.length === 0) {
    trendingProducts = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-24 px-4 border-b border-green-100/30">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs text-green-700 font-bold uppercase tracking-widest bg-green-200/50 px-4 py-1.5 rounded-full">
            Welcome to the Future of Shopping
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 tracking-tight leading-none">
            Shop Smarter with <span className="text-green-600 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover products tailored just for you with our AI-powered recommendations and smart chatbot assistant.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/10 hover:shadow-green-600/20"
            >
              Shop Now
            </Link>
            <Link
              href="/products"
              className="border border-green-600 text-green-700 px-8 py-3.5 rounded-xl font-bold hover:bg-green-50/50 transition"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      {trendingProducts.length > 0 && (
        <section className="py-20 px-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="bg-green-100 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trending AI Picks</h2>
              <p className="text-xs text-gray-500 mt-0.5">Highly-rated items handpicked by our smart models</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why ShopAI?</h2>
            <p className="text-sm text-gray-500 mt-2">Discover how AI makes online shopping smarter, faster, and tailored to you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI Recommendations</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Get personalized product suggestions based on your preferences and browsing history.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Chatbot</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Ask our AI assistant anything about products, orders, or get shopping advice.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-md transition">
              <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Shopping</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Seamless shopping experience with secure payments and fast delivery.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
