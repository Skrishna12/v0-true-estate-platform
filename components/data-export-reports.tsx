"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, FileText, CalendarIcon, Clock, Share, Mail, Settings, Eye, Trash2, Play, Pause } from "lucide-react"

interface ExportTemplate {
  id: string
  name: string
  description: string
  fields: string[]
  format: string
  lastUsed: string
}

interface ScheduledReport {
  id: string
  name: string
  template: string
  frequency: string
  recipients: string[]
  nextRun: string
  status: "active" | "paused"
}

interface ExportHistory {
  id: string
  name: string
  format: string
  size: string
  createdAt: string
  downloadUrl: string
}

export default function DataExportReports() {
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "address",
    "ownerName",
    "propertyValue",
    "netWorth",
    "trustScore",
  ])
  const [exportFormat, setExportFormat] = useState("csv")
  const [reportName, setReportName] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isGenerating, setIsGenerating] = useState(false)

  const [templates] = useState<ExportTemplate[]>([
    {
      id: "1",
      name: "Property Overview",
      description: "Basic property information with owner details",
      fields: ["address", "ownerName", "propertyValue", "propertyType", "trustScore"],
      format: "csv",
      lastUsed: "2024-01-15",
    },
    {
      id: "2",
      name: "Wealth Analysis",
      description: "Comprehensive owner wealth and portfolio analysis",
      fields: ["ownerName", "netWorth", "wealthSources", "portfolioSize", "trustScore"],
      format: "pdf",
      lastUsed: "2024-01-14",
    },
    {
      id: "3",
      name: "Market Intelligence",
      description: "Market trends and property value analysis",
      fields: ["address", "propertyValue", "marketTrends", "appreciation", "comparables"],
      format: "xlsx",
      lastUsed: "2024-01-13",
    },
  ])

  const [scheduledReports] = useState<ScheduledReport[]>([
    {
      id: "1",
      name: "Weekly Market Summary",
      template: "Market Intelligence",
      frequency: "Weekly",
      recipients: ["team@company.com", "analyst@company.com"],
      nextRun: "2024-01-22",
      status: "active",
    },
    {
      id: "2",
      name: "Monthly Wealth Report",
      template: "Wealth Analysis",
      frequency: "Monthly",
      recipients: ["executive@company.com"],
      nextRun: "2024-02-01",
      status: "active",
    },
  ])

  const [exportHistory] = useState<ExportHistory[]>([
    {
      id: "1",
      name: "SF_Properties_Analysis_2024",
      format: "PDF",
      size: "2.4 MB",
      createdAt: "2024-01-15 14:30",
      downloadUrl: "#",
    },
    {
      id: "2",
      name: "Owner_Wealth_Data_Export",
      format: "CSV",
      size: "856 KB",
      createdAt: "2024-01-15 10:15",
      downloadUrl: "#",
    },
    {
      id: "3",
      name: "Market_Trends_Q4_2023",
      format: "XLSX",
      size: "1.8 MB",
      createdAt: "2024-01-14 16:45",
      downloadUrl: "#",
    },
  ])

  const availableFields = [
    { id: "address", label: "Property Address", category: "Property" },
    { id: "propertyValue", label: "Property Value", category: "Property" },
    { id: "propertyType", label: "Property Type", category: "Property" },
    { id: "size", label: "Property Size", category: "Property" },
    { id: "bedrooms", label: "Bedrooms", category: "Property" },
    { id: "bathrooms", label: "Bathrooms", category: "Property" },
    { id: "yearBuilt", label: "Year Built", category: "Property" },
    { id: "ownerName", label: "Owner Name", category: "Owner" },
    { id: "netWorth", label: "Net Worth", category: "Owner" },
    { id: "wealthSources", label: "Wealth Sources", category: "Owner" },
    { id: "portfolioSize", label: "Portfolio Size", category: "Owner" },
    { id: "trustScore", label: "Trust Score", category: "Verification" },
    { id: "verificationDate", label: "Verification Date", category: "Verification" },
    { id: "dataConfidence", label: "Data Confidence", category: "Verification" },
    { id: "marketTrends", label: "Market Trends", category: "Market" },
    { id: "appreciation", label: "Appreciation Rate", category: "Market" },
    { id: "comparables", label: "Comparable Properties", category: "Market" },
    { id: "coordinates", label: "GPS Coordinates", category: "Location" },
    { id: "neighborhood", label: "Neighborhood", category: "Location" },
    { id: "walkScore", label: "Walk Score", category: "Location" },
  ]

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) => (prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]))
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      // In a real app, this would trigger a download
      alert("Report generated successfully!")
    }, 2000)
  }

  const handleUseTemplate = (template: ExportTemplate) => {
    setSelectedFields(template.fields)
    setExportFormat(template.format)
    setReportName(template.name)
  }

  const groupedFields = availableFields.reduce(
    (acc, field) => {
      if (!acc[field.category]) {
        acc[field.category] = []
      }
      acc[field.category].push(field)
      return acc
    },
    {} as Record<string, typeof availableFields>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Export & Reporting</h1>
          <p className="text-gray-600">Generate custom reports and export data in multiple formats</p>
        </div>

        <Tabs defaultValue="export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="export">Custom Export</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="history">Export History</TabsTrigger>
          </TabsList>

          {/* Custom Export */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Report Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle>Report Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reportName">Report Name</Label>
                        <Input
                          id="reportName"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          placeholder="Enter report name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="format">Export Format</Label>
                        <Select value={exportFormat} onValueChange={setExportFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                            <SelectItem value="pdf">PDF Report</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Date Range</Label>
                      <div className="flex space-x-2 mt-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? selectedDate.toDateString() : "Select date range"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Field Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Data Fields</CardTitle>
                    <p className="text-sm text-gray-600">{selectedFields.length} fields selected</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(groupedFields).map(([category, fields]) => (
                        <div key={category}>
                          <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {fields.map((field) => (
                              <div key={field.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={field.id}
                                  checked={selectedFields.includes(field.id)}
                                  onCheckedChange={() => handleFieldToggle(field.id)}
                                />
                                <Label htmlFor={field.id} className="text-sm">
                                  {field.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview & Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Selected Fields:</span>
                        <span>{selectedFields.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Format:</span>
                        <span>{exportFormat.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estimated Size:</span>
                        <span>~2.4 MB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Records:</span>
                        <span>1,247</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button onClick={handleGenerateReport} disabled={isGenerating} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        {isGenerating ? "Generating..." : "Generate Report"}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Data
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Share className="h-4 w-4 mr-2" />
                        Share Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Save as Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{template.name}</span>
                      <Badge variant="outline">{template.format.toUpperCase()}</Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Included Fields:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.slice(0, 3).map((field) => (
                          <Badge key={field} variant="secondary" className="text-xs">
                            {availableFields.find((f) => f.id === field)?.label || field}
                          </Badge>
                        ))}
                        {template.fields.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.fields.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">Last used: {template.lastUsed}</div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleUseTemplate(template)} className="flex-1">
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scheduled Reports */}
          <TabsContent value="scheduled" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Scheduled Reports</h2>
              <Button>
                <Clock className="h-4 w-4 mr-2" />
                New Scheduled Report
              </Button>
            </div>

            <div className="space-y-4">
              {scheduledReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                          <Badge variant={report.status === "active" ? "default" : "secondary"}>{report.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Template</p>
                            <p className="font-medium">{report.template}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Frequency</p>
                            <p className="font-medium">{report.frequency}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Recipients</p>
                            <p className="font-medium">{report.recipients.length} recipients</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Next Run</p>
                            <p className="font-medium">{report.nextRun}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">Recipients:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {report.recipients.map((email, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {email}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          {report.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Export History */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Export History</h2>
              <Button variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Format
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {exportHistory.map((export_) => (
                        <tr key={export_.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-sm font-medium text-gray-900">{export_.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{export_.format}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{export_.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{export_.createdAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share className="h-3 w-3 mr-1" />
                                Share
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
