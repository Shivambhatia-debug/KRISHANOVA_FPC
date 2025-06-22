"use client"

import { useState } from "react"
import { Leaf, Shield, Truck, Award, Heart, Recycle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Certified organic ingredients sourced directly from trusted farms",
    color: "text-green-600",
    bgColor: "bg-green-100",
    hoverColor: "hover:bg-green-50",
  },
  {
    icon: Shield,
    title: "No Preservatives",
    description: "Pure and natural with zero artificial preservatives or additives",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    hoverColor: "hover:bg-blue-50",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on orders above ₹500 across India",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    hoverColor: "hover:bg-orange-50",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Rigorous quality checks ensure only the finest products reach you",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    hoverColor: "hover:bg-purple-50",
  },
  {
    icon: Heart,
    title: "Health First",
    description: "Nutritionist-approved recipes for your wellness journey",
    color: "text-red-600",
    bgColor: "bg-red-100",
    hoverColor: "hover:bg-red-50",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Sustainable packaging that's kind to our planet",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    hoverColor: "hover:bg-emerald-50",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
            Why Choose FreshBites?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We're committed to bringing you the finest organic foods with uncompromising quality and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 ${feature.hoverColor}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-6 group-hover:scale-110 transition-all duration-300 ${hoveredIndex === index ? "animate-bounce" : ""}`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
