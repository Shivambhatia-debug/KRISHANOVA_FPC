"use client"

import { useState, useEffect } from "react"
import { Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import GoogleSheetsService from "@/lib/google-sheets"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()

  // Fix hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    try {
      await GoogleSheetsService.subscribeNewsletter(email)
      
      setIsSubscribed(true)
      toast({
        title: "Successfully subscribed! 📧",
        description: "Welcome to our newsletter! Check your email for exclusive offers.",
      })
      setEmail("")
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      toast({
        title: "Subscription Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-white/80 mb-8">
              Get the latest recipes, nutrition tips, and exclusive offers delivered straight to your inbox.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Check className="h-8 w-8 text-green-400" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-white/80 mb-8">
              You've successfully subscribed to our newsletter. Welcome to the Krishanova FPC family!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-white/80 mb-8">
            Get the latest recipes, nutrition tips, and exclusive offers delivered straight to your inbox. Join our
            community of health-conscious food lovers!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-xl"
            />
            <Button 
              type="submit"
              disabled={isLoading || !email}
              className="bg-white text-purple-600 hover:bg-white/90 whitespace-nowrap rounded-xl font-semibold"
            >
              {isLoading ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>

          <p className="text-xs text-white/60 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}
