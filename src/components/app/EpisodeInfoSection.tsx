import React from 'react'
import { format } from "date-fns";
import { OverlayItem, PORTRAIT_HEIGHT, PORTRAIT_WIDTH } from './EpisodeCardDialog';
import { FaEye, FaHeart, FaDownload } from "react-icons/fa";
import { TbDownloadOff } from "react-icons/tb";
import { CommentSection } from "./CommentSection";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
const EpisodeInfoSection = ({ episode, handleDownload, handleLike, handleToggleVisibility, isDownloading, handleAllowedDownloadToggle }: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className={`hidden md:flex md:flex-col md:h-[${PORTRAIT_HEIGHT}px] md:w-[${PORTRAIT_WIDTH}px] bg-white dark:bg-neutral-900`}
            style={{
                width: `${PORTRAIT_WIDTH}px`,
                height: `${PORTRAIT_HEIGHT - 5}px`
            }}
        >
            {/* Episode Info Header (optional, reuse existing data) */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex flex-col items-start gap-3 ">
                <div className="flex items-center gap-3 w-full">
                    <img src={episode.characterId?.Image} alt={episode.characterId?.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className='flex flex-col items-start'>
                        <h3 className="text-lg font-semibold">{episode.characterId?.name || 'Episode'}</h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {episode.createdAt ? format(new Date(episode.createdAt), 'MMM dd, yyyy') : ''}
                        </p>
                    </div>
                </div>
                <p className="text-sm line-clamp-3 text-neutral-700 dark:text-neutral-300">{episode.story}</p>
            </div>
            {/* Overlays in Panel */}
            <div className="p-4 flex gap-4 justify-around">
                <OverlayItem icon={FaEye} count={episode.watchCount} />
                <OverlayItem icon={FaHeart} count={episode.likes} onClick={handleLike} isAction isLiked={episode.isLiked} />
                <OverlayItem icon={episode?.allowDownload ? FaDownload : TbDownloadOff} count={episode.downloads} onClick={handleDownload} isAction loading={isDownloading} disabled={episode?.allowDownload ? false : true} />

            </div>
            {/* Set Private Button */}
            {user?._id === episode.userId._id && (
                <div className="px-4 pb-2 flex items-center gap-2 w-full">
                    <Button onClick={handleToggleVisibility} size="sm" className="flex-1">
                        {episode.visibility === "onlyme" ? "Set Public" : "Set Private"}
                    </Button>
                    <Button onClick={handleAllowedDownloadToggle} size="sm" className="flex-1">
                        {episode.allowDownload ? "Disable Download" : "Enable Download"}
                    </Button>
                </div>
            )}
            {/* Comments Section - Always visible on md+ */}
            <div className="flex-initial h-full overflow-y-auto">
                <CommentSection episodeId={episode._id} />
            </div>
        </div>
    )
}

export default EpisodeInfoSection
