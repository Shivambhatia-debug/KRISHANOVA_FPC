import { Shield, Truck, Leaf, Award } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "100% Safe",
      description: "Secure payments & data protection",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹500",
    },
    {
      icon: Leaf,
      title: "Organic Certified",
      description: "Premium quality ingredients",
    },
    {
      icon: Award,
      title: "5-Star Rated",
      description: "Loved by 10,000+ customers",
    },
  ]

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
