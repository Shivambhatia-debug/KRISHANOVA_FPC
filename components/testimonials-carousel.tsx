// components/testimonials-carousel.tsx
import { TestimonialsSection } from "./testimonials-section"

/**
 * Thin wrapper so <TestimonialsCarousel /> can be used
 * while re-using the existing TestimonialsSection component.
 */
export function TestimonialsCarousel() {
  return <TestimonialsSection />
}
