"use client"

import Link from "next/link"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, total, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some delicious snacks to get started!</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout" onClick={() => onOpenChange(false)}>
                Checkout
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cart" onClick={() => onOpenChange(false)}>
                View Cart
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
