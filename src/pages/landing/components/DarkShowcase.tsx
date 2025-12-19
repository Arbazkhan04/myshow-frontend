import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Play, Sparkles, Download } from "lucide-react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DarkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.15_0.05_300)] to-[oklch(0.12_0.08_340)] py-32 px-4"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 -right-48 h-96 w-96 rounded-full bg-[oklch(0.58_0.26_300)]/20 blur-3xl"
        ></motion.div>
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }}
          className="absolute bottom-1/4 -left-48 h-96 w-96 rounded-full bg-[oklch(0.74_0.25_340)]/20 blur-3xl"
        ></motion.div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(oklch(0.58 0.26 300) 1px, transparent 1px),
                             linear-gradient(90deg, oklch(0.58 0.26 300) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[oklch(0.58_0.26_300)]/30 bg-[oklch(0.58_0.26_300)]/10 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-[oklch(0.74_0.25_340)]" />
              <span className="text-sm text-[oklch(0.74_0.25_340)]">
                Token-Based System
              </span>
            </motion.div>

            <h2 className="mb-6 text-white">
              Your Creative Studio,
              <br />
              <span className="bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-transparent">
                Powered by Tokens
              </span>
            </h2>

            <p className="mb-8 text-[oklch(0.7_0_0)]">
              Generate unlimited AI videos with our flexible token system. Create
              characters, produce episodes, and export professional-quality content
              with perfectly synced subtitles. Every creative tool you need, all in
              one place.
            </p>

            <div className="space-y-4">
              {[
                "Create custom AI characters with unique voices",
                "Generate videos with auto-synced subtitles",
                "Access your entire video library anytime",
                "Share and discover community creations",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[oklch(0.85_0_0)]">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 rounded-full bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] px-8 py-4 text-white shadow-lg transition-shadow hover:shadow-xl"
            >
              Get Started Now
            </motion.button>
          </motion.div>

          {/* Right content - Video preview mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ rotate }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[oklch(0.58_0.26_300)]/30 bg-gradient-to-br from-[oklch(0.2_0.05_300)] to-[oklch(0.18_0.08_340)] p-1 shadow-2xl">
              <div className="overflow-hidden rounded-xl bg-[oklch(0.1_0_0)]">
                {/* Video mockup */}
                <div className="relative aspect-video">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1673767297196-ce9739933932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW98ZW58MXx8fHwxNzY1NTAwNDExfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Video Production"
                    className="h-full w-full object-cover"
                  />

                  {/* Play button overlay */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all hover:bg-black/30"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] shadow-lg">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </motion.div>

                  {/* Subtitle mockup */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-black/80 px-6 py-2 backdrop-blur-sm">
                    <p className="text-center text-white">
                      AI-generated subtitles sync perfectly
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="border-t border-[oklch(0.58_0.26_300)]/20 bg-[oklch(0.15_0_0)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.58_0.26_300)] text-white"
                      >
                        <Play className="h-5 w-5" />
                      </motion.button>
                      <div className="h-1 w-48 overflow-hidden rounded-full bg-[oklch(0.3_0_0)]">
                        <motion.div
                          animate={{ width: ["0%", "100%"] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="h-full bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]"
                        ></motion.div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-[oklch(0.74_0.25_340)]"
                    >
                      <Download className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 -top-4 rounded-xl border border-[oklch(0.74_0.25_340)]/30 bg-gradient-to-br from-[oklch(0.2_0.05_340)] to-[oklch(0.18_0.08_300)] p-4 shadow-xl backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="mb-1 bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-2xl text-transparent">
                  1000+
                </div>
                <div className="text-xs text-[oklch(0.7_0_0)]">Videos Created</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
