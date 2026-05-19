import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const products = [
    {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'Premium noise-cancelling wireless headphones with 30hr battery life.',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Electronics',
      stock: 20,
      featured: true,
    },
    {
      name: 'Running Shoes',
      slug: 'running-shoes',
      description: 'Lightweight and comfortable running shoes for everyday use.',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      category: 'Footwear',
      stock: 15,
      featured: true,
    },
    {
      name: 'Smart Watch',
      slug: 'smart-watch',
      description: 'Feature-packed smartwatch with health tracking and notifications.',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Electronics',
      stock: 10,
      featured: true,
    },
    {
      name: 'Leather Backpack',
      slug: 'leather-backpack',
      description: 'Stylish and durable leather backpack for work and travel.',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      category: 'Bags',
      stock: 12,
      featured: false,
    },
    {
      name: 'Sunglasses',
      slug: 'sunglasses',
      description: 'UV400 protection polarized sunglasses with stylish frame.',
      price: 999,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      category: 'Accessories',
      stock: 25,
      featured: false,
    },
    {
      name: 'Mechanical Keyboard',
      slug: 'mechanical-keyboard',
      description: 'RGB mechanical keyboard with tactile switches for gaming and typing.',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
      category: 'Electronics',
      stock: 8,
      featured: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('✅ Products seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())