import { useState } from "react";
import { CharacterCard } from "./CharacterCard";
import { CharacterDetailDialog } from "./CharacterDetailDialog";
import { Users } from "lucide-react";

interface Character {
  id: string;
  name: string;
  artStyle: string;
  gender: string;
  ageGroup: string;
  personality: string[];
  voiceTone: string;
  voiceAccent: string;
  hairColor?: string;
  hairStyle?: string;
  eyeColor?: string;
  outfitStyle?: string;
  backstory?: string;
  image?: string;
}

interface MyCharactersProps {
  characters: Character[];
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

export function MyCharacters({ characters, onEdit, onDelete }: MyCharactersProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleView = (character: Character) => {
    setSelectedCharacter(character);
    setDetailDialogOpen(true);
  };

  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center mb-6 border border-pink-500/30">
          <Users className="w-12 h-12 text-pink-400" />
        </div>
        <h3 className="text-white mb-2">No Characters Yet</h3>
        <p className="text-purple-200/70 text-center max-w-md">
          Start creating your digital stars! Click on the "Create New" tab to design your first character.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
            onView={handleView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <CharacterDetailDialog
        character={selectedCharacter}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </>
  );
}
