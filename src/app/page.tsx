import { NavBar } from "@/components/global/navbar";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
