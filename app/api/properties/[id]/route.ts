import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const propertiesCollection = db.collection("properties")

    // Try to find by property_id first, then by _id
    let property = await propertiesCollection.findOne({ property_id: params.id })

    if (!property && ObjectId.isValid(params.id)) {
      property = await propertiesCollection.findOne({ _id: new ObjectId(params.id) })
    }

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({ property })
  } catch (error) {
    console.error("Property fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updateData = await request.json()

    const db = await getDatabase()
    const propertiesCollection = db.collection("properties")

    const result = await propertiesCollection.updateOne(
      { property_id: params.id },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Property updated successfully" })
  } catch (error) {
    console.error("Property update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
