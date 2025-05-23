import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/lib/types"
import { CheckCircle, XCircle } from "lucide-react"

interface OwnerPropertiesProps {
  properties: Property[]
}

export function OwnerProperties({ properties }: OwnerPropertiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Owned Properties</CardTitle>
      </CardHeader>
      <CardContent>
        {properties.length === 0 ? (
          <p className="text-center text-muted-foreground">No properties found for this owner</p>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.property_id} className="rounded-lg border p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <Link href={`/properties/${property.property_id}`} className="font-medium hover:underline">
                      {property.name || property.address}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {property.city ? `${property.city}, ${property.state}` : property.address}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {property.verified ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3 text-red-600" />
                          Unverified
                        </span>
                      )}
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      ${property.value.toLocaleString()}
                    </Badge>
                    {property.size && <Badge variant="outline">{property.size}</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
