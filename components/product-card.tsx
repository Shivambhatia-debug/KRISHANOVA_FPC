"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star, ShoppingCart, Eye, Plus, Minus, Award, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { QuickViewDialog } from "@/components/quick-view-dialog"
import { type Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  // Safety check for required product properties
  if (!product || !product.id || !product.name) {
    return null
  }

  // Safe property access with defaults
  const productImages = product.images || []
  const productTags = product.tags || []
  const productCertifications = product.certifications || []

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImages[0] || "/placeholder.svg",
      quantity,
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsQuickViewOpen(true)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const getBadges = () => {
    const badges = []
    if (product.bestSeller) badges.push({ text: "Bestseller", color: "bg-orange-500" })
    if (product.newArrival) badges.push({ text: "New", color: "bg-green-500" })
    if (product.featured) badges.push({ text: "Featured", color: "bg-purple-500" })
    if (productTags.includes("organic")) badges.push({ text: "Organic", color: "bg-blue-500" })
    return badges
  }

  const badges = getBadges()

  if (viewMode === "list") {
    return (
      <>
        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2 hover:border-green-200 bg-white rounded-2xl">
          <Link href={`/product/${product.slug}`}>
            <div className="flex gap-6 p-6">
              {/* Image */}
              <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={productImages[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.discount && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-green-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${isWishlisted ? "bg-red-500 text-white" : "hover:bg-red-50"}`}
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex gap-1">
                    {badges.slice(0, 2).map((badge, index) => (
                      <Badge key={index} className={`${badge.color} text-white text-xs`}>
                        {badge.text}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xl text-green-600">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{product.weight}</div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleQuickView}
                    className="border-green-200 hover:bg-green-50 rounded-xl"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </Card>
        <QuickViewDialog product={product} open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen} />
      </>
    )
  }

  return (
    <>
      <Card
        className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden rounded-t-3xl">
            <Image
              src={productImages[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  className={`${badge.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                >
                  {badge.text}
                </Badge>
              ))}
              {product.discount && (
                <Badge className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* Certifications */}
            <div className="absolute top-4 right-4 flex flex-col gap-1">
              {productTags.includes("organic") && (
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
              )}
              {productCertifications.includes("FSSAI") && (
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {isHovered && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleQuickView}
                  className="bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white rounded-xl shadow-lg"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-xl shadow-lg backdrop-blur-sm border border-white/20 ${
                    isWishlisted ? "bg-red-500 text-white" : "bg-white/80 hover:bg-white"
                  }`}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount} reviews)</span>
              <span className="text-xs text-gray-500">• {product.weight}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-black text-2xl text-green-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              {product.discount && (
                <Badge className="bg-green-100 text-green-700 text-xs font-bold">
                  Save ₹{product.originalPrice! - product.price}
                </Badge>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {productTags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs text-gray-600 border-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Qty:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault()
                      setQuantity(Math.max(1, quantity - 1))
                    }}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-semibold min-w-[2rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault()
                      setQuantity(quantity + 1)
                    }}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      <QuickViewDialog product={product} open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen} />
    </>
  )
}
