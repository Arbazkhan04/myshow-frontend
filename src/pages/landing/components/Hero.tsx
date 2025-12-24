import { motion, useScroll, useTransform } from "motion/react";
import { Play, Sparkles } from "lucide-react";
import { useRef } from "react";

export function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-1/2 left-1/2 h-[150%] w-[150%] -translate-x-1/2"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.58_0.26_300)]/10 via-[oklch(0.74_0.25_340)]/10 to-transparent"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[oklch(0.58_0.26_300)]/20 blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[oklch(0.74_0.25_340)]/20 blur-3xl"
          ></motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[oklch(0.58_0.26_300)]/30 bg-white/50 px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-[oklch(0.58_0.26_300)]" />
          <span className="text-sm text-[oklch(0.45_0_0)]">
            AI-Powered Video Generation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 max-w-5xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-transparent"
        >
          Create Stunning AI Videos
          <br />
          with Subtitles in Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-10 max-w-2xl text-[oklch(0.45_0_0)]"
        >
          Transform your ideas into captivating video content with AI-generated
          characters, voices, and perfectly synced subtitles. Your creative vision,
          automated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] px-8 py-4 text-white shadow-lg transition-shadow hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Creating Free
              <Sparkles className="h-5 w-5" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </motion.button>

          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border-2 border-[oklch(0.58_0.26_300)] bg-white px-8 py-4 text-[oklch(0.58_0.26_300)] transition-colors hover:bg-[oklch(0.58_0.26_300)] hover:text-white"
          >
            <Play className="h-5 w-5" />
            Watch Demo
          </motion.button> */}
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-[10%] h-16 w-16 rounded-2xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] opacity-20 blur-sm"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/3 right-[15%] h-20 w-20 rounded-full bg-gradient-to-br from-[oklch(0.74_0.25_340)] to-[oklch(0.58_0.26_300)] opacity-20 blur-sm"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/3 left-[20%] h-12 w-12 rounded-xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] opacity-20 blur-sm"
          ></motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 w-5 rounded-full border-2 border-[oklch(0.58_0.26_300)]/50"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mx-auto mt-2 h-2 w-1 rounded-full bg-[oklch(0.58_0.26_300)]"
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
