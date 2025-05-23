"use client"

import { useState, useEffect } from "react"
import type { Property } from "@/lib/types"

interface UsePropertiesOptions {
  page?: number
  limit?: number
  search?: string
  minPrice?: number
  maxPrice?: number
  verified?: boolean | null
}

interface UsePropertiesResult {
  properties: Property[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  } | null
  refetch: () => void
}

// Helper function to get the base URL
function getBaseUrl() {
  // In client-side, use relative URLs
  if (typeof window !== "undefined") {
    return ""
  }

  // In server environment, use environment variables or default
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }

  // Default to localhost in development
  return "http://localhost:3000"
}

export function useProperties(options: UsePropertiesOptions = {}): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<UsePropertiesResult["pagination"]>(null)

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams()
      if (options.page) queryParams.set("page", options.page.toString())
      if (options.limit) queryParams.set("limit", options.limit.toString())
      if (options.search) queryParams.set("search", options.search)
      if (options.minPrice) queryParams.set("minPrice", options.minPrice.toString())
      if (options.maxPrice) queryParams.set("maxPrice", options.maxPrice.toString())
      if (options.verified !== null && options.verified !== undefined) {
        queryParams.set("verified", options.verified.toString())
      }

      const baseUrl = getBaseUrl()
      const response = await fetch(`${baseUrl}/api/properties?${queryParams}`)
      if (!response.ok) {
        throw new Error("Failed to fetch properties")
      }

      const data = await response.json()
      setProperties(data.properties)
      setPagination(data.pagination)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [options.page, options.limit, options.search, options.minPrice, options.maxPrice, options.verified])

  return {
    properties,
    loading,
    error,
    pagination,
    refetch: fetchProperties,
  }
}
