import { motion } from "motion/react";
import { Sparkles, Wand2, Users, Palette } from "lucide-react";
import { Button } from "../ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/40 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/40 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-500/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.header 
          className="flex justify-between items-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center glow-effect">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl gradient-text">MyShow AI</span>
          </div>
          <Button 
            onClick={onLogin}
            variant="ghost" 
            className="text-pink-200 hover:text-pink-100 hover:bg-white/10"
          >
            Login
          </Button>
        </motion.header>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl mb-6">
              <span className="gradient-text">Create Your Digital Stars</span>
            </h1>
            <p className="text-xl text-purple-200/80 mb-10 max-w-2xl mx-auto">
              Design stunning AI-powered characters for your animated shows. Bring your imagination to life with our intuitive character studio.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 rounded-2xl glow-effect transition-all"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
              <Button 
                onClick={onLogin}
                size="lg"
                variant="outline"
                className="border-2 border-pink-500/50 text-pink-200 hover:bg-pink-500/10 px-8 py-6 rounded-2xl backdrop-blur-sm"
              >
                Login
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FeatureCard 
            icon={<Palette className="w-8 h-8" />}
            title="Character Creation"
            description="Design unique characters with customizable traits, styles, and appearances"
          />
          <FeatureCard 
            icon={<Wand2 className="w-8 h-8" />}
            title="AI-Powered Voice"
            description="Choose from various voice tones and accents to bring your characters to life"
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8" />}
            title="Templates Library"
            description="Save and reuse your favorite character designs with our template system"
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      className="glass-card p-8 rounded-3xl hover:scale-105 hover:border-pink-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
      whileHover={{ y: -5 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 flex items-center justify-center mb-4 border border-pink-500/40">
        <div className="text-pink-400">
          {icon}
        </div>
      </div>
      <h3 className="text-white mb-2">{title}</h3>
      <p className="text-purple-200/70">{description}</p>
    </motion.div>
  );
}
