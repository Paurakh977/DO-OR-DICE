import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { GameplaySection } from "@/components/gameplay-section"
import { RulesSection } from "@/components/rules-section"
import { DownloadSection } from "@/components/download-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <GameplaySection />
      <RulesSection />
      <DownloadSection />
      <Footer />
    </main>
  )
}
