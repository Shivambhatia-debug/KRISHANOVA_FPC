"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Heart, ShoppingCart, Star, Trash2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  inStock: boolean
  slug: string
  discount?: number
}

interface WishlistDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WishlistDrawer({ open, onOpenChange }: WishlistDrawerProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  // Mock wishlist data - in real app, this would come from context/state management
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "premium-roasted-makhana",
      name: "Premium Roasted Makhana",
      price: 299,
      originalPrice: 349,
      image: "/images/premium-makhana-pack.jpg",
      rating: 4.8,
      inStock: true,
      slug: "premium-roasted-makhana",
      discount: 14
    },
    {
      id: "tangy-masala-makhana",
      name: "Tangy Masala Makhana",
      price: 329,
      originalPrice: 389,
      image: "/images/tangy-makhana-pack.jpg",
      rating: 4.7,
      inStock: true,
      slug: "tangy-masala-makhana",
      discount: 15
    },
    {
      id: "chocolate-coated-makhana",
      name: "Chocolate Coated Makhana",
      price: 399,
      originalPrice: 459,
      image: "/images/makhana-1.jpg",
      rating: 4.9,
      inStock: false,
      slug: "chocolate-coated-makhana",
      discount: 13
    }
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const addToCartFromWishlist = (item: WishlistItem) => {
    if (!item.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock",
        variant: "destructive"
      })
      return
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${item.name} has been added to your cart`,
    })
  }

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock)
    
    inStockItems.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    })

    toast({
      title: "Items Added to Cart! 🛒",
      description: `${inStockItems.length} items added to your cart`,
    })
  }

  const shareWishlist = () => {
    navigator.clipboard.writeText(window.location.origin + "/wishlist/shared")
    toast({
      title: "Wishlist Link Copied! 🔗",
      description: "Share your wishlist with friends and family",
    })
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0)
  const totalSavings = wishlistItems.reduce((sum, item) => 
    sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-600 fill-current" />
              </div>
              <div>
                <SheetTitle className="text-xl font-bold text-gray-800">My Wishlist</SheetTitle>
                <SheetDescription className="text-gray-600">
                  {wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}
                </SheetDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={shareWishlist} className="rounded-xl">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Summary */}
          {wishlistItems.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">₹{totalValue}</div>
                  <div className="text-xs text-gray-600">Total Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">₹{totalSavings}</div>
                  <div className="text-xs text-gray-600">Total Savings</div>
                </div>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="mt-8 flex-1 overflow-y-auto">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
              <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Your wishlist is empty</h3>
                <p className="text-gray-600 text-sm">
                  Save items you love for later. They'll appear here.
                </p>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700 rounded-xl">
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Add All to Cart Button */}
              <div className="sticky top-0 bg-white z-10 pb-4">
                <Button
                  onClick={addAllToCart}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl h-12 font-semibold"
                  disabled={!wishlistItems.some(item => item.inStock)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add All to Cart ({wishlistItems.filter(item => item.inStock).length} items)
                </Button>
              </div>

              {/* Wishlist Items */}
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-md transition-all duration-200 border-2 hover:border-green-200">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link href={`/product/${item.slug}`} className="relative flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-200"
                          />
                          {item.discount && (
                            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-md">
                              {item.discount}% OFF
                            </Badge>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-green-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-gray-600">{item.rating}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">₹{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.inStock 
                                ? "text-green-600 border-green-200 bg-green-50" 
                                : "text-red-600 border-red-200 bg-red-50"
                            }`}
                          >
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>

                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addToCartFromWishlist(item)}
                              disabled={!item.inStock}
                              className="h-8 w-8 p-0 hover:bg-green-100 rounded-lg"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromWishlist(item.id)}
                              className="h-8 w-8 p-0 hover:bg-red-100 text-red-600 rounded-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Recommendations */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">You might also like</h4>
                <div className="space-y-3">
                  {[
                    {
                      name: "Himalayan Salt Makhana",
                      price: 309,
                      image: "/images/makhana-2.jpg",
                      rating: 4.8
                    },
                    {
                      name: "Peri Peri Makhana",
                      price: 339,
                      image: "/images/makhana-4.jpg",
                      rating: 4.7
                    }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{product.name}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-green-600">₹{product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 