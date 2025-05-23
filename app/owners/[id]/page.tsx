import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OwnerProperties } from "@/components/owner-properties"
import { OwnerWealthInsights } from "@/components/owner-wealth-insights"
import { OwnerReviews } from "@/components/owner-reviews"
import { getOwnerById, getPropertiesByOwnerId } from "@/lib/data"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface OwnerPageProps {
  params: {
    id: string
  }
}

export default async function OwnerPage({ params }: OwnerPageProps) {
  const owner = await getOwnerById(params.id)

  if (!owner) {
    notFound()
  }

  const properties = await getPropertiesByOwnerId(owner.owner_id)
  const trustScore = Math.floor(Math.random() * 30) + 70

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/owners">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Owners
          </Button>
        </Link>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <span className="text-2xl font-bold">{owner.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{owner.name}</h1>
              <p className="text-muted-foreground">{owner.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={
                trustScore >= 90
                  ? "bg-green-100 text-green-800"
                  : trustScore >= 80
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
              }
            >
              {trustScore}% Trust Score
            </Badge>
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
            <Badge variant="outline" className="bg-primary/10 text-primary">
              ${owner.net_worth?.toLocaleString() || "N/A"} Net Worth
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="wealth">Wealth Insights</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <OwnerProperties properties={properties} />
            </TabsContent>
            <TabsContent value="wealth">
              <OwnerWealthInsights owner={owner} properties={properties} />
            </TabsContent>
            <TabsContent value="reviews">
              <OwnerReviews ownerId={owner.owner_id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Report Issue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Owner Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Properties Owned</p>
                  <p className="text-xl font-bold">{properties.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Property Value</p>
                  <p className="text-xl font-bold">
                    ${properties.reduce((sum, property) => sum + property.value, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-xl font-bold">4.2/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
