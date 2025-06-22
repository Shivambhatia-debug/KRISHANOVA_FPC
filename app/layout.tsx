import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { StructuredData } from "@/components/structured-data"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://krishanovafpc.com"),
  title: {
    default: "Krishanova FPC - Premium Makhana & Healthy Snacks | 100% Organic Fox Nuts",
    template: "%s | Krishanova FPC",
  },
  description:
    "Discover premium quality makhana (fox nuts) and healthy snacks from Krishanova FPC. 100% natural, organic, and delicious. Free shipping on orders above ₹500. Order online with fast delivery across India.",
  keywords: [
    "makhana",
    "fox nuts",
    "healthy snacks",
    "organic food",
    "protein snacks",
    "lotus seeds",
    "natural snacks",
    "gluten free",
    "vegan snacks",
    "Indian superfoods",
    "Krishanova FPC",
    "premium makhana",
    "roasted makhana",
    "flavored makhana",
  ],
  authors: [{ name: "Krishanova FPC" }],
  creator: "Krishanova FPC",
  publisher: "Krishanova FPC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://krishanovafpc.com",
    siteName: "Krishanova FPC",
    title: "Krishanova FPC - Premium Makhana & Healthy Snacks",
    description:
      "Premium quality makhana (fox nuts) and healthy snacks. 100% natural, organic, and delicious. Free shipping on orders above ₹500.",
    images: [
      {
        url: "/images/krishanova-logo.png",
        width: 1200,
        height: 630,
        alt: "Krishanova FPC Premium Makhana Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@krishanovafpc",
    creator: "@krishanovafpc",
    title: "Krishanova FPC - Premium Makhana & Healthy Snacks",
    description: "Premium quality makhana (fox nuts) and healthy snacks. 100% natural, organic, and delicious.",
    images: ["/images/krishanova-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "food",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#16a34a" }],
  },
  alternates: {
    canonical: "https://krishanovafpc.com",
    languages: {
      "en-IN": "https://krishanovafpc.com",
      "hi-IN": "https://krishanovafpc.com/hi",
    },
  },
  generator: 'Krishanova FPC'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="dns-prefetch" href="https://api.krishanovafpc.com" />
        <link rel="preload" href="/images/makhana-1.jpg" as="image" type="image/jpeg" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Krishanova FPC" />
        <meta name="application-name" content="Krishanova FPC" />
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#16a34a" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
