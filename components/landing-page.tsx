"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Building2,
  Eye,
  BarChart3,
  Search,
  MapPin,
  DollarSign,
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to sign-in if not logged in, or handle search
    window.location.href = "/sign-in"
  }

  const stats = [
    {
      icon: DollarSign,
      value: "$63.7M",
      label: "Total Portfolio Value",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Building2,
      value: "5",
      label: "Verified Properties",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      value: "5",
      label: "Trusted Owners",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Shield,
      value: "91%",
      label: "Avg Trust Score",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: AlertTriangle,
      value: "248",
      label: "Scams Prevented",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: TrendingUp,
      value: "12",
      label: "New Listings Today",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Banner */}
      <div className="bg-red-500 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">LIVE ALERT:</span>
          <span>251 rental scams prevented this month</span>
          <span>•</span>
          <span>12 new verified properties added today</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">TrueEstate</span>
                <span className="text-xs text-gray-500">Wealth Map & Owner Verification</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                Search Properties
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                About
              </a>
              <Link href="/sign-in" className="text-gray-700 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Trust badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 text-blue-600 text-sm">
              <Eye className="h-4 w-4" />
              <span>Clarity before Capital</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Know Your Landlord. <span className="text-blue-600">Protect Your Investment.</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              The first real estate intelligence platform that provides complete transparency into property ownership,
              landlord credibility, and market dynamics. Make informed decisions with verified data before you invest
              your capital.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" asChild>
                <Link href="/sign-in">
                  <Eye className="h-5 w-5 mr-2" />
                  Explore Live Wealth Map
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3" asChild>
                <Link href="/sign-in">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Market Analytics
                </Link>
              </Button>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white rounded-lg border-2 border-gray-200 focus-within:border-blue-500 shadow-lg">
                  <MapPin className="h-5 w-5 text-gray-400 ml-4" />
                  <Input
                    type="text"
                    placeholder="Enter any address to verify ownership and check for scams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-0 focus:ring-0 text-lg py-4"
                  />
                  <Button type="submit" size="lg" className="m-2 bg-gray-900 hover:bg-gray-800">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </form>

              <p className="text-center text-gray-500 mt-4 text-sm">
                Try: "123 Main St, San Francisco" or "Apartment Brooklyn NY"
              </p>
            </div>
          </div>

          {/* Live Market Data Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium text-sm">LIVE MARKET DATA</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Real-Time Platform Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <p className="text-center text-gray-500 text-sm">Data updates every 15 seconds • Last sync: 10:06:15 PM</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">TrueEstate</div>
                  <div className="text-sm text-gray-400">Clarity before Capital</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">© 2024 TrueEstate. All rights reserved.</p>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
