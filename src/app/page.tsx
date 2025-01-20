import { NavBar } from "@/components/global/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"

export default function Home() {
  return (
      <main>
        <NavBar />
        <HeroSection />
        <FeaturesSection />
      </main>
  )
}

