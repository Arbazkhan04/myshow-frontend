"use client";

import { useState } from "react";
import { EpisodesView } from "@/components/app/EpisodesView";

import { ChevronLeft, ChevronRight, LogIn } from "lucide-react";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export function CommunityIndex() {
  // Local filter state
  const user = useSelector((state: RootState) => state.auth.user);
    const userId = user ? user._id : null;
  const [page, setPage] = useState(1);
  const [artStyle, setArtStyle] = useState<string>("");

  // Fixed limit
  const limit = 12;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center px-4 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-[Crimson_Pro]">
          Community Feed
        </h1>

        <p className="text-muted-foreground text-base md:text-lg mt-4 leading-relaxed">
          Explore the latest episodes and creations from the community.  
          Filter by art style or browse page-by-page to see trending and recent content.
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

          <button
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded-md border hover:bg-accent"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Community Episodes List */}
      <div className="px-4 w-full container mt-10">
        {!userId ? (
                  <div className="w-full flex flex-col justify-center items-center py-20 opacity-80">
                    <LogIn className="h-12 w-12 text-muted-foreground mb-4" />
        
                    <p className="text-lg text-muted-foreground max-w-sm text-center leading-relaxed">
                      You need to login to view the episodes you’ve generated.
                    </p>
                  </div>
                ) : (
        <EpisodesView
          filters={{
            visibility: "public",
            ...(artStyle ? { art_style: artStyle } : {}),
            page,
            limit,
          }}
        />
        )}
      </div>
    </div>
  );
}
