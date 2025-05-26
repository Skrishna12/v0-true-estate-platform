"use client"

import { useEffect, useState } from "react"
import LandingPage from "@/components/landing-page"
import MapView from "@/components/map-view"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TrueEstate...</p>
        </div>
      </div>
    )
  }

  // If logged in, show map view directly
  if (isLoggedIn) {
    return <MapView />
  }

  // If not logged in, show landing page
  return <LandingPage />
}
