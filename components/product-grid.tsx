"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"
import { products, type Product } from "@/lib/products"

interface ProductGridProps {
  category?: string
  searchQuery?: string
  priceRange?: { min: number; max: number }
  selectedTags?: string[]
}

export function ProductGrid({ 
  category = "all", 
  searchQuery = "",
  priceRange,
  selectedTags = []
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")
  const [displayCount, setDisplayCount] = useState(8)

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase() ||
        product.subCategory?.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by search query
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Filter by price range
    if (priceRange) {
      filtered = filtered.filter(product => 
        product.price >= priceRange.min && 
        product.price <= priceRange.max
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      )
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)
        case "popularity":
        default:
          return b.reviewCount - a.reviewCount
      }
    })

    return sorted
  }, [category, searchQuery, priceRange, selectedTags, sortBy])

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount)
  const hasMoreProducts = displayCount < filteredAndSortedProducts.length

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-gray-600 text-lg">
            {filteredAndSortedProducts.length} premium product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px] border-2 border-green-200 focus:border-green-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border-2 border-green-200 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* No Products Found */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 && (
        <div
          className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMoreProducts && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            className="border-2 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 px-8 py-3 text-lg"
          >
            Load More Products ({filteredAndSortedProducts.length - displayCount} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}
