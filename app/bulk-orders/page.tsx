"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Package, Users, Truck, Star, Calculator, CheckCircle, Loader2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useToast } from "@/hooks/use-toast"
import GoogleSheetsService from "@/lib/google-sheets"
import { useHasMounted } from "@/hooks/use-has-mounted"
import { Skeleton } from "@/components/ui/skeleton"

const pricingTiers = [
  { min: 50, max: 199, discount: 10, price: "₹450/kg" },
  { min: 200, max: 499, discount: 15, price: "₹425/kg" },
  { min: 500, max: 999, discount: 20, price: "₹400/kg" },
  { min: 1000, max: null, discount: 25, price: "₹375/kg" },
]

const benefits = [
  { icon: <Package />, title: "Bulk Packaging", desc: "Custom packaging solutions for your business needs" },
  { icon: <Truck />, title: "Free Shipping", desc: "Free delivery for orders above 200kg across India" },
  { icon: <Star />, title: "Premium Quality", desc: "Same premium quality as retail, just better pricing" },
  { icon: <Users />, title: "Dedicated Support", desc: "Dedicated account manager for bulk customers" },
]

const formSchema = z.object({
  companyName: z.string().min(2, "Business name must be at least 2 characters."),
  contactName: z.string().min(2, "Contact name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  product: z.string({ required_error: "Please select a product." }),
  quantity: z.string({ required_error: "Please select an estimated quantity." }),
  message: z.string().optional(),
})

type BulkOrderFormValues = z.infer<typeof formSchema>

const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
       <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-12 w-full" />
  </div>
);

export default function BulkOrdersPage() {
  const { toast } = useToast()
  const hasMounted = useHasMounted()
  
  const form = useForm<BulkOrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const { isSubmitting } = form.formState;

  async function onSubmit(data: BulkOrderFormValues) {
    try {
      await GoogleSheetsService.submitBulkOrder(data as any)

      toast({
        title: "Bulk Order Inquiry Submitted! 🎉",
        description: "Our team will contact you within 24 hours with a customized quote.",
      })
      form.reset()
    } catch (error) {
      console.error('Error submitting bulk order:', error)
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Bulk Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Wholesale & Bulk Orders
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Scale Your Business with Premium Makhana
          </h1>
          <p className="text-lg text-gray-600">
            Perfect for restaurants, retailers, distributors, and food businesses. Get wholesale pricing 
            with minimum order of 50kg. Free shipping on orders above 200kg.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Wholesale Pricing Tiers</h2>
          <p className="text-gray-600">Volume-based pricing with increasing discounts</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <CardContent className="space-y-4 p-0">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">
                    {tier.min}kg {tier.max ? `- ${tier.max}kg` : '+'}
                  </h3>
                  <Badge className="bg-green-100 text-green-800">{tier.discount}% OFF</Badge>
                </div>
                <div className="text-2xl font-black text-green-600">{tier.price}</div>
                <p className="text-sm text-gray-600">Per kilogram</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="space-y-4 p-0">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bulk Inquiry Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Calculator className="h-6 w-6 text-green-600" />
                Request Bulk Quote
              </CardTitle>
              <p className="text-gray-600">Get customized pricing for your bulk requirements</p>
            </CardHeader>
            <CardContent className="p-0">
              {!hasMounted ? (
                <FormSkeleton />
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="business@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 XXXXX XXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="product"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Interest *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a product" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="classic-makhana">Classic Salted Makhana</SelectItem>
                                <SelectItem value="tangy-tomato-makhana">Tangy Tomato Makhana</SelectItem>
                                <SelectItem value="cheese-makhana">Cheese Makhana</SelectItem>
                                <SelectItem value="pudina-makhana">Pudina Makhana</SelectItem>
                                <SelectItem value="raw-makhana">Raw Makhana (Phool)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estimated Quantity (Monthly) *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a quantity" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="50-199kg">50-199kg</SelectItem>
                                <SelectItem value="200-499kg">200-499kg</SelectItem>
                                <SelectItem value="500-999kg">500-999kg</SelectItem>
                                <SelectItem value="1000kg+">1000kg+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your specific needs (e.g., custom packaging, specific delivery schedule)..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Quote"
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-gray-800">Why Choose Us for Bulk Orders?</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  {[
                    "Consistent quality and supply",
                    "Flexible payment terms",
                    "Custom packaging solutions",
                    "Direct from farm to business",
                    "FSSAI and export quality certified",
                    "Dedicated account manager",
                    "Competitive wholesale pricing",
                    "Pan-India delivery network"
                  ].map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {hasMounted && (
              <Card className="p-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Phone className="h-6 w-6" />
                    Direct Contact
                  </CardTitle>
                  <p className="opacity-90">For immediate assistance or specific queries</p>
                </CardHeader>
                <CardContent className="space-y-4 p-0">
                  <p>
                    Our bulk order specialists are available to help you with your order.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="secondary" className="bg-white text-green-700 hover:bg-green-50 flex-1">
                      <a href="tel:+919876543210">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now: +91 98765 43210
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 flex-1">
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 fill-current"><title>WhatsApp</title><path d="M17.472 14.382c-.297-.149-.88-.436-1.017-.487s-.396-.074-.567.074-.567.487-.694.567-.255.099-.487-.05s-1.017-.375-1.94-1.21-.714-1.485-.804-1.733s-.074-.224.05-.375.224-.28.347-.375.149-.174.224-.28s.025-.149-.05-.325-.567-1.374-.737-1.882-.347-.436-.567-.436h-.567c-.224 0-.487.05-.694.325s-.804.787-.804 1.882c0 1.096.83 2.175.929 2.325s1.615 2.473 3.918 3.443.787.325 1.066.276c.436-.074 1.374-.567 1.57-1.112s.2-1.017.149-1.112zM12.002 2.179c-5.42 0-9.818 4.398-9.818 9.818 0 2.894 1.253 5.49 3.271 7.34l-1.63 4.348 4.46-1.608c1.78.966 3.804 1.516 5.92 1.516h.002c5.42 0 9.818-4.398 9.818-9.818 0-5.42-4.398-9.818-9.818-9.818zm0 18.01c-2.34 0-4.51-.76-6.28-2.05l-.45-.27-4.66 1.68 1.69-4.54-.3-.48c-1.39-2.22-2.13-4.79-2.13-7.53 0-4.59 3.73-8.32 8.32-8.32 4.59 0 8.32 3.73 8.32 8.32 0 4.59-3.73 8.32-8.32 8.32z"/></svg>
                        WhatsApp Us
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 