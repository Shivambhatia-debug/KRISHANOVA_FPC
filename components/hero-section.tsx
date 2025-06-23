"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Shield, Truck, Award, Leaf, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Pure & Delicious",
    subtitle: "Tangy Makhana",
    description: "Experience the perfect crunch with our tangy flavored makhana, a healthy and delicious snack.",
    image: "/images/tangy-makhana-pack.jpg",
    cta: "Shop Now",
    ctaLink: "/shop",
    theme: "emerald",
  },
  {
    id: 2,
    title: "Naturally Nutritious",
    subtitle: "Premium Makhana",
    description: "A delightful mix of premium makhana with natural flavors. The perfect healthy snack for any time of day.",
    image: "/images/premium-makhana-pack.jpg",
    cta: "Explore Range",
    ctaLink: "/shop",
    theme: "blue",
  },
  {
    id: 3,
    title: "Taste of Tradition",
    subtitle: "Makhana Macaroni",
    description: "Our innovative makhana macaroni combines tradition with modern taste. A unique and satisfying experience.",
    image: "/images/makhana-macaroni.jpg",
    cta: "Try Flavors",
    ctaLink: "/shop",
    theme: "purple",
  },
  {
    id: 4,
    title: "Simply Wholesome",
    subtitle: "Classic Makhana",
    description: "Lightly roasted to perfection, our classic makhana is a simple, healthy, and satisfying snack.",
    image: "/images/makhana-1.jpg",
    cta: "Discover More",
    ctaLink: "/shop",
    theme: "orange",
  },
]

const trustBadges = [
  { icon: Shield, label: "100% Safe", color: "text-blue-600" },
  { icon: Truck, label: "Free Shipping", color: "text-green-600" },
  { icon: Award, label: "Premium Quality", color: "text-purple-600" },
  { icon: Leaf, label: "Organic Certified", color: "text-emerald-600" },
]

const floatingElements = [
  { emoji: "🌟", delay: 0, x: "10%", y: "20%" },
  { emoji: "✨", delay: 1, x: "85%", y: "15%" },
  { emoji: "🍃", delay: 2, x: "15%", y: "70%" },
  { emoji: "💫", delay: 0.5, x: "80%", y: "75%" },
  { emoji: "🌱", delay: 1.5, x: "5%", y: "45%" },
  { emoji: "⚡", delay: 2.5, x: "90%", y: "40%" },
]

