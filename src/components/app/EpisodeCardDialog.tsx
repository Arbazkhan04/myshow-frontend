// EpisodeDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { FaEye, FaHeart, FaDownload, FaCommentDots, FaArrowLeft } from "react-icons/fa";
import { TbDownloadOff } from "react-icons/tb";

import VideoPlayer from "./VideoPlayer";

import {
  useGetEpisodeByIdQuery,
  useUpdateEpisodeMutation,
  useTrackWatchMutation,
  useToggleLikeMutation,
  useTrackDownloadMutation
} from "@/api/episode";
import { CommentSection } from "./CommentSection";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import EpisodeInfoSection from "./EpisodeInfoSection";

export const PORTRAIT_WIDTH = 360;
export const PORTRAIT_HEIGHT = 640;

export const OverlayItem = ({ icon: Icon, count, onClick, isAction = false, isLiked = false, loading = false, disabled = false }: any) => {
  const iconColorClass = isLiked ? 'text-red-500' : 'text-white';
  const baseClass = "flex flex-col items-center gap-1 w-14 h-14 bg-black/30 justify-center rounded-full text-white font-semibold";
  const actionClass = isAction ? "cursor-pointer hover:bg-black/70 transition" : "";
  return (
    <div className={`${baseClass} ${actionClass}`} onClick={!disabled ? onClick : () => { console.error("dowload not allowed") }} aria-disabled={disabled} >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <Icon size={count !== undefined || !disabled ? 16 : 24} className={iconColorClass} />
      )}
      {count !== undefined && !loading && !disabled && <span className="text-xs">{count}</span>}
    </div>
  );
};

export function EpisodeDialog({ episodeId, isOpen }: { episodeId: string; isOpen: boolean; }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading } = useGetEpisodeByIdQuery(
    { id: episodeId },
    { skip: !episodeId || !isOpen }
  );
  const [episode, setEpisode] = useState<any>(null);
  const [showComments, setShowComments] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // <-- download loading state

  const [updateEpisode] = useUpdateEpisodeMutation();
  const [trackWatch] = useTrackWatchMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [trackDownload] = useTrackDownloadMutation();

  useEffect(() => {
    if (data?.body) setEpisode(data.body);
  }, [data]);

  if (isLoading || !episode) return null; // can replace with skeleton

  const handleLike = async () => {
    const result = await toggleLike({ id: episode._id }).unwrap();
    setEpisode(prev => ({ ...prev, likes: result.newLikesCount, isLiked: result.isLiked }));
  };

  const handleDownload = async () => {
    if (episode?.allowDownload === false) {
      console.error("Download not allowed for this video.");
      return;
    }
    try {
      setIsDownloading(true);

      // Fetch video as blob
      const response = await fetch(episode.finalVideoUrl);
      const blob = await response.blob();

      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${episode.characterId.name}_episode.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Track download after actual download
      const result = await trackDownload({ id: episode._id }).unwrap();
      setEpisode(prev => ({ ...prev, downloads: result.downloads }));
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleToggleVisibility = async () => {
    const nextVisibility = episode.visibility === "onlyme" ? "public" : "onlyme";
    const result = await updateEpisode({ id: episode._id, data: { visibility: nextVisibility } }).unwrap();
    setEpisode(prev => ({ ...prev, visibility: result.visibility }));
  };

  return (
    <DialogContent
      className="p-0 bg-transparent shadow-none border-none overflow-hidden w-full max-w-full h-full sm:w-auto sm:max-w-none transition-all duration-300 ease-in-out"

    >
      <div className={`relative flex flex-col md:flex-row items-center justify-center max-h-[${PORTRAIT_HEIGHT}px] w-full md:w-[${2 * PORTRAIT_WIDTH}px] md:w-auto bg-transparent`}>
        <div className={`absolute md:relative md:h-[${PORTRAIT_HEIGHT}px] md:w-[${PORTRAIT_WIDTH}px] inset-0 transition-opacity duration-300 ${showComments ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <VideoPlayer videoUrl={episode.finalVideoUrl} subtitleUrl={episode.subtitleUrl} width={PORTRAIT_WIDTH} height={PORTRAIT_HEIGHT} />
          <div className="absolute md:hidden top-0 left-0 p-4 pointer-events-none">
            <div className="flex flex-col gap-2 pointer-events-auto">
              <OverlayItem icon={FaEye} count={episode.watchCount} />
              <OverlayItem icon={FaHeart} count={episode.likes} onClick={handleLike} isAction isLiked={episode.isLiked} />
              <OverlayItem icon={episode?.allowDownload ? FaDownload : TbDownloadOff} count={episode.downloads} onClick={handleDownload} isAction loading={isDownloading} disabled={episode?.allowDownload ? false : true} />
              <OverlayItem icon={FaCommentDots} onClick={() => setShowComments(true)} isAction />
            </div>

          </div>
          {user?._id === episode.userId._id && <Button onClick={handleToggleVisibility} size="sm" className="absolute md:hidden bottom-10 right-4">
            {episode.visibility === "onlyme" ? "Set Public" : "Set Private"}
          </Button>}
          <div className="bg-background w-24 ">

          </div>
        </div>

        <div className={`absolute md:hidden inset-0 bg-white dark:bg-neutral-900 rounded-lg flex flex-col transition-transform duration-300 ${showComments ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center gap-3">
            <button onClick={() => setShowComments(false)} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer">
              <FaArrowLeft size={18} />
            </button>
            <h3 className="text-xl font-semibold flex-1">Comments ({episode.comments ?? 0})</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CommentSection episodeId={episode._id} />
          </div>
        </div>
        <EpisodeInfoSection episode={episode} handleLike={handleLike} handleToggleVisibility={handleToggleVisibility} handleDownload={handleDownload} isDownloading={isDownloading} />

      </div>
    </DialogContent>
  );
}
