"use client"

import Link from "next/link"
import Image from "next/image"
import { Plus, Minus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart-provider"

export function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/shop">
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    )
  }

  const shipping = total >= 500 ? 0 : 50
  const finalTotal = total + shipping

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">Shopping Cart ({items.length} items)</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-muted-foreground">₹{item.price} each</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                        <Button variant="ghost" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>

            {shipping > 0 && <p className="text-sm text-muted-foreground">Add ₹{500 - total} more for free shipping</p>}

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>

            <Button asChild className="w-full" size="lg">
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Promo Code */}
        <Card>
          <CardHeader>
            <CardTitle>Promo Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter promo code" />
              <Button variant="outline">Apply</Button>
            </div>
          </CardContent>
        </Card>

        {/* Continue Shopping */}
        <Button asChild variant="outline" className="w-full">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
