import { motion, useInView } from "motion/react";
import { Wand2, Users, Video, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: Wand2,
    title: "AI Character Creation",
    description:
      "Generate unique characters with distinct personalities, voices, and appearances in seconds.",
    gradient: "from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]",
  },
  {
    icon: Video,
    title: "Instant Video Generation",
    description:
      "Turn your scripts into fully produced videos with AI-generated scenes and smooth animations.",
    gradient: "from-[oklch(0.74_0.25_340)] to-[oklch(0.58_0.26_300)]",
  },
  {
    icon: Zap,
    title: "Auto Subtitles",
    description:
      "Perfectly synchronized subtitles generated automatically for maximum engagement and accessibility.",
    gradient: "from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)]",
  },
  {
    icon: Users,
    title: "Community Sharing",
    description:
      "Share your creations with the world and discover amazing content from other creators.",
    gradient: "from-[oklch(0.74_0.25_340)] to-[oklch(0.58_0.26_300)]",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
    id='features'
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white to-[oklch(0.96_0_0)] py-24 px-4"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 top-0 h-96 w-96 rounded-full bg-[oklch(0.58_0.26_300)]/5 blur-3xl"></div>
        <div className="absolute -left-1/4 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.74_0.25_340)]/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] bg-clip-text text-transparent">
            Everything You Need to Create
          </h2>
          <p className="mx-auto max-w-2xl text-[oklch(0.45_0_0)]">
            Powerful features that make video creation effortless and fun
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  index,
}: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative h-full rounded-2xl border border-[oklch(0.9_0_0)] bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100 from-[oklch(0.58_0.26_300)] to-[oklch(0.74_0.25_340)] p-[2px]">
        <div className="h-full w-full rounded-2xl bg-white"></div>
      </div>

      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>

        <h3 className="mb-3">{title}</h3>
        <p className="text-[oklch(0.45_0_0)]">{description}</p>
      </div>

      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 transition-opacity group-hover:opacity-5`}
      ></motion.div>
    </motion.div>
  );
}
