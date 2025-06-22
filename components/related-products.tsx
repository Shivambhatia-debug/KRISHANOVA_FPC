import { ProductCard } from "@/components/product-card"

const relatedProducts = [
  {
    id: "2",
    name: "Mixed Nuts & Seeds",
    price: 449,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    badges: ["Protein Rich"],
    slug: "mixed-nuts-seeds",
  },
  {
    id: "3",
    name: "Chocolate Protein Bar",
    price: 199,
    originalPrice: 249,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    badges: ["New", "High Protein"],
    slug: "chocolate-protein-bar",
  },
  {
    id: "4",
    name: "Herbal Green Tea",
    price: 349,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    badges: ["Organic", "Detox"],
    slug: "herbal-green-tea",
  },
  {
    id: "5",
    name: "Quinoa Granola",
    price: 399,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 67,
    badges: ["Gluten Free"],
    slug: "quinoa-granola",
  },
]

export function RelatedProducts() {
  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">You May Also Like</h2>
        <p className="text-muted-foreground">Similar products that other customers loved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
