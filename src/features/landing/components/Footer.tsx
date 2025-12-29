import { motion } from "motion/react";
import { Twitter, Instagram, Youtube, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[oklch(0.9_0_0)] bg-white py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h4 className="mb-4 bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-transparent">
              MyShow.AI
            </h4>
            <p className="mb-4 text-sm text-[oklch(0.45_0_0)]">
              Create stunning AI-generated videos with subtitles in seconds.
            </p>
            <div className="flex gap-3">
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
            </div>
          </div>

          {/* Product */}
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

          {/* Company */}
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

          {/* Support */}
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
          </div>
        </div>

        <div className="mt-12 border-t border-[oklch(0.9_0_0)] pt-8 text-center text-sm text-[oklch(0.45_0_0)]">
          <p>© 2025 MyShow.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
