"use client"

import { Button } from "@/components/ui/button"
import { Eye, BarChart3 } from "lucide-react"

export default function Hero() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Trust badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 text-blue-600 text-sm">
            <Eye className="h-4 w-4" />
            <span>Clarity before Capital</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Know Your Landlord. <span className="text-blue-600">Protect Your Investment.</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          The first real estate intelligence platform that provides complete transparency into property ownership,
          landlord credibility, and market dynamics. Make informed decisions with verified data before you invest your
          capital.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
            <Eye className="h-5 w-5 mr-2" />
            Explore Live Wealth Map
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-3">
            <BarChart3 className="h-5 w-5 mr-2" />
            View Market Analytics
          </Button>
        </div>
      </div>
    </div>
  )
}
