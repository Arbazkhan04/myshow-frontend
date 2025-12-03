import { useFilterEpisodesQuery } from "@/api/episode";
import type { operations } from "@/types/api";
import { EpisodeCard } from "./EpisodeCard";
import { Loader2, TriangleAlert, FileSearch } from "lucide-react";

type EpisodeFilters =
  operations["EpisodeController_filterEpisodes"]["parameters"]["query"];

export function EpisodesView({ filters }: { filters: EpisodeFilters }) {
  const { data, isLoading, error } = useFilterEpisodesQuery(filters);

  const results = data?.body?.results ?? [];
  const total = data?.body?.total ?? 0;
  const page = data?.body?.page ?? 1;
  const pages = data?.body?.pages ?? 1;

  if (isLoading) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-pulse">
      <Loader2 className="w-10 h-10 mb-4 animate-spin" />
      <h2 className="text-lg font-semibold">Loading your episodes…</h2>
      <p className="text-sm opacity-80 mt-1">Fetching your creations, please wait.</p>
    </div>
  );
}

if (error) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-red-500">
      <TriangleAlert className="w-10 h-10 mb-4" />
      <h2 className="text-lg font-semibold">Unable to load episodes</h2>
      <p className="text-sm opacity-80 mt-1">
        Something went wrong. Please try again later.
      </p>
    </div>
  );
}

if (results.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <FileSearch className="w-10 h-10 mb-4 opacity-70" />
      <h2 className="text-lg font-semibold">No episodes found</h2>
      <p className="text-sm opacity-80 mt-1">
        You haven’t created any episodes for this filter yet.
      </p>
    </div>
  );
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Episodes ({total})
        </h2>
        <p className="text-sm text-gray-500">
          Page {page} of {pages}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((ep: any) => (
          <EpisodeCard key={ep._id} episode={ep} />
        ))}
      </div>
    </div>
  );
}
