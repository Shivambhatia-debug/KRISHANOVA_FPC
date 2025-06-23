import Link from "next/link"
import { SearchX, Home, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center px-4 py-8 max-w-lg mx-auto">
        {/* Large 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-green-100 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <SearchX className="h-24 w-24 text-green-400" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Oops! The page you're looking for seems to have gone on a little adventure. 
            Don't worry, our delicious makhana is still right where you left it!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="border-2 border-green-200 hover:bg-green-50">
            <Link href="/shop" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100">
          <h3 className="font-semibold text-gray-800 mb-3">Looking for something specific?</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link href="/shop" className="text-green-600 hover:text-green-700 font-medium">
              • Shop Products
            </Link>
            <Link href="/about" className="text-green-600 hover:text-green-700 font-medium">
              • About Us
            </Link>
            <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">
              • Contact Support
            </Link>
            <Link href="/faq" className="text-green-600 hover:text-green-700 font-medium">
              • Help & FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 