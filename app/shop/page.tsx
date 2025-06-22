import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Shop Premium Makhana & Healthy Snacks",
  description:
    "Browse our complete collection of premium makhana, fox nuts, and healthy snacks. Filter by flavor, price, and dietary preferences. Free shipping on orders above ₹500.",
  keywords: [
    "buy makhana online",
    "premium fox nuts",
    "healthy snacks shop",
    "organic makhana",
    "roasted makhana",
    "flavored makhana",
    "protein snacks",
    "gluten free snacks",
  ],
  openGraph: {
    title: "Shop Premium Makhana & Healthy Snacks | Krishanova FPC",
    description:
      "Browse our complete collection of premium makhana and healthy snacks. Free shipping on orders above ₹500.",
    url: "https://krishanovafpc.com/shop",
    images: [
      {
        url: "/images/shop-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krishanova FPC Shop - Premium Makhana Collection",
      },
    ],
  },
  alternates: {
    canonical: "https://krishanovafpc.com/shop",
  },
}

const shopPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Shop Premium Makhana & Healthy Snacks",
  description: "Browse our complete collection of premium makhana and healthy snacks",
  url: "https://krishanovafpc.com/shop",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 25,
    itemListElement: [
      {
        "@type": "Product",
        position: 1,
        name: "Premium Roasted Makhana",
        url: "https://krishanovafpc.com/product/premium-roasted-makhana",
      },
    ],
  },
}

export default function ShopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopPageSchema) }} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <ProductFilters />
          </aside>
          <main className="lg:w-3/4">
            <ProductGrid />
          </main>
        </div>
      </div>
    </>
  )
}
