"use client"

import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Very lightweight parallax scroller.
 * Four full-viewport slides: Origin ▸ Harvest ▸ Benefits ▸ CTA to shop.
 * Uses IntersectionObserver so it only does work when visible.
 */
const slides = [
  {
    id: 1,
    title: "Our Origin",
    text: "Born in the fertile plains of Bihar, India, Krishanova FPC partners directly with small farmers.",
    img: "/images/makhana-1.jpg",
  },
  {
    id: 2,
    title: "Careful Harvest",
    text: "Fox nuts are hand-picked at dawn and solar-dried to lock in crunch and nutrition.",
    img: "/images/makhana-2.jpg",
  },
  {
    id: 3,
    title: "Science-Backed Benefits",
    text: "Low glycaemic load, high protein and antioxidants—perfect fuel for modern lifestyles.",
    img: "/images/makhana-3.jpg",
  },
  {
    id: 4,
    title: "Taste The Future",
    text: "Ready to crunch better? Explore our full range of flavour-engineered makhana snacks.",
    img: "/images/makhana-4.jpg",
    cta: true,
  },
]

export function BrandStoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="bg-black text-white">
      {slides.map((slide, idx) => (
        <div key={slide.id} className="relative h-screen flex items-center justify-center overflow-hidden">
          <Image
            src={slide.img || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority={idx === 0}
            sizes="100vw"
            className={`object-cover transition-transform duration-1000 ${visible ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-6">
            <h3 className="text-4xl lg:text-6xl font-black">{slide.title}</h3>
            <p className="text-lg lg:text-2xl text-gray-100">{slide.text}</p>
            {slide.cta && (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-xl font-bold px-10 py-6 rounded-2xl shadow-xl"
              >
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
