import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { DarkShowcase } from "./components/DarkShowcase";
import { HowItWorks } from "./components/HowItWorks";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import './index.css'
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "@/components/app/AuthForm";
import { useState } from "react";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function LandingPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleGetStartedClick = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/create");

    }
    else {
      setIsOpen(true);

    }
  }
  const handleSignIn = () => {
    setIsOpen(true);
  }
  return (
    <div className="overflow-x-hidden">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Navbar onSignIn={handleSignIn} onGetStarted={handleGetStartedClick} />
        <Hero onGetStarted={handleGetStartedClick} />
        <Features />
        <DarkShowcase onGetStarted={handleGetStartedClick} />
        <HowItWorks />
        <CTA onGetStarted={handleGetStartedClick} />
        <Footer />
        <DialogContent className="lg:max-w-5xl lg:w-full p-0 overflow-hidden max-h-[90vh]">
          {/* Success callback closes the dialog */}
          <AuthForm onSuccess={() => {
            document.documentElement.click()
            setIsOpen(false)
            navigate("/create");
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
