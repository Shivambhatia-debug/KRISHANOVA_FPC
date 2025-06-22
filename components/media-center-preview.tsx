"use client"

import { BlogGrid } from "@/components/blog-grid"

/**
 * Thin wrapper so /app/page can import <MediaCenterPreview />.
 * Renders the existing BlogGrid, limited to three posts for brevity.
 */
export function MediaCenterPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
          From Our Media Center
        </h2>
        <BlogGrid />
      </div>
    </section>
  )
}
