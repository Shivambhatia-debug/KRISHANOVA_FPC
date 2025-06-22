export interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  subCategory?: string
  weight: string
  ingredients: string[]
  nutritionFacts: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sodium: number
  }
  tags: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  features: string[]
  shelfLife: string
  certifications: string[]
  bestSeller?: boolean
  newArrival?: boolean
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "premium-roasted-makhana",
    name: "Premium Roasted Makhana",
    slug: "premium-roasted-makhana",
    description: "Crispy, naturally roasted makhana with no added oil or preservatives",
    longDescription: "Our signature premium roasted makhana is carefully selected from the finest lotus seeds and roasted to perfection. Each piece delivers the perfect crunch while maintaining the natural nutrition that makes makhana a superfood.",
    price: 299,
    originalPrice: 349,
    discount: 14,
    images: ["/images/premium-makhana-pack.jpg", "/images/makhana-1.jpg", "/images/makhana-2.jpg"],
    category: "Makhana",
    subCategory: "Roasted",
    weight: "100g",
    ingredients: ["100% Natural Lotus Seeds (Makhana)", "Rock Salt"],
    nutritionFacts: {
      calories: 347,
      protein: 9.7,
      carbs: 76.9,
      fat: 0.1,
      fiber: 14.5,
      sodium: 1
    },
    tags: ["organic", "gluten-free", "vegan", "high-protein", "low-fat"],
    inStock: true,
    rating: 4.8,
    reviewCount: 234,
    features: ["100% Natural", "No Oil Added", "High Protein", "Gluten Free", "Crunchy Texture"],
    shelfLife: "12 months",
    certifications: ["FSSAI", "Organic India", "ISO 22000"],
    bestSeller: true,
    featured: true
  },
  {
    id: "tangy-masala-makhana",
    name: "Tangy Masala Makhana",
    slug: "tangy-masala-makhana",
    description: "Perfectly spiced makhana with a tangy twist that tingles your taste buds",
    longDescription: "Experience the perfect blend of traditional Indian spices with premium makhana. Our tangy masala flavor combines the goodness of makhana with aromatic spices for a delightful snacking experience.",
    price: 329,
    originalPrice: 389,
    discount: 15,
    images: ["/images/tangy-makhana-pack.jpg", "/images/makhana-3.jpg", "/images/makhana-4.jpg"],
    category: "Makhana",
    subCategory: "Flavored",
    weight: "100g",
    ingredients: ["Lotus Seeds (Makhana)", "Spice Mix", "Black Salt", "Cumin", "Coriander", "Red Chili", "Natural Flavors"],
    nutritionFacts: {
      calories: 352,
      protein: 9.5,
      carbs: 77.2,
      fat: 0.3,
      fiber: 14.2,
      sodium: 2.1
    },
    tags: ["spicy", "tangy", "flavored", "gluten-free", "vegan"],
    inStock: true,
    rating: 4.7,
    reviewCount: 189,
    features: ["Authentic Spices", "Tangy Flavor", "No Artificial Colors", "Traditional Recipe"],
    shelfLife: "12 months",
    certifications: ["FSSAI", "ISO 22000"],
    bestSeller: true
  },
  {
    id: "chocolate-coated-makhana",
    name: "Chocolate Coated Makhana",
    slug: "chocolate-coated-makhana",
    description: "Indulgent dark chocolate coating on premium makhana for guilt-free dessert",
    longDescription: "Satisfy your sweet cravings with our chocolate-coated makhana. Premium quality makhana covered in rich dark chocolate, creating the perfect healthy dessert option.",
    price: 399,
    originalPrice: 459,
    discount: 13,
    images: ["/images/makhana-1.jpg", "/images/makhana-2.jpg"],
    category: "Makhana",
    subCategory: "Sweet",
    weight: "100g",
    ingredients: ["Lotus Seeds (Makhana)", "Dark Chocolate (70% Cocoa)", "Natural Vanilla", "Organic Sugar"],
    nutritionFacts: {
      calories: 425,
      protein: 8.9,
      carbs: 68.5,
      fat: 12.3,
      fiber: 11.8,
      sodium: 0.8
    },
    tags: ["chocolate", "sweet", "dessert", "antioxidants", "dark-chocolate"],
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    features: ["70% Dark Chocolate", "Antioxidant Rich", "Natural Sweetener", "Premium Quality"],
    shelfLife: "10 months",
    certifications: ["FSSAI", "Organic India"],
    newArrival: true
  },
  {
    id: "pudina-mint-makhana",
    name: "Pudina Mint Makhana",
    slug: "pudina-mint-makhana",
    description: "Refreshing mint-flavored makhana for a cool and crispy snacking experience",
    longDescription: "Cool and refreshing pudina mint makhana made with natural mint extracts. Perfect for those who love fresh, aromatic flavors with the nutrition of makhana.",
    price: 319,
    originalPrice: 369,
    discount: 14,
    images: ["/images/makhana-3.jpg", "/images/makhana-4.jpg"],
    category: "Makhana",
    subCategory: "Flavored",
    weight: "100g",
    ingredients: ["Lotus Seeds (Makhana)", "Mint Extract", "Black Salt", "Cumin", "Natural Flavors"],
    nutritionFacts: {
      calories: 349,
      protein: 9.6,
      carbs: 76.5,
      fat: 0.2,
      fiber: 14.3,
      sodium: 1.8
    },
    tags: ["mint", "refreshing", "cooling", "natural", "aromatic"],
    inStock: true,
    rating: 4.6,
    reviewCount: 127,
    features: ["Natural Mint", "Cooling Effect", "Digestive Properties", "Fresh Flavor"],
    shelfLife: "12 months",
    certifications: ["FSSAI", "ISO 22000"]
  },
  {
    id: "makhana-trail-mix",
    name: "Makhana Trail Mix",
    slug: "makhana-trail-mix",
    description: "Nutritious trail mix with makhana, nuts, and dried fruits for energy on-the-go",
    longDescription: "Perfect energy booster combining premium makhana with carefully selected nuts and dried fruits. Ideal for hiking, travel, or any time you need healthy energy.",
    price: 449,
    originalPrice: 529,
    discount: 15,
    images: ["/images/makhana-2.jpg", "/images/makhana-1.jpg"],
    category: "Trail Mix",
    weight: "150g",
    ingredients: ["Makhana", "Almonds", "Cashews", "Raisins", "Dried Cranberries", "Pumpkin Seeds"],
    nutritionFacts: {
      calories: 485,
      protein: 15.2,
      carbs: 52.3,
      fat: 24.8,
      fiber: 8.7,
      sodium: 2.5
    },
    tags: ["trail-mix", "energy", "nuts", "dried-fruits", "portable"],
    inStock: true,
    rating: 4.8,
    reviewCount: 98,
    features: ["Energy Boost", "Mixed Nutrients", "Travel Friendly", "No Preservatives"],
    shelfLife: "8 months",
    certifications: ["FSSAI", "ISO 22000"]
  },
  {
    id: "cheese-herbs-makhana",
    name: "Cheese & Herbs Makhana",
    slug: "cheese-herbs-makhana",
    description: "Gourmet makhana with rich cheese flavor and aromatic herbs",
    longDescription: "Indulge in our gourmet cheese and herbs makhana, featuring natural cheese powder and carefully selected herbs for a sophisticated snacking experience.",
    price: 369,
    originalPrice: 419,
    discount: 12,
    images: ["/images/makhana-4.jpg", "/images/makhana-3.jpg"],
    category: "Makhana",
    subCategory: "Gourmet",
    weight: "100g",
    ingredients: ["Lotus Seeds (Makhana)", "Natural Cheese Powder", "Oregano", "Basil", "Thyme", "Garlic Powder"],
    nutritionFacts: {
      calories: 365,
      protein: 11.2,
      carbs: 74.8,
      fat: 2.1,
      fiber: 13.9,
      sodium: 3.2
    },
    tags: ["cheese", "herbs", "gourmet", "savory", "premium"],
    inStock: true,
    rating: 4.5,
    reviewCount: 87,
    features: ["Natural Cheese", "Herb Blend", "Gourmet Taste", "Rich Flavor"],
    shelfLife: "10 months",
    certifications: ["FSSAI", "ISO 22000"],
    newArrival: true
  },
  {
    id: "peri-peri-makhana",
    name: "Peri Peri Makhana",
    slug: "peri-peri-makhana",
    description: "Fiery peri peri flavored makhana for spice lovers",
    longDescription: "Turn up the heat with our peri peri makhana! Infused with authentic peri peri spices for those who love bold, fiery flavors.",
    price: 339,
    originalPrice: 389,
    discount: 13,
    images: ["/images/makhana-1.jpg", "/images/makhana-4.jpg"],
    category: "Makhana",
    subCategory: "Spicy",
    weight: "100g",
    ingredients: ["Lotus Seeds (Makhana)", "Peri Peri Spice Mix", "Paprika", "Garlic", "Lemon Powder", "Natural Flavors"],
    nutritionFacts: {
      calories: 354,
      protein: 9.4,
      carbs: 77.1,
      fat: 0.4,
      fiber: 14.1,
      sodium: 2.8
    },
    tags: ["peri-peri", "spicy", "hot", "bold-flavor", "fiery"],
    inStock: true,
    rating: 4.7,
    reviewCount: 142,
    features: ["Authentic Peri Peri", "Spicy Heat", "Bold Flavor", "No Artificial Heat"],
    shelfLife: "12 months",
    certifications: ["FSSAI", "ISO 22000"]
  },
  {
    id: "himalayan-salt-makhana",
    name: "Himalayan Salt Makhana",
    slug: "himalayan-salt-makhana",
    description: "Premium makhana with pure Himalayan pink salt for natural flavor",
    longDescription: "Experience the pure taste of makhana enhanced with mineral-rich Himalayan pink salt. Simple, natural, and delicious.",
    price: 309,
    originalPrice: 359,
    discount: 14,
    images: ["/images/makhana-2.jpg", "/images/makhana-3.jpg"],
    category: "Makhana",
    subCategory: "Natural",
    weight: "100g",
    ingredients: ["100% Natural Lotus Seeds (Makhana)", "Himalayan Pink Salt"],
    nutritionFacts: {
      calories: 348,
      protein: 9.8,
      carbs: 76.7,
      fat: 0.1,
      fiber: 14.6,
      sodium: 1.2
    },
    tags: ["himalayan-salt", "natural", "mineral-rich", "pure", "simple"],
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
    features: ["Himalayan Pink Salt", "Mineral Rich", "Pure Taste", "Natural Flavor"],
    shelfLife: "12 months",
    certifications: ["FSSAI", "Organic India", "ISO 22000"],
    featured: true
  }
]

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "makhana", name: "Makhana", count: products.filter(p => p.category === "Makhana").length },
  { id: "trail-mix", name: "Trail Mix", count: products.filter(p => p.category === "Trail Mix").length },
  { id: "roasted", name: "Roasted", count: products.filter(p => p.subCategory === "Roasted").length },
  { id: "flavored", name: "Flavored", count: products.filter(p => p.subCategory === "Flavored").length },
  { id: "sweet", name: "Sweet", count: products.filter(p => p.subCategory === "Sweet").length },
]

export const priceRanges = [
  { id: "0-300", name: "Under ₹300", min: 0, max: 300 },
  { id: "300-400", name: "₹300 - ₹400", min: 300, max: 400 },
  { id: "400-500", name: "₹400 - ₹500", min: 400, max: 500 },
  { id: "500+", name: "Above ₹500", min: 500, max: Infinity },
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase() ||
    product.subCategory?.toLowerCase() === category.toLowerCase()
  )
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured)
}

export function getBestSellerProducts(): Product[] {
  return products.filter(product => product.bestSeller)
}

export function getNewArrivalProducts(): Product[] {
  return products.filter(product => product.newArrival)
}

export function filterProducts(filters: {
  category?: string
  priceRange?: { min: number; max: number }
  tags?: string[]
  inStock?: boolean
  search?: string
}): Product[] {
  let filtered = products

  if (filters.category && filters.category !== "all") {
    filtered = getProductsByCategory(filters.category)
  }

  if (filters.priceRange) {
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange!.min && 
      product.price <= filters.priceRange!.max
    )
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(product =>
      filters.tags!.some(tag => product.tags.includes(tag))
    )
  }

  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock)
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  return filtered
} 