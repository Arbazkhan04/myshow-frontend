"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CharacterSelector from "./CharacterSelectoMin";
import { Button } from "../ui/button";

import { SERVER_API_URL } from "@/lib/constants";
import EpisodeDialog from "./EpisodeDialog";

/* SSE Parser */
function parseSSE(buffer: string) {
  const parts = buffer.split("\n\n");
  const remainder = parts.pop() || "";

  const events = parts
    .map((block) => {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      let event: string | undefined;
      let data = "";

      for (const line of lines) {
        if (line.startsWith("event:")) event = line.replace("event:", "").trim();
        else if (line.startsWith("data:")) data += line.replace("data:", "").trim();
      }

      if (!event && !data) return null;
      return { event: event || "message", data };
    })
    .filter(Boolean) as Array<{ event: string; data: string }>;

  return { events, remainder };
}

export default function EpisodeForm() {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user._id : "dummy";

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [finalData, setFinalData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      story: "",
      character: null,
      artStyle: "realistic",
      resolution: "720P",
      mode: "wan_lipsync",
    },
  });

  const onSubmit = async (data: any) => {
    const payload = { ...data, userId };

    setOpen(true);
    setProgress(0);
    setMessages([]);
    setFinalData(null);
    setErrorMsg(null);

    try {
      const res = await fetch(`${SERVER_API_URL}/episode-orchestrator/generate-stream-mock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      if (!res.body) throw new Error("Server did not return a streaming body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const { events, remainder } = parseSSE(buffer);
          buffer = remainder;

          for (const ev of events) {
            try {
              const parsed = JSON.parse(ev.data);

              if (ev.event === "notification") {
                setMessages((prev) => [...prev, parsed.message]);
                if (parsed.total && parsed.index !== undefined) {
                  setProgress(Math.round(((parsed.index + 1) / parsed.total) * 100));
                }
              } else if (ev.event === "completed") {
                setFinalData(parsed.body || parsed);
                setProgress(100);
              } else if (ev.event === "error") setErrorMsg(parsed.message);
            } catch {
              console.warn("Failed to parse SSE event:", ev);
            }
          }
        }
      }

      reader.releaseLock();
    } catch (err: any) {
      setErrorMsg(err.message ?? "Unknown error");
    }
  };

  const selectedCharacter = watch("character");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
        {/* CHARACTER */}
        <Controller
          name="character"
          control={control}
          rules={{ required: "Character is required" }}
          render={({ field }) => (
            <CharacterSelector value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.character && <p className="text-red-500 text-sm">{errors.character.message}</p>}

        {/* STORY */}
        <div>
          <label className="font-medium">Story</label>
          <Controller
            name="story"
            control={control}
            rules={{ required: "Story is required" }}
            render={({ field }) => (
              <Textarea
                className="mt-1 min-h-[160px] max-h-[400px]"
                placeholder="Write your story..."
                {...field}
              />
            )}
          />
          {errors.story && <p className="text-red-500 text-sm">{errors.story.message}</p>}
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* ART STYLE */}
          <div>
            <label className="font-medium">Art Style</label>
            <Controller
              name="artStyle"
              control={control}
              rules={{ required: "Art style is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="scifi">Sci-Fi</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.artStyle && <p className="text-red-500 text-sm">{errors.artStyle.message}</p>}
          </div>

          {/* RESOLUTION */}
          <div>
            <label className="font-medium mb-1 block">Resolution</label>
            <Controller
              name="resolution"
              control={control}
              rules={{ required: "Resolution is required" }}
              render={({ field }) => (
                <Tabs value={field.value} onValueChange={field.onChange} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="480P">480P</TabsTrigger>
                    <TabsTrigger value="720P">720P</TabsTrigger>
                    <TabsTrigger value="1080P">1080P</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />
            {errors.resolution && <p className="text-red-500 text-sm">{errors.resolution.message}</p>}
          </div>

          {/* MODE */}
          <div>
            <label className="font-medium">Mode</label>
            <Controller
              name="mode"
              control={control}
              rules={{ required: "Mode is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wan_lipsync">WAN Lipsync</SelectItem>
                    <SelectItem value="external_merge">External Merge</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.mode && <p className="text-red-500 text-sm">{errors.mode.message}</p>}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <Button type="submit" className="w-full py-6">Create Video</Button>
      </form>

      {/* DIALOG */}
      <EpisodeDialog
        open={open}
        progress={progress}
        latestMessage={messages[messages.length - 1] || ""}
        finalData={finalData}
        errorMsg={errorMsg}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
