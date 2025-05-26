"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import SearchInterface from "@/components/search-interface"
import MapView from "@/components/map-view"
import KnowledgeBase from "@/components/knowledge-base"
import AdvancedTools from "@/components/advanced-tools"
import Footer from "@/components/footer"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"search" | "map" | "knowledge" | "tools">("search")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === "search" && <SearchInterface />}
      {currentView === "map" && <MapView />}
      {currentView === "knowledge" && <KnowledgeBase />}
      {currentView === "tools" && <AdvancedTools />}

      <Footer />
    </div>
  )
}
