"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Filter, DollarSign, Home, Calendar, User } from "lucide-react"
import Navigation from "@/components/navigation"

interface Property {
  id: string
  source: string
  address: string
  price?: number
  rentEstimate?: number
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  propertyType?: string
  yearBuilt?: number
  ownerName?: string
  lastSaleDate?: string
  lastSalePrice?: number
  zestimate?: number
  confidence?: number
  rentRange?: { low: number; high: number }
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/properties/search?address=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (response.ok) {
        setProperties(data.properties || [])
        if (data.errors?.length > 0) {
          setError(`Some data sources unavailable: ${data.errors.join(", ")}`)
        }
      } else {
        setError(data.message || "Search failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price?: number) => {
    if (!price) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case "zillow":
        return "bg-blue-100 text-blue-800"
      case "attom":
        return "bg-green-100 text-green-800"
      case "rentcast":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Intelligence Search</h1>
          <p className="text-gray-600 mb-6">Search properties using multiple data sources for comprehensive insights</p>

          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter address, city, or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {properties.length} Properties Found
              {properties.length > 0 && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  from {new Set(properties.map((p) => p.source)).size} data sources
                </span>
              )}
            </h2>

            {properties.map((property) => (
              <Card key={`${property.source}-${property.id}`} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{property.address}</CardTitle>
                    <Badge className={getSourceColor(property.source)}>{property.source.toUpperCase()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Price Information */}
                    <div className="space-y-2">
                      {property.price && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">{formatPrice(property.price)}</span>
                          <span className="text-sm text-gray-500">Market Value</span>
                        </div>
                      )}
                      {property.rentEstimate && (
                        <div className="flex items-center space-x-2">
                          <Home className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold text-blue-600">{formatPrice(property.rentEstimate)}/mo</span>
                          <span className="text-sm text-gray-500">Rent Estimate</span>
                        </div>
                      )}
                      {property.zestimate && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          <span className="font-semibold text-purple-600">{formatPrice(property.zestimate)}</span>
                          <span className="text-sm text-gray-500">Zestimate</span>
                        </div>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="space-y-2">
                      {(property.bedrooms || property.bathrooms || property.sqft) && (
                        <div className="text-sm text-gray-600">
                          {property.bedrooms && `${property.bedrooms} bed`}
                          {property.bedrooms && property.bathrooms && " • "}
                          {property.bathrooms && `${property.bathrooms} bath`}
                          {(property.bedrooms || property.bathrooms) && property.sqft && " • "}
                          {property.sqft && `${property.sqft.toLocaleString()} sqft`}
                        </div>
                      )}
                      {property.propertyType && (
                        <div className="text-sm text-gray-600">Type: {property.propertyType}</div>
                      )}
                      {property.yearBuilt && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          <span>Built {property.yearBuilt}</span>
                        </div>
                      )}
                      {property.ownerName && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <User className="h-3 w-3" />
                          <span>Owner: {property.ownerName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(property.lastSaleDate || property.lastSalePrice || property.confidence) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        {property.lastSaleDate && property.lastSalePrice && (
                          <span>
                            Last sold: {formatPrice(property.lastSalePrice)} on {property.lastSaleDate}
                          </span>
                        )}
                        {property.confidence && <span>Confidence: {property.confidence}%</span>}
                      </div>
                    </div>
                  )}

                  {/* Rent Range */}
                  {property.rentRange && (
                    <div className="mt-2 text-sm text-gray-600">
                      Rent Range: {formatPrice(property.rentRange.low)} - {formatPrice(property.rentRange.high)}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {properties.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500">Try searching for a different address or location</p>
              </div>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive map will load here</p>
                <p className="text-sm text-gray-400">Mapbox integration with property markers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
