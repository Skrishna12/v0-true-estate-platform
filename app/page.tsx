import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AccessibilityFeatures } from "@/components/accessibility-features"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip Link for Screen Readers */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <HeroSection />
        <FeatureSection />
      </main>

      <Footer />
      <AccessibilityFeatures />
    </div>
  )
}
