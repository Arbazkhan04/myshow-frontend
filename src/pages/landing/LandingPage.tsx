import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { DarkShowcase } from "./components/DarkShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import './index.css'

export function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <DarkShowcase />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
