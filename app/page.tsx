import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import SearchSection from "@/components/search-section"
import StatsSection from "@/components/stats-section"
import AlertBanner from "@/components/alert-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AlertBanner />
      <Hero />
      <SearchSection />
      <StatsSection />
    </div>
  )
}
