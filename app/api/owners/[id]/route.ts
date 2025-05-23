import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const ownersCollection = db.collection("owners")

    // Try to find by owner_id first, then by _id
    let owner = await ownersCollection.findOne({ owner_id: params.id })

    if (!owner && ObjectId.isValid(params.id)) {
      owner = await ownersCollection.findOne({ _id: new ObjectId(params.id) })
    }

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 })
    }

    return NextResponse.json({ owner })
  } catch (error) {
    console.error("Owner fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
