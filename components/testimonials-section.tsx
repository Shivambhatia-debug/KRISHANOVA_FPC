"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fitness Enthusiast",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "FreshBites has completely transformed my snacking habits! Their makhana is absolutely delicious and I love that it's 100% organic. Perfect for my fitness journey!",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Working Professional",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "As a busy professional, I needed healthy snacking options that don't compromise on taste. FreshBites delivers exactly that - premium quality and amazing flavors!",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Anita Patel",
    role: "Health Coach",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "I recommend FreshBites to all my clients. Their commitment to organic, preservative-free products aligns perfectly with my philosophy of clean eating.",
    location: "Bangalore",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Gym Owner",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The protein bars from FreshBites are a hit at my gym! Members love the taste and I love that they're made with natural ingredients. Highly recommended!",
    location: "Pune",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our happy customers have to say about their FreshBites
            experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />

                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      <p className="text-lg text-gray-700 mb-8 leading-relaxed italic">"{testimonial.text}"</p>

                      <div className="flex items-center justify-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary scale-125 shadow-lg" : "bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
