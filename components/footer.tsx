"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useHasMounted } from "@/hooks/use-has-mounted"

export function Footer() {
  const hasMounted = useHasMounted()

  return (
    <footer className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/krishanova-logo.png"
                  alt="Krishanova FPC Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-black text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Krishanova FPC
                </span>
                <div className="text-xs text-gray-500 font-semibold -mt-1">Premium Nutrition</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium quality makhana (fox nuts) and healthy snacks crafted with love. 100% natural, organic, and 
              delicious. Your trusted partner for nutritious snacking since 2020.
            </p>
            <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
              <Award className="h-4 w-4" />
              <span>FSSAI Certified • ISO 22000</span>
            </div>
            <div className="flex space-x-3">
              <Button asChild variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-600 rounded-xl">
                <a href="#" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hover:bg-pink-100 hover:text-pink-600 rounded-xl">
                <a href="#" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-400 rounded-xl">
                <a href="#" target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5" /></a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600 rounded-xl">
                <a href="#" target="_blank" rel="noopener noreferrer"><Youtube className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Quick Links</h3>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                About Us
              </Link>
              <Link href="/shop" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Shop All Products
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Media Center
              </Link>
              <Link href="/bulk-orders" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Bulk Orders
              </Link>
              <Link href="/store-locator" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Store Locator
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Our Products</h3>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link href="/shop/premium-makhana" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Premium Makhana
              </Link>
              <Link href="/shop/flavored-makhana" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Flavored Varieties
              </Link>
              <Link href="/shop/roasted-makhana" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Roasted Makhana
              </Link>
              <Link href="/shop/healthy-snacks" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Healthy Snacks
              </Link>
              <Link href="/shop/gift-packs" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Gift Hampers
              </Link>
              <Link href="/shop/combo-packs" className="text-muted-foreground hover:text-green-600 transition-colors font-medium hover:translate-x-1 duration-200">
                Combo Offers
              </Link>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          {hasMounted && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800">Stay Connected</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get exclusive offers, healthy recipes, and nutrition tips delivered to your inbox every week.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="text-sm rounded-xl border-2 border-green-200 focus:border-green-400" />
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-6">
                  Subscribe
                </Button>
              </div>

              <div className="space-y-3 pt-4 border-t border-green-200">
                <div className="flex items-center gap-3 text-sm group">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-semibold">+91 91220 85387</span>
                </div>
                <div className="flex items-center gap-3 text-sm group">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold">info.krishanova@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm group">
                  <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="font-semibold">Darbhanga, Bihar, India</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-8 bg-green-200" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-green-600 transition-colors font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-600 transition-colors font-medium">
              Terms of Service
            </Link>
            <Link href="/returns" className="hover:text-green-600 transition-colors font-medium">
              Returns & Refunds
            </Link>
            <Link href="/shipping" className="hover:text-green-600 transition-colors font-medium">
              Shipping Info
            </Link>
            <Link href="/faq" className="hover:text-green-600 transition-colors font-medium">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground font-semibold">
              © 2024 Krishanova FPC. All rights reserved.
            </p>
            <div className="flex gap-3 items-center">
              <span className="text-xs text-gray-500">We Accept:</span>
              <div className="flex gap-2">
                <div className="h-6 w-10 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                <div className="h-6 w-10 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                <div className="h-6 w-10 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">UPI</div>
                <div className="h-6 w-10 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">GPay</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
