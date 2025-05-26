"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Heart, Info, List, Grid } from "lucide-react"

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("las vegas")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState("list")

  const properties = [
    {
      id: 1,
      title: "las vegas",
      location: "Las Vegas, NV",
      saved: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Estate Intelligence Dashboard</h1>
          <p className="text-lg text-gray-600 mb-8">
            Real-time property ownership data, trust scores, and market intelligence powered by AI
          </p>

          {/* Search Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "all" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Results
              </button>
              <button
                onClick={() => setActiveTab("properties")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "properties" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Properties Only
              </button>
              <button
                onClick={() => setActiveTab("verified")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "verified" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Verified Owners
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-lg border-2 border-gray-200 focus-within:border-blue-500">
              <MapPin className="h-5 w-5 text-gray-400 ml-4" />
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus:ring-0 text-lg py-4"
              />
              <Button className="m-2 bg-gray-900 hover:bg-gray-800">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Try: "123 Main St" or "Sarah Johnson Properties" or "Pacific Real Estate"
          </p>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Advanced Filters */}
        <div className="mb-6">
          <Button variant="outline" className="mb-4">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <List className="h-6 w-6 mr-2" />
              Search Results
            </h2>
            <Badge variant="secondary">1 properties</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border rounded px-3 py-1 text-sm">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Trust Score</option>
              </select>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Showing 1 of 1 results</p>

        {/* Property Results */}
        <div className="space-y-4">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-4">{property.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className={`h-4 w-4 ${property.saved ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
