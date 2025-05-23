export interface Property {
  _id?: {
    $oid: string
  }
  property_id: string
  name?: string
  address: string
  city?: string
  state?: string
  zipcode?: string
  size?: string
  value: number
  owner_id: string
  location?: {
    lat: number
    lng: number
  }
  verified?: boolean
  transparency_score?: number
  transaction_history?: Array<{
    year?: number
    amount?: number
    date?: Date | string
    price?: number
    buyer?: string
  }>
  description?: string
  amenities?: string[]
}

export interface Owner {
  _id?: {
    $oid: string
  }
  owner_id: string
  name: string
  email: string
  verified: boolean
  net_worth?: number
  properties?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  role: "owner" | "renter" | "employee" | "admin"
}
