"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, MapPin, DollarSign, Home, Star } from "lucide-react"

interface SearchFilters {
  search: string
  priceRange: [number, number]
  sizeRange: [number, number]
  verified: boolean | null
  transparencyScore: number
  propertyType: string
  location: string
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
}

export function AdvancedSearch({ onSearch, onClear }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    priceRange: [200000, 1000000],
    sizeRange: [500, 5000],
    verified: null,
    transparencyScore: 70,
    propertyType: "all",
    location: "",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = () => {
    onSearch(filters)

    // Track active filters for display
    const active: string[] = []
    if (filters.search) active.push(`Search: "${filters.search}"`)
    if (filters.priceRange[0] > 200000 || filters.priceRange[1] < 1000000) {
      active.push(`Price: $${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`)
    }
    if (filters.verified !== null) active.push(`${filters.verified ? "Verified" : "Unverified"} Only`)
    if (filters.transparencyScore > 70) active.push(`Min ${filters.transparencyScore}% Transparency`)
    if (filters.propertyType !== "all") active.push(`Type: ${filters.propertyType}`)
    if (filters.location) active.push(`Location: ${filters.location}`)

    setActiveFilters(active)
  }

  const handleClear = () => {
    setFilters({
      search: "",
      priceRange: [200000, 1000000],
      sizeRange: [500, 5000],
      verified: null,
      transparencyScore: 70,
      propertyType: "all",
      location: "",
    })
    setActiveFilters([])
    onClear()
  }

  return (
    <div className="space-y-4">
      {/* Quick Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties, owners, or locations..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
          Advanced
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  // Remove specific filter logic would go here
                }}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear All
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      {isExpanded && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Range */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                  max={2000000}
                  min={0}
                  step={50000}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0].toLocaleString()}</span>
                  <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Property Size */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Size (sq ft)
                </Label>
                <Slider
                  value={filters.sizeRange}
                  onValueChange={(value) => setFilters({ ...filters, sizeRange: value as [number, number] })}
                  max={10000}
                  min={0}
                  step={100}
                  className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.sizeRange[0]} sq ft</span>
                  <span>{filters.sizeRange[1]} sq ft</span>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  placeholder="City, State, or ZIP code"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <Label>Property Type</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                >
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed">Mixed Use</option>
                </select>
              </div>
            </div>

            {/* Transparency Score */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Minimum Transparency Score: {filters.transparencyScore}%
              </Label>
              <Slider
                value={[filters.transparencyScore]}
                onValueChange={(value) => setFilters({ ...filters, transparencyScore: value[0] })}
                max={100}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>

            {/* Verification Status */}
            <div className="space-y-2">
              <Label>Verification Status</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-properties"
                    checked={filters.verified === null}
                    onCheckedChange={() => setFilters({ ...filters, verified: null })}
                  />
                  <Label htmlFor="all-properties">All Properties</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified-only"
                    checked={filters.verified === true}
                    onCheckedChange={() => setFilters({ ...filters, verified: true })}
                  />
                  <Label htmlFor="verified-only">Verified Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unverified-only"
                    checked={filters.verified === false}
                    onCheckedChange={() => setFilters({ ...filters, verified: false })}
                  />
                  <Label htmlFor="unverified-only">Unverified Only</Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSearch} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
