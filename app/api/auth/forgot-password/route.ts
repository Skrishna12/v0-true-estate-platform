import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import jwt from "jsonwebtoken"

const client = new MongoClient(process.env.MONGO_URI!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    await client.connect()
    const db = client.db("trueestate")
    const users = db.collection("users")

    // Check if user exists
    const user = await users.findOne({ email: email.toLowerCase() })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ message: "If an account with that email exists, we've sent a reset link." })
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1h" })

    // Store reset token in database
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
      },
    )

    // In a real app, you would send an email here
    // For now, we'll just log the reset link
    console.log(
      `Reset link: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`,
    )

    return NextResponse.json({
      message: "If an account with that email exists, we've sent a reset link.",
      // In development, include the token for testing
      ...(process.env.NODE_ENV === "development" && { resetToken }),
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
