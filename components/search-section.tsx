"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter any address to verify ownership and check for scams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-l-lg focus:border-blue-500 focus:ring-0"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-r-lg rounded-l-none"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Try: "123 Main St, San Francisco" or "Apartment Brooklyn NY"
        </p>
      </div>
    </div>
  )
}
