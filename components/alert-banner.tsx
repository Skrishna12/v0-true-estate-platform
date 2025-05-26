"use client"

import { AlertTriangle } from "lucide-react"

export default function AlertBanner() {
  return (
    <div className="bg-red-500 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4 text-sm">
        <AlertTriangle className="h-4 w-4" />
        <span className="font-medium">LIVE ALERT:</span>
        <span>251 rental scams prevented this month</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">12 new verified properties added today</span>
      </div>
    </div>
  )
}
