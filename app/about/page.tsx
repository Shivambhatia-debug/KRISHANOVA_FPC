import type { Metadata } from "next"
import Image from "next/image"
import { Award, Users, Leaf, Heart, Target, Globe, Star, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "About Krishanova FPC - Our Story & Mission",
  description:
    "Learn about Krishanova FPC's journey from a small Bihar-based startup to India's leading premium makhana brand. Discover our commitment to quality, sustainability, and farmer welfare.",
  keywords: [
    "Krishanova FPC story",
    "about makhana company",
    "Bihar makhana farmers",
    "organic food company",
    "premium makhana brand",
    "sustainable agriculture",
    "farmer producer company",
  ],
  openGraph: {
    title: "About Krishanova FPC - Our Story & Mission",
    description: "Learn about our journey from Bihar to becoming India's leading premium makhana brand.",
    url: "https://krishanovafpc.com/about",
    images: [
      {
        url: "/images/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krishanova FPC - About Our Story",
      },
    ],
  },
  alternates: {
    canonical: "https://krishanovafpc.com/about",
  },
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Krishanova FPC",
  url: "https://krishanovafpc.com",
  logo: "https://krishanovafpc.com/images/krishanova-logo.png",
  description: "Premium makhana and healthy snacks company based in Bihar, India",
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Krishanova FPC Founders",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Muzaffarpur",
    addressLocality: "Muzaffarpur",
    addressRegion: "Bihar",
    addressCountry: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    email: "hello@krishanovafpc.com",
    contactType: "customer service",
  },
}

const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "Started as a small farmer collective in Muzaffarpur, Bihar",
  },
  {
    year: "2021",
    title: "First Export",
    description: "Shipped our first premium makhana batch to major cities",
  },
  {
    year: "2022",
    title: "Organic Certification",
    description: "Received FSSAI and organic certifications",
  },
  {
    year: "2023",
    title: "National Recognition",
    description: "Became a leading premium makhana brand across India",
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Launched new product lines and international expansion",
  },
]

const values = [
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "100% Organic",
    description: "All our products are certified organic, free from chemicals and pesticides",
  },
  {
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: "Farmer First",
    description: "We ensure fair prices and better livelihoods for our partner farmers",
  },
  {
    icon: <Award className="h-8 w-8 text-blue-600" />,
    title: "Premium Quality",
    description: "Rigorous quality control ensures only the best products reach you",
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-600" />,
    title: "Sustainable",
    description: "Environmentally responsible practices in every step of production",
  },
]

const certifications = [
  "FSSAI Certified",
  "ISO 22000:2018",
  "Organic India Certified",
  "GMP Certified",
  "HACCP Compliant",
  "Export Quality",
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Since 2020
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                  Our Story of Growth & Quality
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From the fertile fields of Bihar to kitchens across India, Krishanova FPC has been on a mission 
                  to bring you the finest quality makhana and healthy snacks while empowering local farmers.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <Users className="h-4 w-4" />
                  <span>500+ Partner Farmers</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                  <Globe className="h-4 w-4" />
                  <span>Pan-India Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">
                  <Star className="h-4 w-4" />
                  <span>4.8/5 Customer Rating</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/makhana-1.jpg"
                  alt="Krishanova FPC Makhana Farm"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-800">
                      "Premium quality makhana, directly from Bihar's finest farms"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to packaging to customer service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
                <CardContent className="space-y-4 p-0">
                  <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in premium healthy snacks.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-green-500 to-emerald-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
                      <CardContent className="space-y-3 p-0">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          {milestone.year}
                        </Badge>
                        <h3 className="font-bold text-xl text-gray-800">{milestone.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden lg:block w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Quality Certifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is backed by industry-leading certifications and standards.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
                <CardContent className="space-y-3 p-0">
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-800">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="p-8 lg:p-12 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="space-y-6 p-0">
              <h2 className="text-3xl lg:text-4xl font-bold">Ready to Taste the Difference?</h2>
              <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                Experience the finest quality makhana and healthy snacks, crafted with love and delivered fresh to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
} 