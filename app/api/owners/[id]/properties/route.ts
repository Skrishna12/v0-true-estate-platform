import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    const propertiesCollection = db.collection("properties")

    const properties = await propertiesCollection.find({ owner_id: params.id }).toArray()

    return NextResponse.json({ properties })
  } catch (error) {
    console.error("Owner properties fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
