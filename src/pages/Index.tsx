import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PhotoUpload from "@/components/PhotoUpload";
import CollectionSellSummary from "@/components/CollectionSell";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";
import SellSection from "@/components/SellSection";
import SocialMedia from "@/components/SocialMedia";
import Footer from "@/components/Footer";
import FacebookGroupPromo from "@/components/FacebookGroupPromo";

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // slight delay to ensure layout is ready
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
    }
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PhotoUpload />
        <SocialMedia />
        <FacebookGroupPromo />
        <SellSection />
        <CollectionSellSummary />
        <ContactUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
