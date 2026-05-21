import { Hero } from "@/components/Hero";
import { FeaturedListings } from "@/components/FeaturedListings";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { getAllProperties } from "@/lib/dataStore";

export default async function Home() {
  const properties = await getAllProperties();
  const featuredProperties = properties.filter((p: any) => p.featured).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <FeaturedListings initialProperties={featuredProperties} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
