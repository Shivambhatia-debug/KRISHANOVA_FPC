"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Plus, Minus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Award, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { getProductBySlug, type Product } from "@/lib/products"

interface ProductDetailProps {
  slug: string
}

export function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <a href="/shop">Browse All Products</a>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // Here you would typically call an API to update wishlist
  }

  const getBadges = () => {
    const badges = []
    if (product.bestSeller) badges.push({ text: "Bestseller", color: "bg-orange-500" })
    if (product.newArrival) badges.push({ text: "New", color: "bg-green-500" })
    if (product.featured) badges.push({ text: "Featured", color: "bg-purple-500" })
    return badges
  }

  const badges = getBadges()

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment: "Excellent quality makhana! Very crunchy and tasty. My family loves it.",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      name: "Priya Singh",
      rating: 4,
      comment: "Good product, fresh and crispy. Packaging is also nice.",
      date: "2024-01-10",
      verified: true
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 5,
      comment: "Perfect snack for evening time. Healthy and delicious!",
      date: "2024-01-08",
      verified: false
    }
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gray-200">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} className={`${badge.color} text-white font-bold px-3 py-1 rounded-full shadow-lg`}>
                {badge.text}
              </Badge>
            ))}
            {product.discount && (
              <Badge className="bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Certifications */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.tags.includes("organic") && (
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
            )}
            {product.certifications.includes("FSSAI") && (
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-3 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                selectedImage === index ? "border-green-500 scale-105" : "border-gray-300 hover:border-green-300"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {product.name}
          </h1>
          
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg">{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-500">• {product.weight}</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl font-black text-green-600">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-2xl text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <Badge className="bg-green-100 text-green-700 text-lg font-bold px-4 py-2">
                Save ₹{product.originalPrice! - product.price}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6">
            {product.inStock ? (
              <Badge className="bg-green-100 text-green-700 border-green-200 text-base px-4 py-2">
                ✓ In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600 text-base px-4 py-2">
                Out of Stock
              </Badge>
            )}
            <Badge variant="outline" className="text-gray-600 border-gray-300 text-base px-4 py-2">
              Shelf Life: {product.shelfLife}
            </Badge>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-lg text-gray-800">Quantity:</span>
            <div className="flex items-center border-2 border-gray-300 rounded-xl">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-12 w-12 rounded-l-xl hover:bg-gray-100"
              >
                <Minus className="h-5 w-5" />
              </Button>
              <span className="px-6 py-3 text-lg font-bold min-w-[4rem] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="h-12 w-12 rounded-r-xl hover:bg-gray-100"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl shadow-lg"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-6 w-6 mr-3" />
              Add to Cart - ₹{product.price * quantity}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWishlist}
              className={`h-14 w-14 rounded-xl border-2 ${
                isWishlisted ? "bg-red-50 border-red-300 text-red-600" : "border-gray-300 hover:border-red-300"
              }`}
            >
              <Heart className={`h-6 w-6 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="lg" className="h-14 w-14 rounded-xl border-2 border-gray-300">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-3 text-sm">
            <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
            <span className="font-medium text-gray-700">Free shipping on orders ₹500+</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-700">100% Secure payments</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-orange-600" />
            </div>
            <span className="font-medium text-gray-700">Easy 7-day returns</span>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 rounded-xl">
            <TabsTrigger value="details" className="rounded-lg font-semibold">Details</TabsTrigger>
            <TabsTrigger value="nutrition" className="rounded-lg font-semibold">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg font-semibold">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-sm text-gray-700 border-gray-300 px-3 py-1">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Product Tags</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} className="bg-green-100 text-green-700 px-3 py-1 text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700 px-3 py-1 text-sm">
                    ✓ {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6 mt-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h4 className="font-bold text-xl mb-6 text-gray-800">Nutritional Information (per 100g)</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Calories</span>
                    <span className="font-bold text-green-600">{product.nutritionFacts.calories} kcal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Protein</span>
                    <span className="font-bold text-green-600">{product.nutritionFacts.protein}g</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Carbohydrates</span>
                    <span className="font-bold text-green-600">{product.nutritionFacts.carbs}g</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Fat</span>
                    <span className="font-bold text-green-600">{product.nutritionFacts.fat}g</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Fiber</span>
                    <span className="font-bold text-green-600">{product.nutritionFacts.fiber}g</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">Sodium</span>
                    <span className="font-bold text-green-600">{product.nutritionFacts.sodium}g</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-xl text-gray-800">Customer Reviews</h4>
                <Button className="bg-green-600 hover:bg-green-700 rounded-xl">
                  Write a Review
                </Button>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-green-600">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{review.name}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
