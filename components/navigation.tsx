"use client"
import { Badge } from "@/components/ui/badge"
import { Building2, Bell, User } from "lucide-react"

interface NavigationProps {
  currentView?: string
  setCurrentView?: (view: "search" | "map" | "knowledge" | "tools") => void
}

export default function Navigation({ currentView, setCurrentView }: NavigationProps) {
  return (
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
              <span className="text-xs text-gray-500">Clarity before Capital</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentView?.("search")}
              className={`transition-colors ${
                currentView === "search" ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Search Properties
            </button>
            <button
              onClick={() => setCurrentView?.("map")}
              className={`transition-colors ${
                currentView === "map" ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Wealth Map
            </button>
            <button
              onClick={() => setCurrentView?.("knowledge")}
              className={`transition-colors ${
                currentView === "knowledge" ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Knowledge Base
            </button>
            <button
              onClick={() => setCurrentView?.("tools")}
              className={`transition-colors ${
                currentView === "tools" ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              About
            </button>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
                  2
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">AU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