const themeColors = {
  emerald: {
    bg: "from-emerald-900/90 via-green-900/85 to-teal-900/90",
    text: "from-emerald-100 to-green-100",
    accent: "from-emerald-400 to-green-500",
    button: "from-emerald-600 to-green-600 hover:from-green-600 hover:to-emerald-600",
  },
  blue: {
    bg: "from-blue-900/90 via-indigo-900/85 to-purple-900/90",
    text: "from-blue-100 to-indigo-100",
    accent: "from-blue-400 to-indigo-500",
    button: "from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600",
  },
  purple: {
    bg: "from-purple-900/90 via-pink-900/85 to-rose-900/90",
    text: "from-purple-100 to-pink-100",
    accent: "from-purple-400 to-pink-500",
    button: "from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600",
  },
  orange: {
    bg: "from-orange-900/90 via-red-900/85 to-pink-900/90",
    text: "from-orange-100 to-red-100",
    accent: "from-orange-400 to-red-500",
    button: "from-orange-600 to-red-600 hover:from-red-600 hover:to-orange-600",
  },
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-slide functionality with improved logic
  useEffect(() => {
    if (!isMounted || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % heroSlides.length
        return nextSlide
      })
    }, 4000) // Changed to 4 seconds for faster transitions

    return () => clearInterval(interval)
  }, [isMounted, isAutoPlaying])

  // Mouse position tracking
  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMounted])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    // Resume auto-play after 8 seconds instead of 10
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    // Resume auto-play after 8 seconds instead of 10
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const currentSlideData = heroSlides[currentSlide]
  const theme = themeColors[currentSlideData.theme as keyof typeof themeColors]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Background Images with Transition */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} transition-all duration-1000`} />
          </div>
        ))}
      </div>

      {/* Interactive Background - Only show after mount */}
      {isMounted && (
        <div
          className="absolute inset-0 opacity-20 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Floating Elements - Only show after mount */}
      {isMounted && floatingElements.map((element, index) => (
        <div
          key={index}
          className="absolute text-4xl opacity-20 animate-bounce pointer-events-none"
          style={{
            left: element.x,
            top: element.y,
            animationDelay: `${element.delay}s`,
            animationDuration: "4s",
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-semibold">Premium Nutrition Brand</span>
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>

            {/* Main Headlines with Slide Transition */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                <span className="block text-white drop-shadow-2xl transition-all duration-1000">
                  {currentSlideData.title}
                </span>
                <span
                  className={`block bg-gradient-to-r ${theme.text} bg-clip-text text-transparent drop-shadow-lg transition-all duration-1000`}
                >
                  {currentSlideData.subtitle}
                </span>
              </h1>

              <p className="text-xl text-white/95 max-w-2xl leading-relaxed drop-shadow-lg font-medium transition-all duration-1000">
                {currentSlideData.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                asChild
                size="lg"
                className={`text-xl px-10 py-6 bg-gradient-to-r ${theme.button} hover:scale-105 transition-all duration-300 shadow-2xl rounded-2xl font-bold`}
              >
                <Link href={currentSlideData.ctaLink} className="flex items-center gap-3">
                  {currentSlideData.cta}
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-xl px-10 py-6 border-2 border-white/60 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-xl rounded-2xl font-bold"
              >
                <Link href="/about" className="flex items-center gap-3">
                  <Play className="h-6 w-6" />
                  Learn Our Story
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center gap-3 group">
                  <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    <badge.icon className={`h-8 w-8 ${badge.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-white text-center">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="relative group">
              {/* Main Product Image */}
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 group-hover:scale-105 transition-all duration-500">
                <Image
                  src={currentSlideData.image || "/placeholder.svg"}
                  alt={`${currentSlideData.title} Product`}
                  width={500}
                  height={600}
                  className="object-contain mx-auto drop-shadow-2xl transition-all duration-1000"
                />

                {/* Floating Stats */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="text-center">
                    <div className="text-2xl font-black">4.9★</div>
                    <div className="text-xs font-semibold">Premium Rating</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 shadow-xl animate-float delay-1000">
                  <div className="text-center">
                    <div className="text-2xl font-black">25K+</div>
                    <div className="text-xs font-semibold">Happy Customers</div>
                  </div>
                </div>
              </div>

              {/* Orbiting Elements - Only show after mount */}
              {isMounted && (
                <div className="absolute inset-0 pointer-events-none">
                  {[Star, Sparkles, Leaf].map((Icon, index) => (
                    <div
                      key={index}
                      className="absolute animate-spin"
                      style={{
                        top: `${20 + index * 25}%`,
                        left: `${-5 + index * 110}%`,
                        animationDuration: `${6 + index * 2}s`,
                        animationDirection: index % 2 ? "reverse" : "normal",
                      }}
                    >
                      <Icon className="h-6 w-6 text-white/30" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-16 space-x-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-12 h-3 bg-gradient-to-r from-white to-green-400 shadow-lg"
                  : "w-3 h-3 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator - Only show after mount */}
        {isMounted && (
          <div className="flex justify-center mt-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
              <div className="text-sm text-white/90 flex items-center gap-3 font-medium">
                {isAutoPlaying ? (
                  <>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span>Auto-advancing • Slide {currentSlide + 1} of {heroSlides.length}</span>
                    <div className="w-6 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-400 rounded-full animate-pulse" 
                        style={{ 
                          animation: 'slideProgress 4s linear infinite',
                          width: '0%'
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span>Paused • Slide {currentSlide + 1} of {heroSlides.length}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
            <div className="w-2 h-4 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
