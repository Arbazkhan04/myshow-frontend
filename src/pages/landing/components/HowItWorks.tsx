import { motion, useInView } from "motion/react";
import { Palette, Wand2, Video, Share2 } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Create Your Characters",
    description:
      "Design unique AI characters with custom voices, personalities, and visual styles.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Script Your Episode",
    description:
      "Write your story or let AI help you craft engaging narratives for your videos.",
  },
  {
    number: "03",
    icon: Video,
    title: "Generate & Export",
    description:
      "Watch as AI brings your vision to life with perfectly synced subtitles and animations.",
  },
  {
    number: "04",
    icon: Share2,
    title: "Share with World",
    description:
      "Publish to the community, download your creations, and inspire others.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-[oklch(0.45_0_0)]">
            From idea to viral video in four simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 lg:block">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-b from-[oklch(0.58_0.26_300)] via-[oklch(0.74_0.25_340)] to-[oklch(0.58_0.26_300)] opacity-20"
            ></motion.div>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  index,
  isInView,
}: {
  number: string;
  icon: any;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center gap-8 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className={`inline-block ${isEven ? "lg:ml-auto" : "lg:mr-auto"}`}
        >
          <div className="mb-4 inline-flex items-center gap-4">
            <span className="bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-5xl text-transparent opacity-50">
              {number}
            </span>
          </div>
          <h3 className="mb-3">{title}</h3>
          <p className="max-w-md text-[oklch(0.45_0_0)]">{description}</p>
        </motion.div>
      </div>

      {/* Center icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.2 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative z-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] shadow-xl"
      >
        <Icon className="h-10 w-10 text-white" />

        {/* Glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] blur-xl"
        ></motion.div>
      </motion.div>

      {/* Spacer for alignment */}
      <div className="hidden flex-1 lg:block"></div>
    </motion.div>
  );
}
