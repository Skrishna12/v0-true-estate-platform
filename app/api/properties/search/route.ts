import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")
    const city = searchParams.get("city")
    const state = searchParams.get("state")

    if (!address && !city) {
      return NextResponse.json({ message: "Address or city is required" }, { status: 400 })
    }

    // Use multiple APIs to get comprehensive property data
    const results = await Promise.allSettled([
      // Zillow API for property listings
      fetchZillowData(address, city, state),
      // ATTOM API for property details
      fetchAttomData(address, city, state),
      // RentCast API for rental estimates
      fetchRentCastData(address, city, state),
    ])

    const properties = []
    const errors = []

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        properties.push(...result.value)
      } else {
        errors.push(`API ${index + 1} failed: ${result.reason}`)
      }
    })

    return NextResponse.json({
      properties,
      total: properties.length,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error) {
    console.error("Property search error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

async function fetchZillowData(address?: string | null, city?: string | null, state?: string | null) {
  if (!process.env.ZILLOW_API_KEY) return []

  try {
    const searchQuery = address || `${city}, ${state}`
    const response = await fetch(
      `https://api.zillow.com/v1/search?q=${encodeURIComponent(searchQuery)}&key=${process.env.ZILLOW_API_KEY}`,
    )

    if (!response.ok) return []

    const data = await response.json()
    return (
      data.results?.map((property: any) => ({
        id: property.zpid,
        source: "zillow",
        address: property.address,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.livingArea,
        propertyType: property.propertyType,
        images: property.photos,
        zestimate: property.zestimate,
      })) || []
    )
  } catch (error) {
    console.error("Zillow API error:", error)
    return []
  }
}

async function fetchAttomData(address?: string | null, city?: string | null, state?: string | null) {
  if (!process.env.ATTOM_API_KEY) return []

  try {
    const searchQuery = address || `${city}, ${state}`
    const response = await fetch(
      `https://api.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address=${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          "X-API-Key": process.env.ATTOM_API_KEY,
        },
      },
    )

    if (!response.ok) return []

    const data = await response.json()
    return (
      data.property?.map((property: any) => ({
        id: property.identifier?.attomId,
        source: "attom",
        address: property.address?.oneLine,
        price: property.assessment?.market?.mktTtlValue,
        bedrooms: property.building?.rooms?.beds,
        bathrooms: property.building?.rooms?.baths,
        sqft: property.building?.size?.livingSize,
        yearBuilt: property.summary?.yearBuilt,
        lotSize: property.lot?.lotSize1,
        propertyType: property.summary?.propType,
        ownerName: property.owner?.owner1?.lastName,
        lastSaleDate: property.sale?.saleSearchDate,
        lastSalePrice: property.sale?.amount?.saleAmt,
      })) || []
    )
  } catch (error) {
    console.error("ATTOM API error:", error)
    return []
  }
}

async function fetchRentCastData(address?: string | null, city?: string | null, state?: string | null) {
  if (!process.env.RENTCAST_API) return []

  try {
    const searchQuery = address || `${city}, ${state}`
    const response = await fetch(
      `https://api.rentcast.io/v1/avm/rent/long-term?address=${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          "X-Api-Key": process.env.RENTCAST_API,
        },
      },
    )

    if (!response.ok) return []

    const data = await response.json()
    return [
      {
        id: `rentcast-${Date.now()}`,
        source: "rentcast",
        address: data.address,
        rentEstimate: data.rent,
        rentRange: {
          low: data.rentRangeLow,
          high: data.rentRangeHigh,
        },
        confidence: data.confidence,
      },
    ]
  } catch (error) {
    console.error("RentCast API error:", error)
    return []
  }
}
