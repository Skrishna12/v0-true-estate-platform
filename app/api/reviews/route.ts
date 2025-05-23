import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    const { propertyId, ownerId, rating, comment } = await request.json()

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const db = await getDatabase()
    const reviewsCollection = db.collection("reviews")

    const newReview = {
      userId: decoded.id,
      propertyId,
      ownerId,
      rating,
      comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await reviewsCollection.insertOne(newReview)

    return NextResponse.json({
      review: { ...newReview, _id: result.insertedId },
      message: "Review submitted successfully",
    })
  } catch (error) {
    console.error("Review creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")
    const ownerId = searchParams.get("ownerId")

    const db = await getDatabase()
    const reviewsCollection = db.collection("reviews")

    const query: any = {}
    if (propertyId) query.propertyId = propertyId
    if (ownerId) query.ownerId = ownerId

    const reviews = await reviewsCollection.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("Reviews fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
