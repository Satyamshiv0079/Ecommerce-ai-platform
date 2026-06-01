import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/shop/AddToCartButton'

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div className="relative h-96 rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-green-600 font-medium mb-2">{product.category}</span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-gray-900 mb-6">₹{product.price}</div>
          <div className="text-sm mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>

      </div>
    </div>
  )
}
