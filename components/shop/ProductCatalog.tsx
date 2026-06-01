'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { Search, SlidersHorizontal, Grid3X3 } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  featured: boolean
  createdAt: Date
}

interface ProductCatalogProps {
  products: Product[]
}

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Bags', 'Accessories']

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Real-time filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, description, or category..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Catalog Layout Icons */}
          <div className="flex items-center gap-3 text-gray-400 text-sm font-medium self-end md:self-auto">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            <span className="h-4 w-px bg-gray-200 mx-1"></span>
            <Grid3X3 className="h-4 w-4 text-green-600" />
            <span className="text-gray-500">{filteredProducts.length} items found</span>
          </div>

        </div>

        {/* Horizontal Category Slider */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-green-600 text-white shadow-sm shadow-green-600/10'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto">
          <p className="text-gray-500 font-bold text-lg">No matches found</p>
          <p className="text-sm text-gray-400 mt-1">Try tweaking your search keywords or choosing another category tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
