import { motion, AnimatePresence } from "motion/react";
import { Sparkles, User, Palette, BookOpen, Check } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";

interface GeneratingAnimationProps {
  open: boolean;
  characterName: string;
}

const steps = [
  { icon: User, label: "Analyzing personality traits", color: "from-pink-500 to-pink-600" },
  { icon: Palette, label: "Generating visual appearance", color: "from-purple-500 to-purple-600" },
  { icon: Sparkles, label: "Adding unique characteristics", color: "from-fuchsia-500 to-fuchsia-600" },
  { icon: BookOpen, label: "Crafting backstory", color: "from-violet-500 to-violet-600" },
];

export function GeneratingAnimation({ open, characterName }: GeneratingAnimationProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="overflow-hidden glass-panel border-pink-500/30 rounded-3xl max-w-md p-8" showCloseButton={false}>
        <div className="text-center space-y-6">
          <div className="relative">
            <motion.div
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/50 to-purple-600/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div>
            <h2 className="gradient-text mb-2">Creating Character</h2>
            <p className="text-purple-200/70">{characterName}</p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                }}
                transition={{ 
                  delay: index * 0.4,
                  duration: 0.5,
                }}
                className="flex items-center gap-3 glass-card p-3 rounded-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                  }}
                  transition={{ 
                    delay: index * 0.4 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}
                >
                  <step.icon className="w-5 h-5 text-white" />
                </motion.div>
                
                <div className="flex-1 text-left">
                  <p className="text-white text-sm">{step.label}</p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: "100%",
                    }}
                    transition={{ 
                      delay: index * 0.4 + 0.3,
                      duration: 0.8,
                    }}
                    className="h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mt-1"
                  />
                </div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{ 
                    delay: index * 0.4 + 1.1,
                  }}
                >
                  <Check className="w-5 h-5 text-green-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-purple-200/70 text-sm"
          >
            This may take a few moments...
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
