import { Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { ImageWithFallback } from "./ImageWithFallback";

interface Character {
  id: string;
  name: string;
  artStyle: string;
  ageGroup: string;
  personality: string[];
  image?: string;
}

interface CharacterCardProps {
  character: Character;
  onView: (character: Character) => void;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

export function CharacterCard({ character, onView, onEdit, onDelete }: CharacterCardProps) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:scale-105 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
      <div 
        className="h-48 bg-gradient-to-br from-pink-500/40 to-purple-600/40 flex items-center justify-center cursor-pointer hover:from-pink-500/50 hover:to-purple-600/50 transition-all relative overflow-hidden group"
        onClick={() => onView(character)}
      >
        <ImageWithFallback 
          src={character.image || "https://images.unsplash.com/photo-1592849902530-cbabb686381d?w=400"} 
          alt={character.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="text-white mb-1">{character.name}</h3>
        <p className="text-purple-200/70 mb-1">{character.artStyle}</p>
        <p className="text-purple-200/60 mb-3">{character.ageGroup}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {character.personality.slice(0, 3).map((trait, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs"
            >
              {trait}
            </span>
          ))}
          {character.personality.length > 3 && (
            <span className="px-2 py-1 text-purple-300/70 text-xs">
              +{character.personality.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onView(character)}
            size="sm"
            variant="outline"
            className="flex-1 border-pink-500/30 text-pink-300 hover:bg-pink-500/10 rounded-xl"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            onClick={() => onEdit(character)}
            size="sm"
            variant="outline"
            className="border-pink-500/30 text-pink-300 hover:bg-pink-500/10 rounded-xl"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass-panel border-pink-500/30 rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Delete Character</AlertDialogTitle>
                <AlertDialogDescription className="text-purple-200/70">
                  Are you sure you want to delete "{character.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="glass-card border-pink-500/30 text-white hover:bg-pink-500/10 rounded-xl">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(character.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
