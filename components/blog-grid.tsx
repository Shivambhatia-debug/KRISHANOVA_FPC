import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: "1",
    title: "10 Healthy Snacking Tips for Busy Professionals",
    excerpt:
      "Discover how to maintain healthy eating habits even with a packed schedule. Learn about nutritious snacks that boost energy and productivity.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Nutrition",
    date: "2024-01-15",
    readTime: "5 min read",
    slug: "healthy-snacking-tips-busy-professionals",
  },
  {
    id: "2",
    title: "The Complete Guide to Makhana: Benefits and Recipes",
    excerpt:
      "Everything you need to know about fox nuts - from their incredible health benefits to delicious ways to prepare them at home.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Recipes",
    date: "2024-01-12",
    readTime: "8 min read",
    slug: "complete-guide-makhana-benefits-recipes",
  },
  {
    id: "3",
    title: "Behind the Scenes: How We Source Our Organic Ingredients",
    excerpt:
      "Take a journey with us to meet our partner farmers and learn about our commitment to sustainable, organic farming practices.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Brand Story",
    date: "2024-01-10",
    readTime: "6 min read",
    slug: "behind-scenes-organic-ingredients-sourcing",
  },
  {
    id: "4",
    title: "Protein-Rich Snacks for Your Fitness Journey",
    excerpt:
      "Fuel your workouts with these delicious, protein-packed snacks that support muscle recovery and sustained energy.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fitness",
    date: "2024-01-08",
    readTime: "4 min read",
    slug: "protein-rich-snacks-fitness-journey",
  },
  {
    id: "5",
    title: "Seasonal Eating: Winter Superfoods to Boost Immunity",
    excerpt:
      "Discover the power of seasonal eating with these winter superfoods that naturally boost your immune system.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Wellness",
    date: "2024-01-05",
    readTime: "7 min read",
    slug: "seasonal-eating-winter-superfoods-immunity",
  },
  {
    id: "6",
    title: "Quick & Healthy Breakfast Ideas for Busy Mornings",
    excerpt: "Start your day right with these nutritious breakfast ideas that take less than 10 minutes to prepare.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Recipes",
    date: "2024-01-03",
    readTime: "5 min read",
    slug: "quick-healthy-breakfast-ideas-busy-mornings",
  },
]

const categories = ["All", "Nutrition", "Recipes", "Brand Story", "Fitness", "Wellness"]

// Helper function to format date consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function BlogGrid() {
  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Post */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image
              src={blogPosts[0].image || "/placeholder.svg"}
              alt={blogPosts[0].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <Badge className="w-fit mb-4">{blogPosts[0].category}</Badge>
            <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
            <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blogPosts[0].date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blogPosts[0].readTime}</span>
              </div>
            </div>
            <Button asChild>
              <Link href={`/blog/${blogPosts[0].slug}`}>
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post) => (
          <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="space-y-2">
                <Badge className="w-fit">{post.category}</Badge>
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </div>
  )
}
