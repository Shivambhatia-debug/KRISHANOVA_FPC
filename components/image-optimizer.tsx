"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ width, height }}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className={`relative ${isLoading ? "animate-pulse bg-gray-200" : ""} ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        quality={quality}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        {...props}
      />
    </div>
  )
}
