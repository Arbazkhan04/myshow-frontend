import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useGetCharactersByUserQuery } from "@/api/character";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CharacterSelectorProps {
  value: any;                    // controlled field value (entire character object)
  onChange: (v: any) => void;    // react-hook-form setter
}

export default function CharacterSelector({ value, onChange }: CharacterSelectorProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const createdBy = user ? user._id : "dummy";

  const { data, isLoading } = useGetCharactersByUserQuery({ userId: createdBy });

  const characters = (data as any)?.body?.body || []

  if (isLoading) return <p className="text-center py-6">Loading characters...</p>;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-3">Choose Character</h2>

      <Carousel className="w-full">
        <CarouselContent>
          {characters.map((char: any) => {
            const selected = value?._id === char._id;

            return (
              <CarouselItem key={char._id} className="basis-1/2 md:basis-1/4 lg:basis-1/6">
                <Card
                  onClick={() => onChange(char)}
                  className={`cursor-pointer transition-all duration-300 border-2 rounded-xl ${
                    selected
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-transparent hover:shadow"
                  }`}
                >
                  <CardContent className="p-2 flex flex-col items-center">
                    <img
                      src={char.Image}
                      alt={char.name}
                      className="w-full h-32 object-cover rounded-md"
                    />

                    <p className="mt-2 text-sm font-medium text-center">{char.name}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
