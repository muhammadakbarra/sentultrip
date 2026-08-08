import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import PackagesSection from "@/components/PackagesSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import LatestBlogSection from "@/components/LatestBlogSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function HomePage() {
  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main>
        <HeroSection />
        <ActivitiesSection />
        <PackagesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FaqSection />
        <LatestBlogSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
