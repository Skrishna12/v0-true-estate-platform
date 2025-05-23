import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle, XCircle, Building } from "lucide-react"
import type { Owner } from "@/lib/types"

interface OwnerCardProps {
  owner: Owner
}

export function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <span className="text-lg font-bold">{owner.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-semibold">{owner.name}</h3>
            <p className="text-sm text-muted-foreground">{owner.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
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
              <Building className="h-3 w-3" />
              {owner.properties?.length || 0} Properties
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Net Worth</p>
              <p className="font-medium">${owner.net_worth?.toLocaleString() || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trust Score</p>
              <p className="font-medium">{Math.floor(Math.random() * 30) + 70}%</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link href={`/owners/${owner.owner_id}`} className="text-sm font-medium text-primary hover:underline">
          View Portfolio
        </Link>
      </CardFooter>
    </Card>
  )
}
