import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Building,
  Headset,
  Package,
} from "lucide-react"
import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Krishanova FPC - Get in Touch",
  description:
    "Contact Krishanova FPC for premium makhana orders, bulk inquiries, partnerships, or any questions. Phone: +91 91220 85387, Email: info.krishanova@gmail.com. Located in Darbhanga, Bihar.",
  keywords: [
    "contact Krishanova FPC",
    "makhana supplier contact",
    "bulk order inquiry",
    "customer support",
    "Darbhanga makhana",
    "fox nuts wholesale",
    "organic snacks contact",
  ],
  openGraph: {
    title: "Contact Krishanova FPC - Get in Touch",
    description: "Contact us for premium makhana orders, bulk inquiries, partnerships, or any questions. We're here to help!",
    url: "https://krishanova.in/contact",
    images: [
      {
        url: "/images/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Krishanova FPC",
      },
    ],
  },
  alternates: {
    canonical: "https://krishanova.in/contact",
  },
}

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    content: "+91 91220 85387",
    href: "tel:+919122085387",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info.krishanova@gmail.com",
    href: "mailto:info.krishanova@gmail.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Darbhanga, Bihar, India",
    href: "https://maps.google.com/?q=Darbhanga,+Bihar,+India",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM",
  },
]

const departmentContacts = [
    {
        icon: Headset,
        title: "Customer Support",
        email: "info.krishanova@gmail.com",
        description: "For help with existing orders, tracking, and returns."
    },
    {
        icon: Package,
        title: "Bulk Orders & B2B",
        email: "info.krishanova@gmail.com",
        description: "For wholesale inquiries, partnerships, and bulk pricing."
    },
    {
        icon: Building,
        title: "Corporate Office",
        email: "info.krishanova@gmail.com",
        description: "For media inquiries, careers, and other corporate matters."
    }
]

export default function ContactPage() {
  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-bold uppercase tracking-wider text-primary">
            Get in Touch
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            We&apos;re Here to Help
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Have a question, a comment, or a craving for makhana? We&apos;d love
            to hear from you. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  {item.content}
                </a>
              ) : (
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>
        
        <Separator className="my-16" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Form</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                Please fill out the form below and we'll get back to you as soon as possible.
            </p>
            <div className="mt-8 space-y-6">
                {departmentContacts.map((dept) => (
                    <div key={dept.title} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <dept.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{dept.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{dept.description}</p>
                            <a href={`mailto:${dept.email}`} className="text-sm font-medium text-primary hover:underline">
                                {dept.email}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  We typically respond within 1-2 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 