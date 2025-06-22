"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Star, ArrowRight, Sparkles, TrendingUp, Gift, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    name: "Premium Makhana",
    description: "Handcrafted fox nuts",
    items: [
      { name: "Roasted Makhana", href: "/shop/roasted-makhana", popular: true },
      { name: "Natural Fox Nuts", href: "/shop/natural-makhana", new: true },
      { name: "Tangy Makhana", href: "/shop/tangy-makhana", trending: true },
      { name: "Chocolate Makhana", href: "/shop/chocolate-makhana" },
      { name: "Salted Makhana", href: "/shop/salted-makhana" },
    ],
    icon: "🥜",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Innovative Products",
    description: "Next-gen nutrition",
    items: [
      { name: "Makhana Macaroni", href: "/shop/makhana-macaroni", new: true },
      { name: "Protein Bars", href: "/shop/protein-bars", popular: true },
      { name: "Energy Bites", href: "/shop/energy-bites" },
      { name: "Superfood Mix", href: "/shop/superfood-mix", trending: true },
      { name: "Breakfast Cereals", href: "/shop/cereals" },
    ],
    icon: "🚀",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Gift Collections",
    description: "Premium gift sets",
    items: [
      { name: "Festival Hampers", href: "/shop/festival-hampers", popular: true },
      { name: "Corporate Gifts", href: "/shop/corporate-gifts" },
      { name: "Wedding Favors", href: "/shop/wedding-favors" },
      { name: "Health Combos", href: "/shop/health-combos", trending: true },
      { name: "Bulk Orders", href: "/shop/bulk-orders" },
    ],
    icon: "🎁",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Beverages",
    description: "Healthy drinks",
    items: [
      { name: "Herbal Teas", href: "/shop/herbal-teas", popular: true },
      { name: "Protein Shakes", href: "/shop/protein-shakes" },
      { name: "Detox Drinks", href: "/shop/detox-drinks", new: true },
      { name: "Energy Drinks", href: "/shop/energy-drinks" },
      { name: "Wellness Shots", href: "/shop/wellness-shots", trending: true },
    ],
    icon: "🥤",
    color: "from-blue-500 to-cyan-500",
  },
]

const featuredProducts = [
  {
    name: "Premium Makhana Pack",
    price: "₹299",
    originalPrice: "₹399",
    image: "/images/premium-makhana-pack.jpg",
    href: "/product/premium-makhana-pack",
    rating: 4.9,
    badge: "Bestseller",
  },
  {
    name: "Tangy Makhana",
    price: "₹329",
    image: "/images/tangy-makhana-pack.jpg",
    href: "/product/tangy-makhana",
    rating: 4.8,
    badge: "Trending",
  },
  {
    name: "Makhana Macaroni",
    price: "₹199",
    image: "/images/makhana-macaroni.jpg",
    href: "/product/makhana-macaroni",
    rating: 4.9,
    badge: "New",
  },
]

const quickActions = [
  { name: "Best Sellers", href: "/shop/bestsellers", icon: TrendingUp, color: "text-orange-600" },
  { name: "New Arrivals", href: "/shop/new", icon: Sparkles, color: "text-purple-600" },
  { name: "Gift Cards", href: "/gift-cards", icon: Gift, color: "text-green-600" },
  { name: "Flash Sale", href: "/shop/sale", icon: Zap, color: "text-red-600" },
]

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button
        asChild
        variant="ghost"
        className="text-sm font-medium hover:text-green-600 transition-all duration-200 hover:scale-105 relative group px-4 py-2"
      >
        <Link href="/shop" className="flex items-center">
          Shop
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
        </Link>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-7xl bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl mt-2 animate-in slide-in-from-top-2 duration-300 overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Explore Our Store
                </h3>
                <p className="text-gray-600 mt-1">Discover premium healthy snacks and innovative nutrition</p>
              </div>
              <div className="flex gap-2">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-105 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                    {action.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Categories Navigation */}
              <div className="col-span-3">
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onMouseEnter={() => setActiveCategory(index)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 group ${
                        activeCategory === index
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
                          : "hover:bg-gray-50 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`text-2xl p-2 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                            {category.name}
                          </div>
                          <div className="text-sm text-gray-500">{category.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Items */}
              <div className="col-span-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
                      <span className="text-2xl">{categories[activeCategory].icon}</span>
                      {categories[activeCategory].name}
                    </h4>
                    <div className="space-y-3">
                      {categories[activeCategory].items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                              {item.name}
                            </span>
                            <div className="flex gap-1">
                              {item.popular && (
                                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                  Popular
                                </Badge>
                              )}
                              {item.new && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  New
                                </Badge>
                              )}
                              {item.trending && (
                                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                  Trending
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">Popular in this category</h4>
                    <div className="space-y-4">
                      {categories[activeCategory].items
                        .filter((item) => item.popular || item.trending)
                        .slice(0, 3)
                        .map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            className="block p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Premium quality • Fast delivery</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium text-gray-600">4.8</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div className="col-span-3">
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Featured Products</h4>
                <div className="space-y-4">
                  {featuredProducts.map((product, index) => (
                    <Link
                      key={index}
                      href={product.href}
                      className="block bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-green-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-200">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-1 right-1">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                product.badge === "Bestseller"
                                  ? "bg-orange-100 text-orange-700"
                                  : product.badge === "Trending"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-green-100 text-green-700"
                              }`}
                            >
                              {product.badge}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors text-sm">
                            {product.name}
                          </h5>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold text-green-600">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Button
                  asChild
                  className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link href="/shop" onClick={() => setIsOpen(false)}>
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-2">🎉 Special Offer!</h4>
                  <p className="text-green-100">Get 25% off on orders above ₹999. Use code: HEALTHY25</p>
                </div>
                <Button
                  variant="secondary"
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
