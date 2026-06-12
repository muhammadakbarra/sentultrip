import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import PackagesSection from "@/components/PackagesSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ActivitiesSection />
        <PackagesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
