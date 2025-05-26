"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, Minus, Maximize, Target, Settings, Filter, Heart } from "lucide-react"

export default function MapView() {
  const [activeView, setActiveView] = useState("property")
  const [showPropertyPopup, setShowPropertyPopup] = useState(true)

  return (
    <div className="h-screen bg-gray-100 relative">
      {/* View Toggle */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex bg-white rounded-lg shadow-lg p-1">
          <button
            onClick={() => setActiveView("property")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === "property" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Property View
          </button>
          <button
            onClick={() => setActiveView("wealth")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === "wealth" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Wealth Heatmap
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full">
        {/* Map Controls */}
        <div className="absolute top-4 left-4 z-10 space-y-2">
          <div className="bg-white rounded-lg shadow-lg p-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Map Styles
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Filter className="h-4 w-4 mr-2" />
              Filters (6)
            </Button>
          </div>
          <div className="bg-green-600 text-white rounded-lg px-3 py-1 text-sm font-medium">
            🌍 3D Globe • 6/6 Properties
          </div>
        </div>

        {/* Map Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <Button size="sm" variant="outline" className="bg-white">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white">
            <Minus className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white">
            <Maximize className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white">
            <Target className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Background */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
          {/* Simulated Map */}
          <div className="absolute inset-0 opacity-60">
            <img src="/placeholder.svg?height=800&width=1200" alt="Map" className="w-full h-full object-cover" />
          </div>

          {/* Property Markers */}
          <div className="absolute top-1/3 left-1/4">
            <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute top-1/2 left-1/3">
            <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="absolute top-2/3 left-1/2">
            <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>

          {/* Property Popup */}
          {showPropertyPopup && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <Card className="w-80 shadow-xl">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Sample Owner</CardTitle>
                      <p className="text-sm text-gray-600">las vegas</p>
                      <p className="text-xs text-gray-500">San Francisco, CA</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive">Unverified</Badge>
                      <button onClick={() => setShowPropertyPopup(false)} className="text-gray-400 hover:text-gray-600">
                        ×
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Value</p>
                      <p className="text-xl font-bold text-green-600">$790,857</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trust Score</p>
                      <p className="text-xl font-bold">99%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Sq Ft</p>
                      <p className="font-semibold">1,341</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Beds</p>
                      <p className="font-semibold">2</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Baths</p>
                      <p className="font-semibold">2</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      Zoom to Property
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Street View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Mapbox Attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          © Mapbox © OpenStreetMap Improve this map
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl z-10 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Live Market Intelligence */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">📈 Live Market Intelligence</h3>
            <p className="text-gray-600 text-sm mb-4">Real-time market data and trends</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Portfolio Value</span>
                <span className="font-bold text-green-600">$63.7M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Verified Properties</span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Trusted Owners</span>
                <span className="font-bold text-blue-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Trust Score</span>
                <span className="font-bold text-green-600">91%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Scams Prevented</span>
                <span className="font-bold text-red-600">534</span>
              </div>
            </div>
          </div>

          {/* Saved Properties */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Saved Properties (0)
            </h3>
            <p className="text-gray-600 text-sm mb-4">Your bookmarked properties and notes</p>

            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No saved properties yet</p>
              <p className="text-sm text-gray-400">Click the heart icon on any property to save it</p>
            </div>
          </div>

          {/* Saved Views */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">📍 Saved Views (0)</h3>
              <Button size="sm" className="bg-gray-900">
                Save Current
              </Button>
            </div>
            <p className="text-gray-600 text-sm mb-4">Your saved map configurations</p>

            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No saved views yet</p>
              <p className="text-sm text-gray-400">Save your current map view for quick access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
