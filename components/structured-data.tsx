export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Krishanova FPC",
    alternateName: "Krishanova Farmer Producer Company",
    url: "https://krishanova.in",
    logo: "https://krishanova.in/images/krishanova-logo.png",
    description:
      "Premium makhana (fox nuts) and healthy snacks manufacturer. 100% organic, natural, and sustainably sourced.",
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Krishanova FPC Founders",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Darbhanga",
      addressLocality: "Darbhanga",
      addressRegion: "Bihar",
      postalCode: "846004",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-91220-85387",
      contactType: "customer service",
      email: "info.krishanova@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/krishanova",
      "https://www.instagram.com/krishanova",
      "https://www.twitter.com/krishanova",
      "https://www.linkedin.com/company/krishanova",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Krishanova FPC",
    url: "https://krishanova.in",
    description: "Premium makhana and healthy snacks online store",
    publisher: {
      "@type": "Organization",
      name: "Krishanova FPC",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://krishanova.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://krishanova.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://krishanova.in/shop",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Products",
        item: "https://krishanova.in/shop/products",
      },
    ],
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Premium Roasted Makhana",
    description: "Premium quality roasted makhana (fox nuts) - 100% organic, high protein, gluten-free healthy snack",
    brand: {
      "@type": "Brand",
      name: "Krishanova FPC",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Krishanova FPC",
    },
    image: [
      "https://krishanova.in/images/makhana-1.jpg",
      "https://krishanova.in/images/premium-makhana-pack.jpg",
    ],
    sku: "KF-MAK-001",
    mpn: "KRISHANOVA-MAKHANA-PREMIUM",
    category: "Food & Beverages > Snack Foods",
    offers: {
      "@type": "Offer",
      url: "https://krishanova.in/product/premium-roasted-makhana",
      priceCurrency: "INR",
      price: "299",
      priceValidUntil: "2024-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Krishanova FPC",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
      bestRating: "5",
      worstRating: "1",
    },
    nutrition: {
      "@type": "NutritionInformation",
      calories: "347 calories",
      proteinContent: "9.7g",
      carbohydrateContent: "76.9g",
      fatContent: "0.1g",
      fiberContent: "14.5g",
      servingSize: "100g",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is makhana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Makhana, also known as fox nuts or lotus seeds, are edible seeds from the lotus flower. They are a popular healthy snack in India, rich in protein, low in fat, and naturally gluten-free.",
        },
      },
      {
        "@type": "Question",
        name: "Are Krishanova FPC products organic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all Krishanova FPC products are 100% organic and certified. We source directly from organic farms and maintain strict quality standards throughout our production process.",
        },
      },
      {
        "@type": "Question",
        name: "What are the health benefits of makhana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Makhana is high in protein (9.7g per 100g), low in fat, rich in antioxidants, and contains essential minerals. It's great for weight management, heart health, and provides sustained energy.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer free shipping?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer free shipping on all orders above ₹500 across India. Orders are typically delivered within 2-5 business days.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
