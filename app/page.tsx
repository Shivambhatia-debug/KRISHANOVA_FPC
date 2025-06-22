"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { Newsletter } from "@/components/newsletter"
import { BrandStoryScroll } from "@/components/brand-story-scroll"
import { TrustBadges } from "@/components/trust-badges"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const orderSuccess = searchParams.get('orderSuccess')
    if (orderSuccess) {
      toast({
        title: "🎉 Order Confirmed!",
        description: `Order #${orderSuccess} placed successfully! Our team will contact you within 24 hours for confirmation.`,
        duration: 8000,
      })
      
      // Clean URL
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams, toast])

  return (
    <main>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <BrandStoryScroll />
      <FeaturesSection />
      <TrustBadges />
      <TestimonialsSection />
      <StatsSection />
      <Newsletter />
    </main>
  )
}
