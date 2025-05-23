import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

// Sample data for seeding the database
const sampleOwners = [
  {
    owner_id: "OWN001",
    name: "Alice Johnson",
    email: "alice@example.com",
    verified: true,
    net_worth: 2500000,
    properties: ["PROP001", "PROP002"],
  },
  {
    owner_id: "OWN002",
    name: "Bob Smith",
    email: "bob@example.com",
    verified: false,
    net_worth: 900000,
    properties: ["PROP003"],
  },
  {
    owner_id: "OWN003",
    name: "Carla Thompson",
    email: "carla@example.com",
    verified: true,
    net_worth: 3200000,
    properties: ["PROP004", "PROP005"],
  },
]

const sampleProperties = [
  {
    property_id: "PROP001",
    name: "Skyline Tower",
    address: "101 Main Street",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    size: "1200 sq ft",
    value: 750000,
    owner_id: "OWN001",
    location: {
      lat: 40.7128,
      lng: -74.006,
    },
    verified: true,
    transparency_score: 85,
    transaction_history: [
      {
        date: new Date("2023-01-15"),
        price: 720000,
        buyer: "BlueCorp LLC",
      },
    ],
  },
  {
    property_id: "PROP002",
    name: "Greenwood Estate",
    address: "245 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    zipcode: "90001",
    size: "2000 sq ft",
    value: 1250000,
    owner_id: "OWN001",
    location: {
      lat: 34.0522,
      lng: -118.2437,
    },
    verified: true,
    transparency_score: 92,
    transaction_history: [
      {
        date: new Date("2022-11-22"),
        price: 1200000,
        buyer: "Vista Holdings",
      },
    ],
  },
  {
    property_id: "PROP003",
    name: "Riverfront Villas",
    address: "88 Bay Street",
    city: "Chicago",
    state: "IL",
    zipcode: "60601",
    size: "1800 sq ft",
    value: 980000,
    owner_id: "OWN002",
    location: {
      lat: 41.8781,
      lng: -87.6298,
    },
    verified: true,
    transparency_score: 88,
    transaction_history: [
      {
        date: new Date("2023-03-10"),
        price: 960000,
        buyer: "Lincoln Properties",
      },
    ],
  },
]

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase()

    // Clear existing data
    await db.collection("owners").deleteMany({})
    await db.collection("properties").deleteMany({})

    // Insert sample data
    await db.collection("owners").insertMany(sampleOwners)
    await db.collection("properties").insertMany(sampleProperties)

    return NextResponse.json({
      message: "Database seeded successfully",
      data: {
        owners: sampleOwners.length,
        properties: sampleProperties.length,
      },
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
