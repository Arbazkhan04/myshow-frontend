import { useState } from "react";
import { CharacterCard } from "./CharacterCard";
import { CharacterDetailDialog } from "./CharacterDetailDialog";
import { FileStack } from "lucide-react";

interface Template {
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

interface TemplatesProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
}

export function Templates({ templates, onEdit, onDelete }: TemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleView = (template: Template) => {
    setSelectedTemplate(template);
    setDetailDialogOpen(true);
  };

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center mb-6 border border-pink-500/30">
          <FileStack className="w-12 h-12 text-pink-400" />
        </div>
        <h3 className="text-white mb-2">No Templates Saved</h3>
        <p className="text-purple-200/70 text-center max-w-md">
          Save your favorite character designs as templates for quick reuse. Create a character and click "Save as Template".
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <CharacterCard
            key={template.id}
            character={template}
            onView={handleView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <CharacterDetailDialog
        character={selectedTemplate}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </>
  );
}
