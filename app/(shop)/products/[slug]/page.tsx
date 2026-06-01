import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/shop/AddToCartButton'
import { getAIRecommendations } from '@/lib/ai/recommendations'
import { Sparkles, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) notFound()

  // Fetch AI Recommendations directly on the server
  const recommendations = await getAIRecommendations(params.slug)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-md group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs text-green-600 font-bold uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full w-fit mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-extrabold text-gray-900">₹{product.price}</span>
            <span className="text-sm text-gray-400 font-medium">Incl. all taxes</span>
          </div>

          <div className="text-sm mb-8">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold bg-green-50/50 px-3 py-1.5 rounded-lg border border-green-100">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-semibold bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                Out of Stock
              </span>
            )}
          </div>

          <AddToCartButton product={product} />
        </div>

      </div>

      {/* AI Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-24 border-t border-gray-150 pt-16">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="bg-green-100 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personalized AI Picks</h2>
              <p className="text-xs text-gray-500 mt-0.5">Smart recommendations matched by our AI models</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((p) => (
              <div 
                key={p.id} 
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <Link href={`/products/${p.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                
                <div className="p-5 flex-1 flex flex-col">
                  {/* AI Reason Badge */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-xl border border-emerald-100/50 font-medium mb-3.5 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{p.reason}</span>
                  </div>

                  <span className="text-xs text-green-600 font-semibold uppercase tracking-wider">{p.category}</span>
                  <Link href={`/products/${p.slug}`} className="hover:text-green-600 transition-colors">
                    <h3 className="font-bold text-gray-900 mt-1 line-clamp-1">{p.name}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-grow">{p.description}</p>
                  
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                    <span className="text-lg font-extrabold text-gray-900">₹{p.price}</span>
                    <Link 
                      href={`/products/${p.slug}`}
                      className="text-xs text-green-600 font-bold hover:text-green-700 transition-colors flex items-center gap-1 group"
                    >
                      View Details 
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
