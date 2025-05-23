import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyDetails } from "@/components/property-details"
import { PropertyTransactions } from "@/components/property-transactions"
import { PropertyOwnerInfo } from "@/components/property-owner-info"
import { PropertyReviews } from "@/components/property-reviews"
import { PropertyLocation } from "@/components/property-location"
import { getPropertyById, getOwnerById } from "@/lib/data"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  const owner = await getOwnerById(property.owner_id)
  const transparencyScore = property.transparency_score || Math.floor(Math.random() * 30) + 70

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link href="/properties">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">{property.name || property.address}</h1>
            <p className="text-muted-foreground">
              {property.city
                ? `${property.address}, ${property.city}, ${property.state} ${property.zipcode}`
                : property.address}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={
                transparencyScore >= 90
                  ? "bg-green-100 text-green-800"
                  : transparencyScore >= 80
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
              }
            >
              {transparencyScore}% Transparency
            </Badge>
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="p-0">
              <div className="h-64 w-full bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">Property Image</div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <PropertyDetails property={property} />
            </TabsContent>
            <TabsContent value="transactions">
              <PropertyTransactions property={property} />
            </TabsContent>
            <TabsContent value="owner">
              <PropertyOwnerInfo owner={owner} />
            </TabsContent>
            <TabsContent value="reviews">
              <PropertyReviews propertyId={property.property_id} />
            </TabsContent>
            <TabsContent value="location">
              <PropertyLocation property={property} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Owner</CardTitle>
              <CardDescription>Send a message to the property owner</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Request Information</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Property</CardTitle>
              <CardDescription>Report suspicious activity or incorrect information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Report Issue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>Download property information</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="sm">
                PDF
              </Button>
              <Button variant="outline" size="sm">
                CSV
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
