import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const verified = searchParams.get("verified")

    const db = await getDatabase()
    const propertiesCollection = db.collection("properties")

    // Build query
    const query: any = {}

    if (search) {
      query.$or = [
        { address: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { owner_id: { $regex: search, $options: "i" } },
      ]
    }

    if (minPrice || maxPrice) {
      query.value = {}
      if (minPrice) query.value.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.value.$lte = Number.parseInt(maxPrice)
    }

    if (verified !== null && verified !== undefined) {
      query.verified = verified === "true"
    }

    // Get total count
    const total = await propertiesCollection.countDocuments(query)

    // Get properties with pagination
    const properties = await propertiesCollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Properties fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const propertyData = await request.json()

    const db = await getDatabase()
    const propertiesCollection = db.collection("properties")

    // Add timestamps
    const newProperty = {
      ...propertyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await propertiesCollection.insertOne(newProperty)

    return NextResponse.json({
      property: { ...newProperty, _id: result.insertedId },
      message: "Property created successfully",
    })
  } catch (error) {
    console.error("Property creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
