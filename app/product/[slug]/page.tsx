import type { Metadata } from "next"
import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params

  // In a real app, you'd fetch product data here
  const productName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return {
    title: `${productName} - Premium Makhana | Krishanova FPC`,
    description: `Buy ${productName} online. Premium quality, 100% organic, free shipping on orders above ₹500. High protein, gluten-free healthy snack.`,
    keywords: [
      productName.toLowerCase(),
      "buy makhana online",
      "premium fox nuts",
      "organic snacks",
      "healthy snacks",
      "protein snacks",
      "gluten free",
    ],
    openGraph: {
      title: `${productName} - Premium Makhana | Krishanova FPC`,
      description: `Buy ${productName} online. Premium quality, 100% organic, free shipping on orders above ₹500.`,
      url: `https://krishanova.in/product/${slug}`,
      type: "product",
      images: [
        {
          url: "/images/makhana-1.jpg",
          width: 800,
          height: 800,
          alt: productName,
        },
      ],
    },
    alternates: {
      canonical: `https://krishanova.in/product/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Premium Roasted Makhana",
    description: "Premium quality roasted makhana (fox nuts) - 100% organic, high protein, gluten-free healthy snack",
    image: ["https://krishanova.in/images/makhana-1.jpg"],
    brand: {
      "@type": "Brand",
      name: "Krishanova FPC",
    },
    offers: {
      "@type": "Offer",
      url: `https://krishanova.in/product/${slug}`,
      priceCurrency: "INR",
      price: "299",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Krishanova FPC",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <ProductDetail slug={slug} />
        <RelatedProducts />
      </div>
    </>
  )
}
