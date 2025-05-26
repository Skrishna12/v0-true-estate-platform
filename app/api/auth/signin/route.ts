import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Define user roles and credentials
const users = [
  {
    id: "admin-001",
    email: "admin@trueestate.com",
    password: "demo",
    name: "Admin User",
    role: "admin",
    permissions: ["all"],
  },
  {
    id: "user-001",
    email: "user@trueestate.com",
    password: "demo",
    name: "Regular User",
    role: "user",
    permissions: ["search", "view", "save"],
  },
  {
    id: "agent-001",
    email: "agent@trueestate.com",
    password: "demo",
    name: "Real Estate Agent",
    role: "agent",
    permissions: ["search", "view", "save", "manage_listings", "contact_owners"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email and password
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token with role information
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    return NextResponse.json({
      message: "Sign in successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
      // All users go to map view after login
      redirectTo: "/",
    })
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
