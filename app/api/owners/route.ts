import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const verified = searchParams.get("verified")

    const db = await getDatabase()
    const ownersCollection = db.collection("owners")

    // Build query
    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { owner_id: { $regex: search, $options: "i" } },
      ]
    }

    if (verified !== null && verified !== undefined) {
      query.verified = verified === "true"
    }

    // Get total count
    const total = await ownersCollection.countDocuments(query)

    // Get owners with pagination
    const owners = await ownersCollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      owners,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Owners fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
