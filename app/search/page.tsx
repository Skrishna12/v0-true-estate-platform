"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Filter } from "lucide-react"
import Navigation from "@/components/navigation"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          address: "123 Main St, San Francisco, CA",
          price: "$4,500/month",
          type: "Apartment",
          verified: true,
          trustScore: 95,
        },
        {
          id: 2,
          address: "456 Oak Ave, San Francisco, CA",
          price: "$3,200/month",
          type: "Condo",
          verified: true,
          trustScore: 88,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Properties</h1>

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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">{properties.length} Properties Found</h2>

            {properties.map((property: any) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{property.address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{property.price}</p>
                      <p className="text-gray-600">{property.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {property.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Verified</span>
                        )}
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Trust Score: {property.trustScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive map will load here</p>
                <p className="text-sm text-gray-400">Mapbox integration required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
