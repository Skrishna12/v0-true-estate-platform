"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Download, BarChart3, FileText, Database } from "lucide-react"

export default function AdvancedTools() {
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportScope, setExportScope] = useState("all")
  const [selectedFields, setSelectedFields] = useState({
    basicInfo: true,
    ownership: true,
    financial: true,
    location: true,
    marketData: false,
    verification: true,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Real Estate Tools</h1>
          <p className="text-lg text-gray-600">Professional tools and analytics for informed real estate decisions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Analysis Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2" />
                Property Analysis Tools
              </CardTitle>
              <p className="text-gray-600">Compare properties and analyze market trends</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Property Comparison
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">Select properties to compare side by side</p>

                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-gray-400">D</span>
                    </div>
                    <p className="text-gray-500 mb-2">No properties selected</p>
                    <p className="text-sm text-gray-400">Click the compare icon on any property to add it here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Export & Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-6 w-6 mr-2" />
                Data Export & Reports
              </CardTitle>
              <p className="text-gray-600">Generate comprehensive property reports</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Format */}
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Export Format</Label>
                <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="csv" id="csv" />
                    <Label htmlFor="csv" className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      CSV
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="json" id="json" />
                    <Label htmlFor="json">JSON</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf">PDF Report</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Export Scope */}
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Export Scope</Label>
                <RadioGroup value={exportScope} onValueChange={setExportScope}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Properties (6)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Include Fields */}
              <div>
                <Label className="text-sm font-medium text-gray-900 mb-3 block">Include Fields</Label>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="basicInfo"
                      checked={selectedFields.basicInfo}
                      onCheckedChange={(checked) =>
                        setSelectedFields((prev) => ({ ...prev, basicInfo: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="basicInfo" className="font-medium">
                        Basic Info
                      </Label>
                      <p className="text-sm text-gray-500">Address, owner, property type</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="ownership"
                      checked={selectedFields.ownership}
                      onCheckedChange={(checked) =>
                        setSelectedFields((prev) => ({ ...prev, ownership: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="ownership" className="font-medium">
                        Ownership
                      </Label>
                      <p className="text-sm text-gray-500">Owner details, company, portfolio</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="financial"
                      checked={selectedFields.financial}
                      onCheckedChange={(checked) =>
                        setSelectedFields((prev) => ({ ...prev, financial: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="financial" className="font-medium">
                        Financial
                      </Label>
                      <p className="text-sm text-gray-500">Value, rent estimates, ROI</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="location"
                      checked={selectedFields.location}
                      onCheckedChange={(checked) =>
                        setSelectedFields((prev) => ({ ...prev, location: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="location" className="font-medium">
                        Location
                      </Label>
                      <p className="text-sm text-gray-500">Coordinates, neighborhood, walk score</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketData"
                      checked={selectedFields.marketData}
                      onCheckedChange={(checked) =>
                        setSelectedFields((prev) => ({ ...prev, marketData: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="marketData" className="font-medium">
                        Market Data
                      </Label>
                      <p className="text-sm text-gray-500">Trends, appreciation, comparables</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="verification"
                      checked={selectedFields.verification}
                      onCheckedChange={(checked) =>
                        setSelectedFields((prev) => ({ ...prev, verification: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="verification" className="font-medium">
                        Verification
                      </Label>
                      <p className="text-sm text-gray-500">Trust scores, scam reports</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gray-900 hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Export 6 Properties
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
