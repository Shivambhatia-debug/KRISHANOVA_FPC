"use client"

import { useState } from "react"
import { Search, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const recentSearches = ["Makhana", "Protein bars", "Green tea", "Almonds"]

const searchSuggestions = [
  {
    id: "1",
    name: "Premium Roasted Makhana",
    price: 299,
    image: "/placeholder.svg?height=60&width=60",
    category: "Snacks",
  },
  {
    id: "2",
    name: "Chocolate Protein Bar",
    price: 199,
    image: "/placeholder.svg?height=60&width=60",
    category: "Protein",
  },
  {
    id: "3",
    name: "Herbal Green Tea",
    price: 349,
    image: "/placeholder.svg?height=60&width=60",
    category: "Beverages",
  },
]

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Search Products</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products, categories, or brands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 text-lg h-12"
              autoFocus
            />
          </div>

          {/* Recent Searches */}
          {!query && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <Button key={search} variant="outline" size="sm" onClick={() => setQuery(search)}>
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div>
              <h3 className="font-semibold mb-3">Search Results</h3>
              <div className="space-y-2">
                {searchSuggestions
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(query.toLowerCase()) ||
                      item.category.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => onOpenChange(false)}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <span className="font-semibold">₹{item.price}</span>
                    </Link>
                  ))}
              </div>

              {query && (
                <div className="pt-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/shop?q=${encodeURIComponent(query)}`}>See all results for "{query}"</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
