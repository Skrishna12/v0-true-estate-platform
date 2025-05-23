"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  pageLoadTime: number
  mapRenderTime: number
  dataFetchTime: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    // Monitor page load performance
    const measurePerformance = () => {
      if (typeof window !== "undefined" && window.performance) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart

        setMetrics({
          pageLoadTime: Math.round(pageLoadTime),
          mapRenderTime: 0, // Will be updated by map component
          dataFetchTime: 0, // Will be updated by data fetching
        })
      }
    }

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
    }

    return () => {
      window.removeEventListener("load", measurePerformance)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development" || !metrics) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
      <div>Page Load: {metrics.pageLoadTime}ms</div>
      <div>Map Render: {metrics.mapRenderTime}ms</div>
      <div>Data Fetch: {metrics.dataFetchTime}ms</div>
    </div>
  )
}
