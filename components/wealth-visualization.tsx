"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Owner, Property } from "@/lib/types"
import { TrendingUp, TrendingDown, DollarSign, Building, PieChart } from "lucide-react"

interface WealthVisualizationProps {
  owner: Owner
  properties: Property[]
}

export function WealthVisualization({ owner, properties }: WealthVisualizationProps) {
  const totalPropertyValue = properties.reduce((sum, property) => sum + property.value, 0)
  const averagePropertyValue = properties.length > 0 ? totalPropertyValue / properties.length : 0
  const netWorth = owner.net_worth || 0

  // Calculate wealth distribution
  const realEstatePercentage = netWorth > 0 ? (totalPropertyValue / netWorth) * 100 : 0
  const otherAssetsPercentage = 100 - realEstatePercentage

  // Mock market comparison data
  const marketAverage = 1200000
  const performanceVsMarket = ((averagePropertyValue - marketAverage) / marketAverage) * 100

  const wealthBreakdown = [
    {
      category: "Real Estate",
      value: totalPropertyValue,
      percentage: realEstatePercentage,
      color: "bg-blue-500",
    },
    {
      category: "Other Assets",
      value: netWorth - totalPropertyValue,
      percentage: otherAssetsPercentage,
      color: "bg-green-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Wealth Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netWorth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{realEstatePercentage.toFixed(1)}% in real estate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Portfolio</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPropertyValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{properties.length} properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Property Value</CardTitle>
            {performanceVsMarket >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averagePropertyValue.toLocaleString()}</div>
            <p className={`text-xs ${performanceVsMarket >= 0 ? "text-green-600" : "text-red-600"}`}>
              {performanceVsMarket >= 0 ? "+" : ""}
              {performanceVsMarket.toFixed(1)}% vs market
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wealth Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Wealth Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wealthBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    ${item.value.toLocaleString()} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Value Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Property Value Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {properties.map((property, index) => {
              const percentage = totalPropertyValue > 0 ? (property.value / totalPropertyValue) * 100 : 0
              return (
                <div key={property.property_id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate">{property.name || property.address}</span>
                    <span className="text-muted-foreground">
                      ${property.value.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-1" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Portfolio Diversification</h4>
              <p className="text-sm text-muted-foreground">
                {properties.length === 1
                  ? "Single property portfolio - consider diversification"
                  : properties.length < 3
                    ? "Limited diversification - consider expanding portfolio"
                    : "Well-diversified property portfolio"}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Market Position</h4>
              <p className="text-sm text-muted-foreground">
                {performanceVsMarket > 10
                  ? "Above market average - strong portfolio performance"
                  : performanceVsMarket > 0
                    ? "Slightly above market average"
                    : "Below market average - potential for improvement"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
