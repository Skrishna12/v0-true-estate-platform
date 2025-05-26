"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Save, Download, Building2, Heart, Share, Eye, AlertCircle } from "lucide-react"

interface SearchResult {
  id: string
  type: "property" | "owner"
  address?: string
  ownerName: string
  value: number
  netWorth: number
  trustScore: number
  propertyType?: string
  lastUpdate: string
  confidence: "High" | "Medium" | "Low"
}

interface SavedSearch {
  id: string
  name: string
  query: string
  filters: any
  resultCount: number
  lastRun: string
}

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [results, setResults] = useState<SearchResult[]>([])
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: "1",
      name: "High Value SF Properties",
      query: "San Francisco",
      filters: { valueRange: [2000000, 10000000] },
      resultCount: 45,
      lastRun: "2024-01-15",
    },
    {
      id: "2",
      name: "Tech Executives",
      query: "CEO OR CTO OR Founder",
      filters: { netWorthRange: [50000000, 1000000000] },
      resultCount: 23,
      lastRun: "2024-01-14",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [autoSuggestions, setAutoSuggestions] = useState<string[]>([])

  // Sample search results
  const sampleResults: SearchResult[] = [
    {
      id: "1",
      type: "property",
      address: "123 Market St, San Francisco, CA",
      ownerName: "John Smith",
      value: 2500000,
      netWorth: 15000000,
      trustScore: 95,
      propertyType: "Condo",
      lastUpdate: "2024-01-15",
      confidence: "High",
    },
    {
      id: "2",
      type: "owner",
      ownerName: "Sarah Johnson",
      value: 0,
      netWorth: 25000000,
      trustScore: 88,
      lastUpdate: "2024-01-14",
      confidence: "Medium",
    },
    {
      id: "3",
      type: "property",
      address: "456 Broadway, New York, NY",
      ownerName: "Pacific Real Estate LLC",
      value: 4200000,
      netWorth: 150000000,
      trustScore: 92,
      propertyType: "Commercial",
      lastUpdate: "2024-01-15",
      confidence: "High",
    },
  ]

  const handleSearch = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResults(sampleResults)
      setIsLoading(false)
    }, 1000)
  }

  const handleSaveSearch = () => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: `Search ${savedSearches.length + 1}`,
      query: searchQuery,
      filters: {},
      resultCount: results.length,
      lastRun: new Date().toISOString().split("T")[0],
    }
    setSavedSearches([...savedSearches, newSearch])
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Advanced Search & Analytics</h1>

          {/* Search Interface */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by address, owner name, company, or use natural language..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      // Simulate auto-suggestions
                      if (e.target.value.length > 2) {
                        setAutoSuggestions([
                          "123 Main Street, San Francisco",
                          "John Smith Properties",
                          "Tech executives in Silicon Valley",
                          "Properties over $5M in Manhattan",
                        ])
                      } else {
                        setAutoSuggestions([])
                      }
                    }}
                    className="pl-10 pr-4 py-3 text-lg"
                  />
                  {autoSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                      {autoSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSearchQuery(suggestion)
                            setAutoSuggestions([])
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="properties">Properties Only</SelectItem>
                  <SelectItem value="owners">Owners Only</SelectItem>
                  <SelectItem value="companies">Companies Only</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} disabled={isLoading} className="px-8">
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" onClick={handleSaveSearch} disabled={!searchQuery}>
                <Save className="h-4 w-4 mr-2" />
                Save Search
              </Button>
              <Button variant="outline" disabled={results.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters & Saved Searches */}
          <div className="space-y-6">
            {/* Saved Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Saved Searches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedSearches.map((search) => (
                  <div key={search.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{search.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {search.resultCount}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{search.query}</p>
                    <p className="text-xs text-gray-500">Last run: {search.lastRun}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Filters */}
            {showFilters && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Property Value</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1m">Under $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="10m+">Over $10M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Owner Net Worth</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-10m">Under $10M</SelectItem>
                        <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                        <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                        <SelectItem value="100m+">Over $100M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Trust Score</Label>
                    <Slider defaultValue={[70]} max={100} step={5} className="mt-2" />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <Input placeholder="City, State, or ZIP" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content - Search Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            {results.length > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
                  <p className="text-gray-600">{results.length} results found</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="value-high">Value: High to Low</SelectItem>
                      <SelectItem value="value-low">Value: Low to High</SelectItem>
                      <SelectItem value="trust-score">Trust Score</SelectItem>
                      <SelectItem value="net-worth">Net Worth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Badge variant={result.type === "property" ? "default" : "secondary"}>
                            {result.type === "property" ? "Property" : "Owner"}
                          </Badge>
                          <Badge variant="outline" className={getConfidenceColor(result.confidence)}>
                            {result.confidence} Confidence
                          </Badge>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {result.type === "property" ? result.address : result.ownerName}
                        </h3>

                        {result.type === "property" && <p className="text-gray-600 mb-3">Owner: {result.ownerName}</p>}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {result.type === "property" && (
                            <div>
                              <p className="text-sm text-gray-600">Property Value</p>
                              <p className="font-bold text-green-600">{formatCurrency(result.value)}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-600">Owner Net Worth</p>
                            <p className="font-bold text-blue-600">{formatCurrency(result.netWorth)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Trust Score</p>
                            <p className="font-bold">{result.trustScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Last Updated</p>
                            <p className="text-sm">{result.lastUpdate}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Data verified from 3 sources
                          </div>
                          {result.propertyType && (
                            <div className="flex items-center">
                              <Building2 className="h-4 w-4 mr-1" />
                              {result.propertyType}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          Bookmark
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {results.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
                <p className="text-gray-600 mb-4">
                  Search for properties, owners, or use natural language queries to find what you're looking for.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Try searching for:</p>
                  <p>"Properties owned by tech executives in San Francisco"</p>
                  <p>"Commercial real estate over $10M in Manhattan"</p>
                  <p>"John Smith" or "123 Main Street"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
