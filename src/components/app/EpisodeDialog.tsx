"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoPlayer from "./VideoPlayer";

interface EpisodeDialogProps {
  open: boolean;
  progress: number;
  latestMessage: string;
  finalData: any;
  errorMsg: string | null;
  onClose: () => void;
}

// Steps for video generation
const steps = [
  "Analyzing script",
  "Generating visuals",
  "Synthesizing audio",
  "Compiling final video",
];

export default function EpisodeDialog({
  open,
  progress,
  latestMessage,
  finalData,
  errorMsg,
  onClose,
}: EpisodeDialogProps) {
  const [stepIndex, setStepIndex] = useState(0);

  // Animate steps based on progress
  useEffect(() => {
    const index = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setStepIndex(index);
  }, [progress]);

  // Cannot close dialog while generating
  const isGenerating = !finalData && !errorMsg;

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={isGenerating ? () => {} : onClose}>
          <DialogContent
            className={`overflow-hidden glass-panel border-purple-500/30 rounded-3xl max-w-md p-8 transition-all duration-500
              ${finalData ? "max-w-full w-full p-0 rounded-none" : ""}`}
            showCloseButton={!isGenerating}
          >
            {/* --- GENERATING STATE --- */}
            {isGenerating && (
              <div className="text-center space-y-6">
                <motion.div
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="gradient-text text-2xl font-bold">Generating Video</h2>
                <p className="text-purple-200/70">{latestMessage || steps[stepIndex]}</p>

                <div className="relative w-full h-3 bg-purple-900/30 rounded-full mt-4">
                  <motion.div
                    className="absolute h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                <motion.div className="text-purple-200/70 text-sm mt-2">
                  Please wait while your video is being generated...
                </motion.div>
              </div>
            )}

            {/* --- COMPLETED STATE --- */}
            {finalData && (
              <div className="w-full h-full">
                <VideoPlayer
                  videoUrl={finalData.finalVideoUrl}
                  subtitleUrl={finalData.subtitleUrl}
                  width={360}
                  height={640}
                />
              </div>
            )}

            {/* --- ERROR STATE --- */}
            {errorMsg && (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-red-600">Generation Failed</h2>
                <p className="text-muted-foreground">{errorMsg}</p>
                <div className="text-6xl text-red-500">⚠️</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
