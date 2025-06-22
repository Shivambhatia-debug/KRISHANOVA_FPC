"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { getFeaturedProducts, getBestSellerProducts } from "@/lib/products"

// Get actual product data from products.ts - remove duplicates
const featuredProducts = getFeaturedProducts()
const bestSellerProducts = getBestSellerProducts()
const products = [
  ...featuredProducts,
  ...bestSellerProducts.filter(product => 
    !featuredProducts.some(featured => featured.id === product.id)
  )
].slice(0, 8)

export function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const itemsPerView = 4

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerView >= products.length ? 0 : prev + itemsPerView))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, itemsPerView])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + itemsPerView >= products.length ? 0 : prev + itemsPerView))
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - itemsPerView))
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-6 py-3 mb-6 border border-green-200">
              <Sparkles className="h-5 w-5 text-green-600 animate-pulse" />
              <span className="text-base font-bold text-green-700">Customer Favorites</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600 text-xl max-w-md leading-relaxed">
              Handpicked favorites loved by our customers across India
            </p>
          </div>

          <div className="hidden lg:flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-12 w-12 border-2 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-12 w-12 border-2 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-white/20 p-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="w-1/4 flex-shrink-0 px-3"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-3 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="border-2 border-green-200 hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="border-2 border-green-200 hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index * itemsPerView)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className={`transition-all duration-300 rounded-full ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? "w-10 h-3 bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg"
                  : "w-3 h-3 bg-green-300 hover:bg-green-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
