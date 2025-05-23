import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Star } from "lucide-react"
import type { Owner } from "@/lib/types"

interface PropertyOwnerInfoProps {
  owner: Owner | null
}

export function PropertyOwnerInfo({ owner }: PropertyOwnerInfoProps) {
  if (!owner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Owner Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Owner information not available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Owner Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl font-bold">{owner.name.charAt(0)}</span>
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div>
                <h3 className="text-xl font-bold">{owner.name}</h3>
                <p className="text-sm text-muted-foreground">{owner.email}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="outline">
                  {owner.verified ? (
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
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  4.5/5
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Owner Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Properties Owned</h4>
                <p>{owner.properties?.length || 0}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Estimated Net Worth</h4>
                <p>${owner.net_worth?.toLocaleString() || "Not available"}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href={`/owners/${owner.owner_id}`}>
                <Button variant="outline">View Full Portfolio</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
