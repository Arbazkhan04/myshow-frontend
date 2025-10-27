"use client"

import { useState, useRef } from "react"
import { Volume2, Play, Pause } from "lucide-react"

export function VoicePreview({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) audio.pause()
    else audio.play()

    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  return (
    <div className="flex items-center gap-3 p-2">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-gradient-to-r from-primary to-tertiary text-white hover:opacity-90 transition"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </button>

      <div className="flex-1 h-1.5 rounded-full bg-muted relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-tertiary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  )
}
