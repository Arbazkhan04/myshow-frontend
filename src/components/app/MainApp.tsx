import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CreateCharacter } from "./CreateCharacter";
import { MyCharacters } from "./MyCharacters";
import { Templates } from "./Templates";
import { ProfileMenu } from "./ProfileMenu";
import { Sparkles, Plus, Users, FileStack } from "lucide-react";
import { toast } from "sonner";

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

interface MainAppProps {
  userName: string;
  onLogout: () => void;
}

export function MainApp({ userName, onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState("create");
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Luna Starlight",
      artStyle: "Anime",
      gender: "female",
      ageGroup: "Teen",
      personality: ["Energetic", "Brave", "Playful"],
      voiceTone: "Cheerful",
      voiceAccent: "Neutral",
      hairColor: "Silver",
      hairStyle: "Long",
      eyeColor: "Blue",
      outfitStyle: "Fantasy",
      backstory: "A magical girl from another dimension on a quest to save her world.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    {
      id: "2",
      name: "Max Thunder",
      artStyle: "Cartoon",
      gender: "male",
      ageGroup: "Young Adult",
      personality: ["Confident", "Heroic", "Funny"],
      voiceTone: "Energetic",
      voiceAccent: "American",
      hairColor: "Black",
      hairStyle: "Spiky",
      eyeColor: "Green",
      outfitStyle: "Athletic",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    }
  ]);
  const [templates, setTemplates] = useState<Character[]>([]);

  const handleCharacterCreated = (characterData: any) => {
    // Generate random profile image
    const randomImages = [
      "https://images.unsplash.com/photo-1592849902530-cbabb686381d?w=400",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    ];
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    
    const newCharacter: Character = {
      id: Date.now().toString(),
      ...characterData,
      image: randomImage
    };
    setCharacters(prev => [...prev, newCharacter]);
    setActiveTab("characters");
  };

  const handleEdit = (character: Character) => {
    toast.info("Edit functionality would open a pre-filled form");
  };

  const handleDelete = (id: string) => {
    setCharacters(prev => prev.filter(c => c.id !== id));
    toast.success("Character deleted");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast.success("Template deleted");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/30 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center glow-effect">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="gradient-text">MyShow AI</h1>
              <p className="text-purple-200/60 text-sm">Character Studio</p>
            </div>
          </div>
          <ProfileMenu userName={userName} onLogout={onLogout} />
        </header>

        {/* Main Content */}
        <div className="glass-panel rounded-3xl p-8 max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass-card p-1.5 w-full max-w-2xl mx-auto mb-8 rounded-2xl border border-pink-500/30 h-auto">
              <TabsTrigger 
                value="create" 
                className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200 py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </TabsTrigger>
              <TabsTrigger 
                value="characters" 
                className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200 py-3"
              >
                <Users className="w-4 h-4 mr-2" />
                My Characters
              </TabsTrigger>
              <TabsTrigger 
                value="templates" 
                className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-purple-200 py-3"
              >
                <FileStack className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-6">
              <CreateCharacter onCharacterCreated={handleCharacterCreated} />
            </TabsContent>

            <TabsContent value="characters" className="mt-6">
              <MyCharacters 
                characters={characters}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <Templates 
                templates={templates}
                onEdit={handleEdit}
                onDelete={handleDeleteTemplate}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
