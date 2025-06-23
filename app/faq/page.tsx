import type { Metadata } from "next"
import { HelpCircle, Package, Truck, Shield, CreditCard, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Krishanova FPC",
  description: "Find answers to common questions about our premium makhana products, ordering, shipping, quality, and more.",
  keywords: ["makhana FAQ", "fox nuts questions", "organic snacks FAQ", "shipping questions", "quality questions"],
}

const faqCategories = [
  {
    icon: <Package className="h-6 w-6" />,
    title: "Products & Quality",
    color: "bg-blue-100 text-blue-600",
    faqs: [
      {
        question: "What is makhana and why is it healthy?",
        answer: "Makhana (fox nuts) are seeds from the lotus flower, packed with protein, fiber, and essential minerals. They're naturally gluten-free, low in calories, and rich in antioxidants, making them perfect for healthy snacking."
      },
      {
        question: "Are your products organic and natural?",
        answer: "Yes, all our makhana products are 100% organic, naturally grown without pesticides or chemicals. We're FSSAI certified and follow strict quality standards from farm to packaging."
      },
      {
        question: "What flavors do you offer?",
        answer: "We offer original roasted makhana, tangy masala, pudina, chocolate, and seasonal flavors. All flavors use natural ingredients and no artificial preservatives."
      },
      {
        question: "How long do your products stay fresh?",
        answer: "Our makhana has a shelf life of 12 months when stored in a cool, dry place. Once opened, consume within 30 days for best taste and crunch."
      }
    ]
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Shipping & Delivery", 
    color: "bg-green-100 text-green-600",
    faqs: [
      {
        question: "Do you ship pan-India?",
        answer: "Yes, we deliver to all major cities and towns across India. We use reliable courier partners to ensure your orders reach you fresh and on time."
      },
      {
        question: "What are the shipping charges?",
        answer: "Free shipping on orders above ₹500. For orders below ₹500, we charge ₹50 for standard delivery. Express delivery available for ₹100 extra."
      },
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3-5 business days for metro cities and 5-7 days for other locations. Express delivery available in 1-2 days for major cities."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, you'll receive a tracking number via SMS and email once your order is shipped. You can track your package in real-time on our website."
      }
    ]
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Orders & Payment",
    color: "bg-purple-100 text-purple-600", 
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, Google Pay. Cash on delivery available for select locations."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 2 hours of placing it. After that, the order enters processing and cannot be changed. Contact us immediately for urgent changes."
      },
      {
        question: "Do you offer bulk discounts?",
        answer: "Yes, we offer attractive discounts for bulk orders starting from 50kg. Restaurants, retailers, and businesses can get up to 25% off on wholesale orders."
      },
      {
        question: "Is there a minimum order value?",
        answer: "No minimum order value for retail purchases. However, to avail free shipping, your order should be ₹500 or above."
      }
    ]
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Returns & Refunds",
    color: "bg-red-100 text-red-600",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer 7-day return policy for unopened products. If you receive damaged or incorrect items, we'll replace them free of cost or provide full refund."
      },
      {
        question: "How do I return a product?",
        answer: "Contact our customer support with your order number and reason for return. We'll arrange pickup and process your refund within 3-5 business days."
      },
      {
        question: "Do you offer money-back guarantee?",
        answer: "Yes, if you're not satisfied with the quality of our products, we offer 100% money-back guarantee within 7 days of delivery."
      },
      {
        question: "Who pays for return shipping?",
        answer: "If the return is due to our error (wrong/damaged product), we bear the return shipping cost. For other returns, customer pays the return shipping."
      }
    ]
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Business & Partnership",
    color: "bg-orange-100 text-orange-600",
    faqs: [
      {
        question: "Do you supply to restaurants and cafes?",
        answer: "Yes, we're a trusted supplier to 500+ restaurants, cafes, and food businesses across India. We offer competitive wholesale pricing and consistent quality."
      },
      {
        question: "Can I become a distributor?",
        answer: "We're always looking for passionate partners to expand our reach. Contact our partnerships team to discuss distributor opportunities in your region."
      },
      {
        question: "Do you offer private labeling?",
        answer: "Yes, we provide private labeling services for businesses wanting to sell premium makhana under their own brand. Minimum order quantities apply."
      },
      {
        question: "How can I visit your facility?",
        answer: "Factory visits are available by appointment. Contact us to schedule a visit to our state-of-the-art processing facility in Darbhanga, Bihar."
      }
    ]
  }
]

export default function FAQPage() {
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
              <BreadcrumbPage>FAQ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Help Center
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions about our premium makhana products, 
            ordering process, shipping, and more.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${category.color}`}>
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              </div>
              
              <Card className="border-2 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left hover:text-green-600 transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 lg:p-12 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="space-y-6 p-0">
            <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold">Still have questions?</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Contact Support
              </a>
              <a
                href="https://wa.me/919122085387"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                WhatsApp Us
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
} 