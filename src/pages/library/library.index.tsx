"use client";

import { useState } from "react";
import { EpisodesView } from "@/components/app/EpisodesView";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";

export function LibraryIndex() {
  // Get userId
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user ? user._id : "dummy";

  // Local filter state
  const [page, setPage] = useState(1);
  const [artStyle, setArtStyle] = useState<string>("");

  // Fixed limit
  const limit = 12;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center px-4 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-[Crimson_Pro]">
          Your Episodes
        </h1>

        <p className="text-muted-foreground text-base md:text-lg mt-4 leading-relaxed">
          View, filter, and explore all the episodes you’ve created.  
          Refine by art style or browse page-by-page to revisit your stories.
        </p>
      </section>

      {/* Filters */}
      <div className="w-full container mt-12 flex items-center justify-between px-4">
        {/* Art Style Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Art Style:</span>

          <Select
            value={artStyle || "all"}
            onValueChange={(v) => {
              setArtStyle(v === "all" ? "" : v);
              setPage(1); // reset to page 1 when filter changes
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="scifi">Sci-Fi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-md border hover:bg-accent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-muted-foreground">Page {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded-md border hover:bg-accent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Episodes List */}
      <div className="w-full container mt-10">
        <EpisodesView
          filters={{
            userId,
            visibility: "onlyme",
            ...(artStyle ? { art_style: artStyle } : {}),
            page,
            limit,
          }}
        />
      </div>
    </div>
  );
}
