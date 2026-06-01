import { prisma } from '@/lib/prisma'
import ProductCatalog from '@/components/shop/ProductCatalog'

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
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs text-green-600 font-semibold uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full">
          Our Catalog
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3 mb-4">
          Discover Our Products
        </h1>
        <p className="text-gray-500">
          Browse through our curated collection of high-quality electronics, footwear, bags, and accessories, handpicked for you.
        </p>
      </div>

      <ProductCatalog products={products} />
    </div>
  )
}
