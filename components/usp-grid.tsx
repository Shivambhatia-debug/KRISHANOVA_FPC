"use client"

import { useState } from "react"
import { Zap, Shield, Leaf, Heart, Award, Recycle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const usps = [
  {
    icon: Zap,
    title: "Protein-Rich",
    description: "Packed with 9.7g protein per 100g for sustained energy and muscle health",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    hoverColor: "hover:from-orange-100 hover:to-red-100",
  },
  {
    icon: Shield,
    title: "No Preservatives",
    description: "100% natural with zero artificial additives or harmful chemicals",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    hoverColor: "hover:from-blue-100 hover:to-cyan-100",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainably sourced with biodegradable packaging for a greener planet",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    hoverColor: "hover:from-green-100 hover:to-emerald-100",
  },
  {
    icon: Heart,
    title: "Heart Healthy",
    description: "Low in fat and sodium, rich in antioxidants for cardiovascular wellness",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50",
    hoverColor: "hover:from-pink-100 hover:to-rose-100",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handpicked fox nuts with rigorous quality checks at every step",
    color: "from-purple-500 to-violet-500",
    bgColor: "from-purple-50 to-violet-50",
    hoverColor: "hover:from-purple-100 hover:to-violet-100",
  },
  {
    icon: Recycle,
    title: "Sustainable",
    description: "Supporting local farmers with fair trade practices and eco-conscious methods",
    color: "from-teal-500 to-cyan-500",
    bgColor: "from-teal-50 to-cyan-50",
    hoverColor: "hover:from-teal-100 hover:to-cyan-100",
  },
]

export function USPGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%2316a34a%22 fillOpacity=%220.3%22%3E%3Cpath d=%22M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 mb-6 border border-green-200">
            <Award className="h-5 w-5 text-green-600" />
            <span className="text-base font-bold text-green-700">Why Choose Us</span>
          </div>
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            Pure Nutrition, Premium Quality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every pack of Krishanova FPC makhana is crafted with care, ensuring you get the finest quality nutrition
            that nature has to offer.
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <Card
              key={index}
              className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 bg-gradient-to-br ${usp.bgColor} ${usp.hoverColor} rounded-3xl overflow-hidden`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-8 text-center relative">
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${usp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${usp.color} rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}
                  >
                    <usp.icon className="h-10 w-10 text-white" />

                    {/* Floating particles */}
                    {hoveredIndex === index && (
                      <>
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {usp.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {usp.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${usp.color} rounded-full transition-all duration-1000 delay-300 ${
                      hoveredIndex === index ? "w-full" : "w-0"
                    }`}
                  />
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200">
          {[
            { number: "25K+", label: "Happy Customers" },
            { number: "100%", label: "Natural & Organic" },
            { number: "4.9★", label: "Average Rating" },
            { number: "50+", label: "Cities Served" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
