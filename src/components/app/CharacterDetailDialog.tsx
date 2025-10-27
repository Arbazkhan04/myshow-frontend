import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";

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

interface CharacterDetailDialogProps {
  character: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterDetailDialog({ character, open, onOpenChange }: CharacterDetailDialogProps) {
  if (!character) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-2 border-pink-500/30 rounded-3xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center mb-6">
            <h2 className="gradient-text">{character.name}</h2>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Character Image */}
          <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 flex items-center justify-center">
            {character.image ? (
              <img src={character.image} alt={character.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-8xl">
                {character.artStyle === "Anime" && "👨‍🎤"}
                {character.artStyle === "Cartoon" && "🎭"}
                {character.artStyle === "Realistic" && "🧑"}
                {character.artStyle === "Semi-realistic" && "👤"}
                {character.artStyle === "Sketch" && "✏️"}
                {character.artStyle === "Stylized" && "🎨"}
                {!["Anime", "Cartoon", "Realistic", "Semi-realistic", "Sketch", "Stylized"].includes(character.artStyle) && "⭐"}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <h3 className="text-pink-300">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Art Style" value={character.artStyle} />
              <InfoItem label="Gender" value={character.gender} />
              <InfoItem label="Age Group" value={character.ageGroup} />
            </div>
          </div>

          {/* Personality */}
          <div className="glass-card p-4 rounded-2xl">
            <h3 className="text-pink-300 mb-3">Personality Traits</h3>
            <div className="flex flex-wrap gap-2">
              {character.personality.map((trait, index) => (
                <Badge 
                  key={index}
                  className="bg-pink-500/20 border border-pink-500/30 text-pink-300 hover:bg-pink-500/30"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>

          {/* Voice */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <h3 className="text-pink-300">Voice Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Voice Tone" value={character.voiceTone} />
              <InfoItem label="Accent" value={character.voiceAccent} />
            </div>
          </div>

          {/* Appearance */}
          {(character.hairColor || character.hairStyle || character.eyeColor || character.outfitStyle) && (
            <div className="glass-card p-4 rounded-2xl space-y-3">
              <h3 className="text-pink-300">Appearance</h3>
              <div className="grid grid-cols-2 gap-4">
                {character.hairColor && <InfoItem label="Hair Color" value={character.hairColor} />}
                {character.hairStyle && <InfoItem label="Hair Style" value={character.hairStyle} />}
                {character.eyeColor && <InfoItem label="Eye Color" value={character.eyeColor} />}
                {character.outfitStyle && <InfoItem label="Outfit Style" value={character.outfitStyle} />}
              </div>
            </div>
          )}

          {/* Backstory */}
          {character.backstory && (
            <div className="glass-card p-4 rounded-2xl">
              <h3 className="text-pink-300 mb-3">Backstory</h3>
              <p className="text-purple-200/80">{character.backstory}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-purple-200/60 text-sm mb-1">{label}</p>
      <p className="text-white capitalize">{value}</p>
    </div>
  );
}
