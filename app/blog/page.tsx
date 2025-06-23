import type { Metadata } from "next"
import { BlogGrid } from "@/components/blog-grid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Media Center - Recipes, Tips & Stories",
  description:
    "Discover healthy recipes, nutrition tips, and behind-the-scenes stories from Krishanova FPC. Learn about makhana benefits, cooking tips, and healthy lifestyle choices.",
  keywords: [
    "makhana recipes",
    "healthy snack recipes",
    "nutrition tips",
    "cooking with makhana",
    "fox nuts recipes",
    "healthy lifestyle",
    "Krishanova blog",
    "food stories",
  ],
  openGraph: {
    title: "Media Center - Recipes, Tips & Stories | Krishanova FPC",
    description: "Discover healthy recipes, nutrition tips, and behind-the-scenes stories from our kitchen.",
    url: "https://krishanova.in/blog",
    images: [
      {
        url: "/images/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krishanova FPC Blog - Recipes and Stories",
      },
    ],
  },
  alternates: {
    canonical: "https://krishanova.in/blog",
  },
}

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Krishanova FPC Media Center",
  description: "Recipes, nutrition tips, and stories about healthy snacking with makhana",
  url: "https://krishanova.in/blog",
  publisher: {
    "@type": "Organization",
    name: "Krishanova FPC",
    logo: "https://krishanova.in/images/krishanova-logo.png",
  },
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Media Center</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Media Center</h1>
          <p className="text-muted-foreground">
            Discover recipes, nutrition tips, and behind-the-scenes stories from our kitchen.
          </p>
        </div>

        <BlogGrid />
      </div>
    </>
  )
}
