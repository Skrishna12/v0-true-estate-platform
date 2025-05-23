"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { Property } from "@/lib/types"
import { Search, Filter, MapPin } from "lucide-react"
import { MapboxMap } from "./mapbox-map"

interface MapViewProps {
  properties: Property[]
}

export function MapView({ properties }: MapViewProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([200000, 1000000])

  // Filter properties that have location data
  const propertiesWithLocation = properties.filter(
    (property) => property.location && property.location.lat && property.location.lng,
  )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search locations..." />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" className="w-full justify-between" onClick={() => setShowFilters(!showFilters)}>
          <span>Filters</span>
          <Filter className="h-4 w-4" />
        </Button>

        {showFilters && (
          <Card className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="pt-2">
                  <Slider defaultValue={priceRange} max={2000000} min={0} step={50000} onValueChange={setPriceRange} />
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <select className="w-full rounded-md border p-2 text-sm">
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Verification Status</Label>
                <select className="w-full rounded-md border p-2 text-sm">
                  <option value="all">All Properties</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </Card>
        )}

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-medium">Properties on Map</h3>
          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            {propertiesWithLocation.length > 0 ? (
              propertiesWithLocation.map((property) => (
                <div key={property.property_id} className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">{property.name || property.address}</p>
                    <p className="text-xs text-muted-foreground">${property.value.toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">No properties with location data</p>
            )}
          </div>
        </div>
      </div>

      <MapboxMap
        properties={propertiesWithLocation}
        onPropertyClick={(property) => {
          // Handle property click - could open a modal or navigate to property page
          window.open(`/properties/${property.property_id}`, "_blank")
        }}
        className="h-[600px] rounded-lg border"
      />
    </div>
  )
}
