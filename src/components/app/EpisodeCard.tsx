// EpisodeCard.tsx
"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog"; 
import { FaEye, FaHeart, FaDownload } from "react-icons/fa";
import { format } from "date-fns";
import { EpisodeDialog } from "./EpisodeCardDialog";
import { useState } from "react";

export function EpisodeCard({ episode }: { episode: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const character = episode.characterId;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="border rounded-xl overflow-hidden shadow-sm cursor-pointer bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:shadow-md transition">
          <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-neutral-800 relative">
            <video src={episode.finalVideoUrl} className="w-full h-full object-cover pointer-events-none" />

            <div className="absolute bottom-2 left-2 flex gap-3 bg-black/40 rounded-full px-3 py-1 text-white text-xs font-semibold">
              <div className="flex items-center gap-1">
                <FaEye size={14} /> {episode.watchCount}
              </div>
              <div className="flex items-center gap-1">
                <FaHeart size={14} className={episode.isLiked ? "text-red-500" : "text-white"} /> {episode.likes}
              </div>
              <div className="flex items-center gap-1">
                <FaDownload size={14} /> {episode.downloads}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3">
              <img src={character.Image} alt={character.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{character.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{character.art_style}</p>
              </div>
            </div>
            <p className="text-sm line-clamp-3 text-neutral-700 dark:text-neutral-300">{episode.story}</p>
            <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
              <span>{episode.visibility === 'onlyme' ? 'Private' : 'Public'}</span>
              <span>{format(new Date(episode.createdAt), "dd MMM, yyyy")}</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Dialog opens separately */}
      <EpisodeDialog episodeId={episode._id} isOpen={isOpen} />
    </Dialog>
  );
}
