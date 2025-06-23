"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Healthy Snacks",
    description: "Guilt-free munching options",
    image: "/images/makhana-1.jpg",
    href: "/shop/snacks",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    hoverGradient: "from-green-500 via-emerald-600 to-teal-700",
    icon: "🥜",
  },
  {
    name: "Protein Foods",
    description: "Fuel your fitness journey",
    image: "/images/makhana-2.jpg",
    href: "/shop/protein",
    gradient: "from-orange-400 via-red-500 to-pink-600",
    hoverGradient: "from-orange-500 via-red-600 to-pink-700",
    icon: "💪",
  },
  {
    name: "Organic Range",
    description: "Pure & natural goodness",
    image: "/images/makhana-3.jpg",
    href: "/shop/organic",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    hoverGradient: "from-blue-500 via-indigo-600 to-purple-700",
    icon: "🌱",
  },
  {
    name: "Premium Products",
    description: "Our finest quality selection",
    image: "/images/premium-makhana-pack.jpg",
    href: "/shop/premium",
    gradient: "from-purple-400 via-pink-500 to-rose-600",
    hoverGradient: "from-purple-500 via-pink-600 to-rose-700",
    icon: "⭐",
  },
]

export function CategoryShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Explore Categories</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our carefully curated selection of healthy foods and snacks, organized by category to help you find
            exactly what you're looking for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={category.href}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${hoveredIndex === index ? category.hoverGradient : category.gradient} opacity-70 transition-all duration-300`}
                  />

                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 text-3xl animate-bounce">{category.icon}</div>

                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-xl mb-2 group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 bg-gradient-to-r from-white to-gray-50">
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300 font-medium"
                  >
                    Explore Category
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
