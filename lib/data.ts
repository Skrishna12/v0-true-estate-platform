import type { Property, Owner } from "./types"

// JSON data from the provided files
const ownersData: Owner[] = [
  {
    _id: {
      $oid: "682c8e91ed61f0f1b93cda04",
    },
    owner_id: "OWN001",
    name: "Alice Johnson",
    email: "alice@example.com",
    verified: true,
    net_worth: 2500000,
    properties: ["PROP001", "PROP002"],
  },
  {
    _id: {
      $oid: "682c8e91ed61f0f1b93cda05",
    },
    owner_id: "OWN002",
    name: "Bob Smith",
    email: "bob@example.com",
    verified: false,
    net_worth: 900000,
    properties: ["PROP003"],
  },
  {
    _id: {
      $oid: "682c8e91ed61f0f1b93cda06",
    },
    owner_id: "OWN003",
    name: "Carla Thompson",
    email: "carla@example.com",
    verified: true,
    net_worth: 3200000,
    properties: ["PROP004", "PROP005"],
  },
  {
    _id: {
      $oid: "682dfc9e2aeb04656fb375b0",
    },
    owner_id: "OWN1000",
    name: "Carla Lopez",
    email: "carlalopez@example.com",
    verified: false,
    net_worth: 1219723,
    properties: [],
  },
  {
    _id: {
      $oid: "682dfc9e2aeb04656fb375b1",
    },
    owner_id: "OWN1001",
    name: "Hank Garcia",
    email: "hankgarcia@example.com",
    verified: false,
    net_worth: 2443189,
    properties: ["PROP2013"],
  },
  {
    _id: {
      $oid: "682dfc9e2aeb04656fb375b2",
    },
    owner_id: "OWN1002",
    name: "Ella Lee",
    email: "ellalee@example.com",
    verified: false,
    net_worth: 201622,
    properties: ["PROP2010", "PROP2014", "PROP2019"],
  },
]

const propertiesData: Property[] = [
  {
    _id: {
      $oid: "682c8e88ed61f0f1b93cd9ff",
    },
    property_id: "PROP001",
    address: "123 Elm St, NY",
    value: 750000,
    owner_id: "OWN001",
    transaction_history: [
      {
        year: 2020,
        amount: 700000,
      },
      {
        year: 2022,
        amount: 750000,
      },
    ],
  },
  {
    _id: {
      $oid: "682c8e88ed61f0f1b93cda00",
    },
    property_id: "PROP002",
    address: "45 Pine Rd, NY",
    value: 650000,
    owner_id: "OWN001",
    transaction_history: [
      {
        year: 2019,
        amount: 630000,
      },
      {
        year: 2021,
        amount: 650000,
      },
    ],
  },
  {
    _id: {
      $oid: "682c8e88ed61f0f1b93cda01",
    },
    property_id: "PROP003",
    address: "789 Oak Ave, CA",
    value: 900000,
    owner_id: "OWN002",
    transaction_history: [
      {
        year: 2021,
        amount: 880000,
      },
    ],
  },
  {
    _id: {
      $oid: "682c8e88ed61f0f1b93cda02",
    },
    property_id: "PROP004",
    address: "101 Maple St, TX",
    value: 1200000,
    owner_id: "OWN003",
    transaction_history: [
      {
        year: 2020,
        amount: 1150000,
      },
    ],
  },
  {
    _id: {
      $oid: "682c8e88ed61f0f1b93cda03",
    },
    property_id: "PROP005",
    address: "202 Birch Ln, TX",
    value: 1100000,
    owner_id: "OWN003",
    transaction_history: [
      {
        year: 2022,
        amount: 1100000,
      },
    ],
  },
  {
    _id: {
      $oid: "682dfcaa2aeb04656fb375c0",
    },
    property_id: "PROP2000",
    address: "257 Smith Street",
    size: "1082 sq ft",
    value: 763294,
    owner_id: "OWN1009",
    verified: true,
  },
  {
    _id: {
      $oid: "682dfcaa2aeb04656fb375c1",
    },
    property_id: "PROP2001",
    address: "161 White Street",
    size: "590 sq ft",
    value: 289967,
    owner_id: "OWN1005",
    verified: true,
  },
  {
    _id: {
      $oid: "682dfcaa2aeb04656fb375c2",
    },
    property_id: "PROP2002",
    address: "563 Lee Street",
    size: "2620 sq ft",
    value: 396461,
    owner_id: "OWN1012",
    verified: true,
  },
  {
    _id: {
      $oid: "682dfcaa2aeb04656fb375c3",
    },
    property_id: "PROP2003",
    address: "822 Johnson Street",
    size: "3435 sq ft",
    value: 935460,
    owner_id: "OWN1012",
    verified: false,
  },
  {
    _id: {
      $oid: "682dfcaa2aeb04656fb375c4",
    },
    property_id: "PROP2004",
    address: "801 Johnson Street",
    size: "728 sq ft",
    value: 833650,
    owner_id: "OWN1010",
    verified: true,
  },
]

// Helper function to get the base URL
function getBaseUrl() {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    return ""
  }

  // In server environment, use environment variables or default
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }

  // Default to localhost in development
  return "http://localhost:3000"
}

// Data access functions
export async function getProperties(): Promise<Property[]> {
  // During build/SSR, use the mock data instead of making API calls
  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    return propertiesData
  }

  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/properties`)
  if (!response.ok) {
    throw new Error("Failed to fetch properties")
  }
  const data = await response.json()
  return data.properties
}

export async function getPropertyById(id: string): Promise<Property | null> {
  // During build/SSR, use the mock data instead of making API calls
  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    const property = propertiesData.find((p) => p.property_id === id)
    return property || null
  }

  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/properties/${id}`)
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error("Failed to fetch property")
  }
  const data = await response.json()
  return data.property
}

export async function getOwners(): Promise<Owner[]> {
  // During build/SSR, use the mock data instead of making API calls
  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    return ownersData
  }

  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/owners`)
  if (!response.ok) {
    throw new Error("Failed to fetch owners")
  }
  const data = await response.json()
  return data.owners
}

export async function getOwnerById(id: string): Promise<Owner | null> {
  // During build/SSR, use the mock data instead of making API calls
  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    const owner = ownersData.find((o) => o.owner_id === id)
    return owner || null
  }

  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/owners/${id}`)
  if (!response.ok) {
    if (response.status === 404) return null
    throw new Error("Failed to fetch owner")
  }
  const data = await response.json()
  return data.owner
}

export async function getPropertiesByOwnerId(ownerId: string): Promise<Property[]> {
  // During build/SSR, use the mock data instead of making API calls
  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    return propertiesData.filter((p) => p.owner_id === ownerId)
  }

  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/owners/${ownerId}/properties`)
  if (!response.ok) {
    throw new Error("Failed to fetch owner properties")
  }
  const data = await response.json()
  return data.properties
}
