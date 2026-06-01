import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/shop/ProductCard'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs text-green-600 font-semibold uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full">
          Our Collection
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3 mb-4">
          Discover Our Products
        </h1>
        <p className="text-gray-500">
          Browse through our curated collection of high-quality electronics, footwear, bags, and accessories, handpicked for you.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto">
          <p className="text-gray-500 font-medium">No products found.</p>
          <p className="text-sm text-gray-400 mt-1">Please seed the database or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
