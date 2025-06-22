"use client"

import { useEffect, useState, useRef } from "react"
import { Users, ShoppingBag, Award, Leaf, TrendingUp, Globe, Heart } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 25000,
    label: "Global Customers",
    suffix: "+",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    description: "Across 15+ countries",
  },
  {
    icon: ShoppingBag,
    value: 100000,
    label: "Orders Delivered",
    suffix: "+",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    description: "With 99.8% satisfaction",
  },
  {
    icon: Award,
    value: 4.9,
    label: "Premium Rating",
    suffix: "★",
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-50 to-orange-50",
    description: "Industry leading quality",
  },
  {
    icon: Leaf,
    value: 100,
    label: "Organic Certified",
    suffix: "%",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    description: "Farm to table guarantee",
  },
]

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isVisible])

  return (
    <div ref={ref} className="text-5xl font-black">
      {count}
      <span className="text-3xl">{suffix}</span>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%2316a34a%22 fillOpacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 mb-8 shadow-xl border border-green-200">
            <TrendingUp className="h-6 w-6 text-green-600 animate-pulse" />
            <span className="text-lg font-bold text-green-700">Real-Time Impact</span>
          </div>

          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Transforming Lives
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our revolutionary approach to healthy snacking is creating waves across the globe. Join the nutrition
            revolution that's changing how the world snacks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group relative" style={{ animationDelay: `${index * 200}ms` }}>
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      <stat.icon className="h-10 w-10 text-white" />
                    </div>

                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  {/* Number */}
                  <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors font-medium">
                    {stat.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 delay-500`}
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                LIVE
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <Globe className="h-6 w-6 animate-spin" />
            <span className="text-lg font-bold">Join the Global Movement</span>
            <Heart className="h-6 w-6 animate-pulse text-red-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
