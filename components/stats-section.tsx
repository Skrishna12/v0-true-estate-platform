"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Building, Users, Shield, AlertTriangle, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: DollarSign,
    value: "$63.7M",
    label: "Total Portfolio Value",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Building,
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

export default function StatsSection() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Live market data indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium text-sm">LIVE MARKET DATA</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Real-Time Platform Statistics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
