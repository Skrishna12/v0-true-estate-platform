import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Property } from "@/lib/types"

interface PropertyLocationProps {
  property: Property
}

export function PropertyLocation({ property }: PropertyLocationProps) {
  const hasLocation = property.location && property.location.lat && property.location.lng

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          {hasLocation ? (
            <div className="h-[400px] w-full rounded-md bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Map View
                <br />
                Lat: {property.location.lat}, Lng: {property.location.lng}
              </div>
            </div>
          ) : (
            <div className="h-[400px] w-full rounded-md bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Map data not available
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Transportation</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Bus Stop - 0.2 miles</li>
                <li>Subway Station - 0.5 miles</li>
                <li>Train Station - 1.2 miles</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Education</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Elementary School - 0.3 miles</li>
                <li>High School - 0.7 miles</li>
                <li>University - 1.5 miles</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Healthcare</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Hospital - 1.0 mile</li>
                <li>Pharmacy - 0.2 miles</li>
                <li>Clinic - 0.5 miles</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Shopping</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Grocery Store - 0.3 miles</li>
                <li>Shopping Mall - 1.2 miles</li>
                <li>Convenience Store - 0.1 miles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commute Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span>Downtown</span>
              <span className="font-medium">15 mins</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span>Airport</span>
              <span className="font-medium">25 mins</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <span>Business District</span>
              <span className="font-medium">20 mins</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
