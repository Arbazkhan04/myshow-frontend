"use client";
import React, { useRef, useLayoutEffect, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  videoUrl: string;
  subtitleUrl?: string;
  width?: number; // optional fixed width
  height?: number; // optional fixed height
}

export default function VideoPlayer({
  videoUrl,
  subtitleUrl,
  width,
  height,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const srtToVtt = (srt: string) =>
    "WEBVTT\n\n" +
    srt
      .replace(/\r+/g, "")
      .replace(/^\s+|\s+$/g, "")
      .replace(/(\d+):(\d+):(\d+),(\d+)/g, "$1:$2:$3.$4");

  useLayoutEffect(() => {
    if (!containerRef.current || playerRef.current) return;

    const videoEl = document.createElement("video-js");
    videoEl.classList.add("vjs-big-play-centered", "video-js");

    containerRef.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      controls: true,
      preload: "auto",
      fluid: false, // turn off fluid so we can control height/width manually
      responsive: true,
      width: width || 360, // default width if not provided
      height: height || 640, // default mobile 9:16
    });

    return () => {
      playerRef.current?.dispose();
      playerRef.current = null;
    };
  }, [width, height]);

  useEffect(() => {
    if (!playerRef.current) return;
    const player = playerRef.current;

    player.src({ src: videoUrl, type: "video/mp4" });

    (async () => {
      if (!subtitleUrl) return;

      const srt = await fetch(subtitleUrl).then((r) => r.text());
      const vtt = srtToVtt(srt);

      const blob = new Blob([vtt], { type: "text/vtt" });
      const vttUrl = URL.createObjectURL(blob);

      const tracks = player.remoteTextTracks();
      for (let i = tracks.length - 1; i >= 0; i--) {
        player.removeRemoteTextTrack(tracks[i]);
      }

      player.addRemoteTextTrack(
        {
          kind: "subtitles",
          src: vttUrl,
          srclang: "en",
          label: "English",
          default: true,
        },
        false
      );
    })();
  }, [videoUrl, subtitleUrl]);

  return (
    <div
      ref={containerRef}
      style={{
        width: width || 360,
        height: height || 640,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    ></div>
  );
}
