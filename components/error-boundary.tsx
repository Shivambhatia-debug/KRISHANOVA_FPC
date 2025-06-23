"use client"

import React from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
    
    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      // You can integrate with services like Sentry, LogRocket, etc.
      // logErrorToService(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={() => this.setState({ hasError: false, error: undefined })} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 text-lg">
            We're sorry for the inconvenience. Our team has been notified and is working on a fix.
          </p>
          
          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
              <summary className="cursor-pointer font-semibold text-gray-700">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 text-sm text-red-600 whitespace-pre-wrap">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={resetError} size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600">
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
          
          <Button asChild variant="outline" size="lg" className="border-2 border-green-200 hover:bg-green-50">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            If the problem persists, please contact our support team at{" "}
            <a href="mailto:info.krishanova@gmail.com" className="text-green-600 hover:text-green-700 font-medium">
              info.krishanova@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack: string }) => {
    console.error("Error handled:", error, errorInfo)
    
    if (process.env.NODE_ENV === "production") {
      // Log to external service
      // logErrorToService(error, errorInfo)
    }
  }
} 