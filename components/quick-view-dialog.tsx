"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Plus, Minus, ShoppingCart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badges?: string[]
  slug: string
}

interface QuickViewDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickViewDialog({ product, open, onOpenChange }: QuickViewDialogProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    onOpenChange(false)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick View - {product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badges?.map((badge) => (
                <Badge key={badge} variant="secondary">
                  {badge}
                </Badge>
              ))}
              {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Premium quality organic snack made with the finest ingredients. Perfect for healthy snacking anytime,
                anywhere.
              </p>

              <div className="space-y-2">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 100% Organic ingredients</li>
                  <li>• No artificial preservatives</li>
                  <li>• Rich in protein and fiber</li>
                  <li>• Gluten-free and vegan</li>
                </ul>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ₹{product.price * quantity}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
