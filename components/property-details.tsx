import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Property } from "@/lib/types"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Property ID</h4>
              <p>{property.property_id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Value</h4>
              <p>${property.value.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Size</h4>
              <p>{property.size || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Owner ID</h4>
              <p>{property.owner_id}</p>
            </div>
            {property.city && (
              <>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">City</h4>
                  <p>{property.city}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">State</h4>
                  <p>{property.state}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Zip Code</h4>
                  <p>{property.zipcode}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {property.description ||
              "This property is located in a prime location with excellent amenities nearby. The property offers good investment potential and has been well-maintained over the years."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-2">
            {(
              property.amenities || [
                "Parking Available",
                "Security System",
                "Central Heating",
                "Air Conditioning",
                "High-Speed Internet",
                "Elevator Access",
              ]
            ).map((amenity, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
