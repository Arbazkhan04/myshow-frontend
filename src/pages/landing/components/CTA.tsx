import { motion, useInView } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.15_0.05_300)] via-[oklch(0.12_0.08_340)] to-[oklch(0.15_0.05_300)] py-24 px-4"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 h-full w-full"
        >
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[oklch(0.58_0.26_300)]/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[oklch(0.74_0.25_340)]/20 blur-3xl"></div>
        </motion.div>

        {/* Particle effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute rounded-full bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
          ></motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[oklch(0.74_0.25_340)]/30 bg-[oklch(0.74_0.25_340)]/10 px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-[oklch(0.74_0.25_340)]" />
          <span className="text-sm text-[oklch(0.74_0.25_340)]">
            Start Creating Today
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 text-white"
        >
          Ready to Transform Your Ideas
          <br />
          <span className="bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-transparent">
            into Viral Videos?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 text-[oklch(0.7_0_0)]"
        >
          Join thousands of creators using MyShow.AI to produce stunning AI-generated
          videos. Get started with free tokens and see the magic happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-[oklch(0.58_0.26_300)] shadow-lg transition-shadow hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Trial
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[oklch(0.58_0.26_300)]/10 to-[oklch(0.74_0.25_340)]/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
          >
            View Pricing
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10"
        >
          {[
            { value: "50K+", label: "Active Creators" },
            { value: "1M+", label: "Videos Generated" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2 bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-3xl text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-[oklch(0.6_0_0)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
