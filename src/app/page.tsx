import { Hero } from "@/components/Hero";
import { FeaturedListings } from "@/components/FeaturedListings";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedListings />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
