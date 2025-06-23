"use client"

import { Loader2, Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl animate-pulse" />
            <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-green-600 animate-spin" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Loading...
          </h2>
          <p className="text-gray-600">
            Preparing fresh content for you
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
        </div>

        {/* Loading Bar */}
        <div className="mt-6 w-64 mx-auto">
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" 
                 style={{ width: '60%', animationDuration: '1.5s' }} />
          </div>
        </div>
      </div>
    </div>
  )
} 