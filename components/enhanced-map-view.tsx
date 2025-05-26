"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Plus,
  Minus,
  Maximize,
  Target,
  Filter,
  Heart,
  Building2,
  Bell,
  User,
  Search,
  Save,
  Download,
  Eye,
  Layers,
  Bookmark,
  Share,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

interface Property {
  id: string
  lat: number
  lng: number
  address: string
  value: number
  size: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  ownerName: string
  ownerNetWorth: number
  trustScore: number
  lastSale: string
  images: string[]
  isBookmarked: boolean
}

interface MapFilter {
  valueRange: [number, number]
  sizeRange: [number, number]
  netWorthRange: [number, number]
  propertyTypes: string[]
  minTrustScore: number
}

export default function EnhancedMapView() {
  const [mapStyle, setMapStyle] = useState("standard")
  const [zoomLevel, setZoomLevel] = useState(5)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [savedViews, setSavedViews] = useState<string[]>([])
  const [filters, setFilters] = useState<MapFilter>({
    valueRange: [0, 10000000],
    sizeRange: [0, 10000],
    netWorthRange: [0, 100000000],
    propertyTypes: [],
    minTrustScore: 0,
  })

  // Sample property data
  const [properties] = useState<Property[]>([
    {
      id: "1",
      lat: 37.7749,
      lng: -122.4194,
      address: "123 Market St, San Francisco, CA",
      value: 1200000,
      size: 1800,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: "Condo",
      ownerName: "John Smith",
      ownerNetWorth: 5000000,
      trustScore: 95,
      lastSale: "2022-03-15",
      images: ["/placeholder.svg?height=200&width=300"],
      isBookmarked: false,
    },
    {
      id: "2",
      lat: 40.7128,
      lng: -74.006,
      address: "456 Broadway, New York, NY",
      value: 2500000,
      size: 2200,
      bedrooms: 4,
      bathrooms: 3,
      propertyType: "Apartment",
      ownerName: "Sarah Johnson",
      ownerNetWorth: 12000000,
      trustScore: 88,
      lastSale: "2021-11-20",
      images: ["/placeholder.svg?height=200&width=300"],
      isBookmarked: true,
    },
    {
      id: "3",
      lat: 34.0522,
      lng: -118.2437,
      address: "789 Sunset Blvd, Los Angeles, CA",
      value: 1800000,
      size: 2500,
      bedrooms: 4,
      bathrooms: 3,
      propertyType: "House",
      ownerName: "Pacific Real Estate LLC",
      ownerNetWorth: 50000000,
      trustScore: 92,
      lastSale: "2023-01-10",
      images: ["/placeholder.svg?height=200&width=300"],
      isBookmarked: false,
    },
  ])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleSaveView = () => {
    const viewName = `View ${savedViews.length + 1}`
    setSavedViews([...savedViews, viewName])
  }

  const handleBookmark = (propertyId: string) => {
    // In a real app, this would update the backend
    console.log(`Bookmarked property ${propertyId}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getPropertyClusterSize = (zoom: number) => {
    if (zoom < 6) return "large"
    if (zoom < 10) return "medium"
    return "small"
  }

  return (
    <div className="h-screen bg-gray-100 relative">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 bg-white shadow-sm border-b z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">TrueEstate</span>
                <span className="text-xs text-gray-500">Property Intelligence Platform</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button className="text-blue-600 font-medium">Property Map</button>
              <button className="text-gray-700 hover:text-gray-900">Search</button>
              <button className="text-gray-700 hover:text-gray-900">Reports</button>
              <button className="text-gray-700 hover:text-gray-900">Analytics</button>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
                    3
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">AU</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="absolute top-20 left-4 right-4 z-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-lg shadow-lg border">
            <Search className="h-5 w-5 text-gray-400 ml-4" />
            <Input
              type="text"
              placeholder="Search by address, owner name, or property characteristics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus:ring-0"
            />
            <Button className="m-2">Search</Button>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-32 left-4 z-10 space-y-2">
        {/* Map Style Toggle */}
        <Card className="p-2">
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4" />
            <Select value={mapStyle} onValueChange={setMapStyle}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Filter Toggle */}
        <Card className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-start"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters ({Object.values(filters).flat().length})
          </Button>
        </Card>

        {/* Zoom Controls */}
        <Card className="p-2">
          <div className="flex flex-col space-y-2">
            <Button size="sm" onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => setZoomLevel(Math.max(1, zoomLevel - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Target className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="absolute top-32 left-48 w-80 z-10 max-h-96 overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Advanced Filters</span>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                ×
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Value Range */}
            <div>
              <Label className="text-sm font-medium">Property Value Range</Label>
              <div className="mt-2">
                <Slider
                  value={filters.valueRange}
                  onValueChange={(value) => setFilters({ ...filters, valueRange: value as [number, number] })}
                  max={10000000}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatCurrency(filters.valueRange[0])}</span>
                  <span>{formatCurrency(filters.valueRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Property Size Range */}
            <div>
              <Label className="text-sm font-medium">Property Size (sq ft)</Label>
              <div className="mt-2">
                <Slider
                  value={filters.sizeRange}
                  onValueChange={(value) => setFilters({ ...filters, sizeRange: value as [number, number] })}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{filters.sizeRange[0].toLocaleString()} sq ft</span>
                  <span>{filters.sizeRange[1].toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>

            {/* Owner Net Worth Range */}
            <div>
              <Label className="text-sm font-medium">Owner Net Worth Range</Label>
              <div className="mt-2">
                <Slider
                  value={filters.netWorthRange}
                  onValueChange={(value) => setFilters({ ...filters, netWorthRange: value as [number, number] })}
                  max={100000000}
                  step={1000000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatCurrency(filters.netWorthRange[0])}</span>
                  <span>{formatCurrency(filters.netWorthRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Property Types */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Property Types</Label>
              <div className="space-y-2">
                {["House", "Condo", "Apartment", "Commercial", "Land"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.propertyTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters({ ...filters, propertyTypes: [...filters.propertyTypes, type] })
                        } else {
                          setFilters({
                            ...filters,
                            propertyTypes: filters.propertyTypes.filter((t) => t !== type),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={type} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score */}
            <div>
              <Label className="text-sm font-medium">Minimum Trust Score: {filters.minTrustScore}%</Label>
              <Slider
                value={[filters.minTrustScore]}
                onValueChange={(value) => setFilters({ ...filters, minTrustScore: value[0] })}
                max={100}
                step={5}
                className="w-full mt-2"
              />
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                Apply Filters
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setFilters({
                    valueRange: [0, 10000000],
                    sizeRange: [0, 10000],
                    netWorthRange: [0, 100000000],
                    propertyTypes: [],
                    minTrustScore: 0,
                  })
                }
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <div className="w-full h-full pt-16 relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0">
            {mapStyle === "satellite" ? (
              <div className="w-full h-full bg-gradient-to-br from-green-800 to-blue-900"></div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-200"></div>
            )}
          </div>

          {/* Property Markers with Clustering */}
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${30 + index * 20}%`,
                top: `${40 + index * 15}%`,
              }}
              onClick={() => setSelectedProperty(property)}
            >
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                    property.trustScore > 90
                      ? "bg-green-500"
                      : property.trustScore > 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                ></div>
                {property.isBookmarked && (
                  <Heart className="absolute -top-1 -right-1 h-3 w-3 text-red-500 fill-current" />
                )}
              </div>
            </div>
          ))}

          {/* Property Detail Popup */}
          {selectedProperty && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <Card className="w-96 shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{selectedProperty.ownerName}</CardTitle>
                      <p className="text-sm text-gray-600">{selectedProperty.address}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={selectedProperty.trustScore > 90 ? "default" : "secondary"}>
                          Trust Score: {selectedProperty.trustScore}%
                        </Badge>
                        {selectedProperty.isBookmarked && <Badge variant="outline">Bookmarked</Badge>}
                      </div>
                    </div>
                    <button onClick={() => setSelectedProperty(null)} className="text-gray-400 hover:text-gray-600">
                      ×
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs defaultValue="property" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="property">Property</TabsTrigger>
                      <TabsTrigger value="owner">Owner</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="property" className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Value</p>
                          <p className="text-xl font-bold text-green-600">{formatCurrency(selectedProperty.value)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Size</p>
                          <p className="text-lg font-semibold">{selectedProperty.size.toLocaleString()} sq ft</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Beds</p>
                          <p className="font-semibold">{selectedProperty.bedrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Baths</p>
                          <p className="font-semibold">{selectedProperty.bathrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Type</p>
                          <p className="font-semibold">{selectedProperty.propertyType}</p>
                        </div>
                      </div>

                      {selectedProperty.images.length > 0 && (
                        <div>
                          <img
                            src={selectedProperty.images[0] || "/placeholder.svg"}
                            alt="Property"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="owner" className="space-y-3">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Owner Name</p>
                          <p className="font-semibold">{selectedProperty.ownerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimated Net Worth</p>
                          <p className="text-lg font-bold text-blue-600">
                            {formatCurrency(selectedProperty.ownerNetWorth)}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <AlertCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">Confidence: High • Updated: 2 days ago</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Wealth Sources</p>
                          <div className="text-sm text-gray-700">
                            <p>• Real Estate Portfolio: 60%</p>
                            <p>• Business Investments: 30%</p>
                            <p>• Securities: 10%</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Last Sale</p>
                        <p className="font-semibold">{selectedProperty.lastSale}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Transaction History</p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>• Purchased: {selectedProperty.lastSale}</p>
                          <p>• Previous Sale: 2019-05-12</p>
                          <p>• Original Purchase: 2015-08-20</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex space-x-2">
                    <Button className="flex-1" onClick={() => handleBookmark(selectedProperty.id)}>
                      <Bookmark className="h-4 w-4 mr-2" />
                      {selectedProperty.isBookmarked ? "Bookmarked" : "Bookmark"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          © TrueEstate • Data from multiple sources • Zoom: {zoomLevel}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="absolute top-16 right-0 w-80 h-full bg-white shadow-xl z-10 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              <Button size="sm" onClick={handleSaveView} className="bg-gray-900">
                <Save className="h-4 w-4 mr-1" />
                Save View
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Live Market Intelligence */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Live Market Data
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Portfolio Value</span>
                <span className="font-bold text-green-600">$63.7M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Properties Shown</span>
                <span className="font-bold">{properties.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Trust Score</span>
                <span className="font-bold text-blue-600">
                  {Math.round(properties.reduce((acc, p) => acc + p.trustScore, 0) / properties.length)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Net Worth Owners</span>
                <span className="font-bold text-purple-600">
                  {properties.filter((p) => p.ownerNetWorth > 10000000).length}
                </span>
              </div>
            </div>
          </div>

          {/* Saved Views */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Saved Views ({savedViews.length})</h3>
            {savedViews.length > 0 ? (
              <div className="space-y-2">
                {savedViews.map((view, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{view}</span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No saved views yet</p>
              </div>
            )}
          </div>

          {/* Bookmarked Properties */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Bookmarked Properties
            </h3>
            {properties.filter((p) => p.isBookmarked).length > 0 ? (
              <div className="space-y-2">
                {properties
                  .filter((p) => p.isBookmarked)
                  .map((property) => (
                    <div key={property.id} className="p-3 border rounded-lg">
                      <p className="font-medium text-sm">{property.address}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(property.value)}</p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Heart className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No bookmarked properties</p>
              </div>
            )}
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Data Sources</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Property Records</span>
                <Badge variant="outline" className="text-xs">
                  Live
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Ownership Data</span>
                <Badge variant="outline" className="text-xs">
                  Updated 2h ago
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Wealth Estimates</span>
                <Badge variant="outline" className="text-xs">
                  Updated 1d ago
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
