"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Plus, Leaf, Award } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { getFeaturedProducts } from "@/lib/products"

export function FeaturedProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  const featuredProducts = getFeaturedProducts()
  const itemsPerView = 4
  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  const getBadgeInfo = (product: any) => {
    if (product.bestSeller) return { text: "Bestseller", color: "bg-orange-500" }
    if (product.newArrival) return { text: "New", color: "bg-green-500" }
    if (product.featured) return { text: "Featured", color: "bg-purple-500" }
    if (product.tags.includes("organic")) return { text: "Organic", color: "bg-blue-500" }
    return { text: "Premium", color: "bg-gray-600" }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%2316a34a%22 fillOpacity=%220.4%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-6 py-3 mb-6 border border-green-200">
            <Star className="h-5 w-5 text-green-600 animate-pulse" />
            <span className="text-base font-bold text-green-700">Customer Favorites</span>
          </div>
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked premium makhana varieties loved by our customers across India
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-xl"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-xl"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Products Container */}
          <div className="overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-white/20 p-8 shadow-2xl">
            <div
              ref={scrollRef}
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {featuredProducts.map((product, index) => {
                const badgeInfo = getBadgeInfo(product)
                return (
                  <div key={product.id} className="w-1/4 flex-shrink-0">
                    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
                      <Link href={`/product/${product.slug}`}>
                        <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className={`${badgeInfo.color} text-white font-bold px-3 py-1 rounded-full shadow-lg`}>
                              {badgeInfo.text}
                            </Badge>
                          </div>

                          {/* Discount Badge */}
                          {product.discount && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                                {product.discount}% OFF
                              </Badge>
                            </div>
                          )}

                          {/* Certifications */}
                          <div className="absolute bottom-16 right-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {product.tags.includes("organic") && (
                              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                                <Leaf className="h-4 w-4 text-white" />
                              </div>
                            )}
                            {product.certifications.includes("FSSAI") && (
                              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <Award className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Quick Add Button */}
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg"
                              onClick={(e) => {
                                e.preventDefault()
                                handleAddToCart(product)
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Quick Add
                            </Button>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                            {product.name}
                          </h3>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-semibold">{product.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">({product.reviewCount})</span>
                            <span className="text-xs text-gray-500">• {product.weight}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-xl text-green-600">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-100 rounded-xl"
                              onClick={(e) => {
                                e.preventDefault()
                                handleAddToCart(product)
                              }}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "w-10 h-3 bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg"
                    : "w-3 h-3 bg-green-300 hover:bg-green-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/shop">
              View All Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
