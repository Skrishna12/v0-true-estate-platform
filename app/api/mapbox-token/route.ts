import { NextResponse } from "next/server"

export async function GET() {
  // Use the server-side Mapbox API key environment variable
  const mapboxToken = process.env.MAPBOX_API_KEY

  // Only return the token if it exists
  if (!mapboxToken) {
    return NextResponse.json({ error: "Mapbox API key not configured" }, { status: 500 })
  }

  // Return the token with appropriate cache headers
  return NextResponse.json(
    { token: mapboxToken },
    {
      headers: {
        "Cache-Control": "private, max-age=3600", // Cache for 1 hour
      },
    },
  )
}
