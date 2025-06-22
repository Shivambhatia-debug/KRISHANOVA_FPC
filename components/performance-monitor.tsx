"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming
            console.log("Page Load Time:", navEntry.loadEventEnd - navEntry.loadEventStart)
          }

          if (entry.entryType === "paint") {
            console.log(`${entry.name}:`, entry.startTime)
          }
        }
      })

      observer.observe({ entryTypes: ["navigation", "paint"] })

      // Monitor LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log("LCP:", lastEntry.startTime)
      })

      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

      // Monitor FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log("FID:", entry.processingStart - entry.startTime)
        }
      })

      fidObserver.observe({ entryTypes: ["first-input"] })

      return () => {
        observer.disconnect()
        lcpObserver.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])

  return null
}
