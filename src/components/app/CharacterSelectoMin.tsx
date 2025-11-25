import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useGetCharactersByUserQuery } from "@/api/character";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CharacterSelectorProps {
  value: any;
  onChange: (v: any) => void;
}

export default function CharacterSelectorMin({
  value,
  onChange,
}: CharacterSelectorProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const createdBy = user ? user._id : "dummy";

  const { data } = useGetCharactersByUserQuery({ userId: createdBy });
  const characters = (data as any)?.body?.body || [];

  return (
    <div className="w-full py-4">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
          slidesToScroll: "auto", // Scrolls by number of visible items
        }}
        className="w-full"
      >
        {/* Header Row: Label Left, Buttons Right */}
        <div className="flex items-center justify-between px-1 mb-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Select Character
          </h2>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <CarouselPrevious 
              variant="outline"
              // 'static' removes the default absolute positioning
              className="static translate-y-0 h-8 w-8 border-2 border-primary/20 hover:border-primary hover:bg-primary/10" 
            />
            <CarouselNext 
              variant="outline"
              // 'static' removes the default absolute positioning
              className="static translate-y-0 h-8 w-8 border-2 border-primary/20 hover:border-primary hover:bg-primary/10" 
            />
          </div>
        </div>

        {/* Carousel Track */}
        {/* py-6 prevents shadow clipping */}
        <CarouselContent className="-ml-4 py-6 px-1">
          {characters.map((char: any) => {
            const selected = value?._id === char._id;

            const minimal = {
              _id: char._id,
              name: char.name,
              Image: char.Image,
              characterVoice: {
                voice_id: char.characterVoice?.voice_id,
              },
            };

            return (
              <CarouselItem
                key={char._id}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <div
                  onClick={() => onChange(minimal)}
                  className="group relative h-full cursor-pointer"
                >
                  <Card
                    className={cn(
                      // 4:7 Aspect Ratio
                      "aspect-[4/7] relative w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out",
                      selected
                        ? "border-primary ring-4 ring-primary/25 scale-110 shadow-2xl z-10"
                        : "border-transparent hover:border-primary/50 hover:scale-105 hover:shadow-lg bg-muted/20 opacity-90 hover:opacity-100"
                    )}
                  >
                    <img
                      src={char.Image}
                      alt={char.name}
                      className="h-full w-full object-cover object-top"
                    />

                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 pt-8 transition-all",
                        selected ? "opacity-100" : "opacity-90"
                      )}
                    >
                      <p
                        className={cn(
                          "truncate text-center text-sm font-bold tracking-wide",
                          selected ? "text-primary-foreground" : "text-white"
                        )}
                      >
                        {char.name}
                      </p>
                    </div>
                  </Card>

                  {/* Checkmark Indicator */}
                  {selected && (
                    <div className="absolute top-0 right-0 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md animate-in zoom-in-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}