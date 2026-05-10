import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import Hero from "@/components/Hero";
import BrandsSection from "@/components/BrandsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ServicesSection from "@/components/ServicesSection";
import ProductGrid from "@/components/ProductGrid";
import VideoGallery from "@/components/VideoGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import CoverageAreaSection from "@/components/CoverageAreaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <CategoryBar />
      <Hero />
      <BrandsSection />
      <ProductGrid />
      <WhyChooseUsSection />
      <ServicesSection />
      <CoverageAreaSection />
      <VideoGallery />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
