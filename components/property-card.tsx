import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import type { Property } from "@/lib/types"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const transparencyScore = property.transparency_score || Math.floor(Math.random() * 30) + 70
  const scoreColor =
    transparencyScore >= 90
      ? "bg-green-100 text-green-800"
      : transparencyScore >= 80
        ? "bg-blue-100 text-blue-800"
        : "bg-yellow-100 text-yellow-800"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground">Property Image</div>
          </div>
          <div className="absolute right-2 top-2 flex gap-2">
            <Badge variant="outline" className={scoreColor}>
              {transparencyScore}% Transparency
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="outline" className="bg-background">
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold">{property.name || property.address}</h3>
          <p className="text-sm text-muted-foreground">
            {property.city ? `${property.city}, ${property.state}` : property.address}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-medium">${property.value.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{property.size || "N/A"}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link href={`/properties/${property.property_id}`} className="text-sm font-medium text-primary hover:underline">
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}
