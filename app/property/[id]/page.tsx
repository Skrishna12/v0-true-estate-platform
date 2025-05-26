"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import { MapPin, DollarSign, Home, Calendar, User, Shield, CheckCircle, Building, TrendingUp } from "lucide-react"

export default function PropertyDetailsPage() {
  const params = useParams()
  const [property, setProperty] = useState<any>(null)
  const [verification, setVerification] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading property data
    setTimeout(() => {
      setProperty({
        id: params.id,
        address: "123 Main Street, San Francisco, CA 94102",
        price: 4500,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        propertyType: "Apartment",
        yearBuilt: 2015,
        ownerName: "John Smith",
        ownerEmail: "john.smith@example.com",
        lastSaleDate: "2020-03-15",
        lastSalePrice: 850000,
        rentEstimate: 4200,
        images: ["/placeholder.svg?height=300&width=400"],
      })

      setVerification({
        trustScore: 92,
        verifications: [
          {
            source: "peopledatalabs",
            score: 85,
            details: {
              fullName: "John Smith",
              jobTitle: "Real Estate Developer",
              company: "Smith Properties LLC",
              experience: 8,
            },
          },
          {
            source: "hunter",
            score: 95,
            details: {
              emailStatus: "deliverable",
              emailScore: 95,
            },
          },
        ],
        warnings: [],
      })

      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrustScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4" />
            <span>Property Details</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{property.address}</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Images */}
            <Card>
              <CardContent className="p-0">
                <div className="h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-500">Property Images</span>
                </div>
              </CardContent>
            </Card>

            {/* Property Information */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="owner">Owner Info</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Home className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Type:</span>
                          <span className="font-medium">{property.propertyType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Size:</span>
                          <span className="font-medium">{property.sqft?.toLocaleString()} sqft</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Built:</span>
                          <span className="font-medium">{property.yearBuilt}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500">Bedrooms: {property.bedrooms}</div>
                        <div className="text-sm text-gray-500">Bathrooms: {property.bathrooms}</div>
                        <div className="text-sm text-gray-500">
                          Rent Estimate: {formatPrice(property.rentEstimate)}/mo
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="owner" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Owner Verification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{property.ownerName}</span>
                        <div className={`px-3 py-1 rounded-full ${getTrustScoreBg(verification.trustScore)}`}>
                          <span className={`font-bold ${getTrustScoreColor(verification.trustScore)}`}>
                            {verification.trustScore}% Trust Score
                          </span>
                        </div>
                      </div>

                      {verification.verifications.map((v: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{v.source.toUpperCase()}</Badge>
                            <span className="text-sm font-medium">{v.score}% verified</span>
                          </div>
                          {v.details.fullName && <div className="text-sm">Name: {v.details.fullName}</div>}
                          {v.details.jobTitle && <div className="text-sm">Title: {v.details.jobTitle}</div>}
                          {v.details.company && <div className="text-sm">Company: {v.details.company}</div>}
                          {v.details.emailStatus && <div className="text-sm">Email: {v.details.emailStatus}</div>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sale History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Last Sale</div>
                          <div className="text-sm text-gray-500">{property.lastSaleDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{formatPrice(property.lastSalePrice)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Market Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{formatPrice(property.price)}</div>
                          <div className="text-sm text-gray-500">Current Value</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{formatPrice(property.rentEstimate)}</div>
                          <div className="text-sm text-gray-500">Rent Estimate</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Actions & Summary */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Pricing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{formatPrice(property.price)}</div>
                    <div className="text-sm text-gray-500">Market Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{formatPrice(property.rentEstimate)}/mo</div>
                    <div className="text-sm text-gray-500">Estimated Rent</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Trust Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getTrustScoreColor(verification.trustScore)}`}>
                    {verification.trustScore}%
                  </div>
                  <div className="text-sm text-gray-500 mb-4">Owner Verification</div>
                  <div className="space-y-2">
                    {verification.verifications.map((v: any, index: number) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{v.source}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full">Contact Owner</Button>
                <Button variant="outline" className="w-full">
                  Save Property
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Viewing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
