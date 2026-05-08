import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import VideoGallery from "@/components/VideoGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductGrid />
      <VideoGallery />
      <ContactSection />
      <Footer />
    </main>
  );
}
