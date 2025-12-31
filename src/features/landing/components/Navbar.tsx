import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { ProfileShortcut } from "../../../components/app/ProfileShortcut";

export function Navbar({ onSignIn, onGetStarted }: { onSignIn: () => void, onGetStarted: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"]);

  const navItems = [
    { key: "Features", path: "#features" },
    { key: "Pricing", path: "/subscription/plans" },
    { key: "Community", path: "/community" },
  ];

  // Smooth scroll handler for anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const id = path.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false); // close mobile menu if open
      }
    }
  };

  const { isAuthenticated } = useAuth(); // TO DO: replace with actual auth state
  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all"
    >
      <div className="mx-auto max-w-7xl  py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-xl text-transparent">
              MyShow.AI
            </span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.path}
                whileHover={{ y: -2 }}
                className="text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)]"
                onClick={e => handleNavClick(e, item.path)}
              >
                {item.key}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <ProfileShortcut />
            ) : (
              <motion.button
                onClick={onSignIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)]"
              >
                Sign In
              </motion.button>
            )}
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] px-6 py-2 text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-[oklch(0.58_0.26_300)]" />
            ) : (
              <Menu className="h-6 w-6 text-[oklch(0.58_0.26_300)]" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="overflow-hidden md:hidden"
        >
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={isOpen ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)]"
                onClick={e => handleNavClick(e, item.path)}
              >
                {item.key}
              </motion.a>
            ))}
            <div className="flex flex-col gap-2 border-t border-[oklch(0.9_0_0)] pt-4">
              {isAuthenticated ? (
                <div className="flex justify-center">
                  <ProfileShortcut />
                </div>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSignIn();
                  }}
                  className="text-center text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)] cursor-pointer"
                >
                  Sign In
                </a>
              )}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onGetStarted();
                }}
                className="rounded-full bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] px-6 py-2 text-center text-white cursor-pointer"
              >
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
