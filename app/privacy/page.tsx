import type { Metadata } from "next"
import { Shield, Lock, Eye, UserCheck } from "lucide-react"
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
  title: "Privacy Policy | Krishanova FPC",
  description: "Learn how Krishanova FPC collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  keywords: ["privacy policy", "data protection", "personal information", "Krishanova FPC privacy"],
}

const sections = [
  {
    title: "Information We Collect",
    icon: <Eye className="h-6 w-6" />,
    content: [
      "Personal Information: Name, email address, phone number, delivery address when you place an order or create an account.",
      "Payment Information: Credit card details, billing address, and payment preferences (processed securely through our payment partners).",
      "Usage Data: Information about how you use our website, including pages visited, time spent, and interaction patterns.",
      "Device Information: IP address, browser type, operating system, and device identifiers for security and optimization purposes.",
      "Communications: Records of your interactions with our customer support team and marketing preferences."
    ]
  },
  {
    title: "How We Use Your Information",
    icon: <UserCheck className="h-6 w-6" />,
    content: [
      "Order Processing: To process your orders, arrange delivery, and provide customer support.",
      "Account Management: To create and manage your account, track your orders, and maintain your preferences.",
      "Communication: To send order confirmations, shipping updates, and respond to your inquiries.",
      "Marketing: To send promotional offers, newsletters, and product updates (only with your consent).",
      "Improvement: To analyze usage patterns and improve our website, products, and services.",
      "Legal Compliance: To comply with applicable laws, regulations, and legal processes."
    ]
  },
  {
    title: "Information Sharing",
    icon: <Shield className="h-6 w-6" />,
    content: [
      "Service Providers: We share information with trusted partners who help us deliver our services (payment processors, shipping companies, customer support).",
      "Business Partners: With your consent, we may share information with business partners for joint marketing efforts.",
      "Legal Requirements: We may disclose information when required by law, court order, or to protect our rights and safety.",
      "Business Transfers: In case of merger, acquisition, or sale of assets, your information may be transferred to the new entity.",
      "No Sale of Data: We never sell your personal information to third parties for their marketing purposes."
    ]
  },
  {
    title: "Data Security",
    icon: <Lock className="h-6 w-6" />,
    content: [
      "Encryption: All sensitive data is encrypted during transmission using SSL/TLS protocols.",
      "Secure Storage: Personal information is stored on secure servers with restricted access and regular security audits.",
      "Access Controls: Only authorized personnel have access to your personal information on a need-to-know basis.",
      "Regular Updates: We regularly update our security measures to protect against new threats and vulnerabilities.",
      "Payment Security: All payment information is processed by PCI DSS compliant payment processors."
    ]
  }
]

export default function PrivacyPage() {
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
              <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="text-sm text-gray-500">
            Last updated: December 2024
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                    {section.icon}
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Additional Important Information */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Rights</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Access:</strong> You can request access to your personal information we hold.</p>
                <p><strong>Correction:</strong> You can update or correct your personal information at any time.</p>
                <p><strong>Deletion:</strong> You can request deletion of your personal information (subject to legal requirements).</p>
                <p><strong>Portability:</strong> You can request a copy of your data in a portable format.</p>
                <p><strong>Objection:</strong> You can object to processing of your personal information for marketing purposes.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cookies and Tracking</h3>
              <div className="space-y-3 text-gray-700">
                <p>We use cookies and similar technologies to enhance your browsing experience:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our website</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-700">
                <p>For any privacy-related questions or concerns, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@krishanovafpc.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> Krishanova FPC, Muzaffarpur, Bihar 842001, India</p>
                </div>
                <p>We will respond to your privacy inquiries within 30 days.</p>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              This privacy policy may be updated from time to time. We will notify you of any significant changes.
            </p>
            <p className="text-sm text-gray-500">
              By using our website and services, you consent to the collection and use of your information as described in this policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 