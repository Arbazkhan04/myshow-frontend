import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FaEye, FaHeart, FaShare, FaDownload } from "react-icons/fa";
import VideoPlayer from "./VideoPlayer";

export function EpisodeCard({ episode }: { episode: any }) {
  const character = episode.characterId;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="
            border rounded-xl overflow-hidden shadow-sm cursor-pointer
            bg-white dark:bg-neutral-900
            border-neutral-200 dark:border-neutral-800
            hover:shadow-md transition
          "
        >
          {/* Thumbnail */}
          <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-neutral-800">
            <video
              src={episode.finalVideoUrl}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Character */}
            <div className="flex items-center gap-3">
              <img
                src={character.Image}
                alt={character.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {character.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {character.art_style}
                </p>
              </div>
            </div>

            {/* Story */}
            <p className="text-sm line-clamp-3 text-neutral-700 dark:text-neutral-300">
              {episode.story}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <FaEye size={12} /> {episode.watchCount}
              </span>
              <span className="flex items-center gap-1">
                <FaHeart size={12} /> {episode.likes}
              </span>
              <span className="flex items-center gap-1">
                <FaShare size={12} /> {episode.shares}
              </span>
              <span className="flex items-center gap-1">
                <FaDownload size={12} /> {episode.downloads}
              </span>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
              <span>{episode.visibility}</span>
              <span>{new Date(episode.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="max-w-fit p-0 bg-transparent border-none shadow-none">
        <DialogHeader>
          <DialogTitle className="sr-only">Episode Preview</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center p-2">
          <VideoPlayer
            videoUrl={episode.finalVideoUrl}
            subtitleUrl={episode.subtitleUrl}
            width={360}
            height={640}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
