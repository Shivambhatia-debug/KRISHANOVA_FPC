import type { Metadata } from "next"
import { Scale, FileText, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  title: "Terms of Service | Krishanova FPC",
  description: "Read the terms and conditions for using Krishanova FPC's website and purchasing our premium makhana products.",
  keywords: ["terms of service", "terms and conditions", "legal", "Krishanova FPC terms"],
  robots: {
    index: false, // Usually terms pages are not indexed
    follow: true,
  },
}

const termsData = [
  {
    icon: FileText,
    title: "Agreement",
    content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    icon: Shield,
    title: "Use License",
    content: "Permission is granted to temporarily download materials on Krishanova FPC's website for personal, non-commercial transitory viewing only.",
  },
  {
    icon: Scale,
    title: "Disclaimer",
    content: "The materials on Krishanova FPC's website are provided on an 'as is' basis. Krishanova FPC makes no warranties, expressed or implied.",
  },
  {
    icon: AlertTriangle,
    title: "Limitations",
    content: "In no event shall Krishanova FPC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit).",
  },
]

export default function TermsPage() {
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
              <BreadcrumbPage>Terms of Service</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Legal Information
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Please read these terms and conditions carefully before using our service.
          </p>
          <div className="text-sm text-gray-500">
            Last updated: December 2024
          </div>
        </div>
      </section>

      {/* Terms Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {termsData.map((item, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <CardContent className="space-y-4 p-0">
                <div className="h-16 w-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <item.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">1. Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                By accessing this website, accessible from krishanova.in, you are agreeing to be bound by these 
                website Terms and Conditions of Use and agree that you are responsible for the agreement with any 
                applicable local laws.
              </p>
              <p className="text-gray-600">
                If you disagree with any of these terms, you are prohibited from accessing this site. The materials 
                contained in this Website are protected by copyright and trade mark law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">2. Use License</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of the materials on Krishanova FPC's website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">3. Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                All product descriptions, images, and specifications are provided for informational purposes. 
                While we strive for accuracy, we do not warrant that product descriptions or other content is 
                accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-gray-600">
                All products are subject to availability. We reserve the right to discontinue any product at any time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">4. Orders and Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By placing an order through our website, you warrant that you are legally capable of entering 
                into binding contracts and are at least 18 years old. We reserve the right to refuse or cancel 
                any order for any reason.
              </p>
              <p className="text-gray-600">
                All prices are subject to change without notice. Payment must be received before products are shipped.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">5. Shipping and Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We aim to process and ship orders within 1-2 business days. Delivery times may vary based on location. 
                Risk of loss and title for products pass to you upon delivery to the carrier.
              </p>
              <p className="text-gray-600">
                Returns are accepted within 7 days of delivery for unopened products in original packaging. 
                Customer is responsible for return shipping costs unless the return is due to our error.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">6. Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of 
                this website, to understand our practices. By using this website, you consent to the collection 
                and use of information as outlined in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">7. Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Any claim related to Krishanova FPC's website shall be governed by the laws of India without regard 
                to its conflict of law provisions. Disputes shall be subject to the jurisdiction of courts in Bihar, India.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">8. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Krishanova FPC reserves the right to revise these terms of service at any time without notice. 
                By using this website, you are agreeing to be bound by the current version of these Terms and Conditions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">9. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> info.krishanova@gmail.com</p>
                <p><strong>Phone:</strong> +91 91220 85387</p>
                <p><strong>Address:</strong> Darbhanga, Bihar 846004, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Footer CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 lg:p-12 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="space-y-6 p-0">
            <h2 className="text-3xl font-bold">Questions about our Terms?</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Our legal team is here to help clarify any questions you may have about our terms of service.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Legal Team
            </a>
          </CardContent>
        </Card>
      </section>
    </div>
  )
} 