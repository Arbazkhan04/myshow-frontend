import { motion } from "motion/react";
import { Twitter, Instagram, Youtube, Github, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[oklch(0.9_0_0)] bg-white py-6 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-xl text-transparent">
                MyShow.AI
              </span>
            </a>
            <p className="mb-4 text-base text-[oklch(0.45_0_0)]">
              Create stunning AI-generated videos with subtitles in seconds.
            </p>
            {/* <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Github, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] text-white transition-all hover:shadow-lg"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Product *
          <div>
            <h4 className="mb-4 text-[oklch(0.15_0_0)]">Product</h4>
            <ul className="space-y-2 text-sm">
              {["Features", "Pricing", "Characters", "Library", "Community"].map(
                (item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)]"
                    >
                      {item}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </div>

          Company 
          <div>
            <h4 className="mb-4 text-[oklch(0.15_0_0)]">Company</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Blog", "Careers", "Press", "Partners"].map(
                (item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)]"
                    >
                      {item}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </div>

          Support 
          <div>
            <h4 className="mb-4 text-[oklch(0.15_0_0)]">Support</h4>
            <ul className="space-y-2 text-sm">
              {["Help Center", "Documentation", "API", "Contact", "Status"].map(
                (item, index) => (
                  <li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-[oklch(0.45_0_0)] transition-colors hover:text-[oklch(0.58_0.26_300)]"
                    >
                      {item}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </div> */}
        </div>

        <div className="mt-4 border-t border-[oklch(0.9_0_0)] pt-4 text-center text-sm text-[oklch(0.45_0_0)]">
          <p>© 2025 MyShow.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
