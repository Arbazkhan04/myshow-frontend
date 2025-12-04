import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GeneratingAnimation } from "./GeneratingAnimation";
import { Shuffle, ArrowRight, ArrowLeft, Check, Smile, Frown, Sparkles, Zap, Wind, Drama, User, Palette, Volume2, Eye, Shirt, BookOpen, Stars, LetterTextIcon } from "lucide-react";
import { toast } from "sonner";
import { IoMdFemale, IoMdMale, IoMdTransgender } from "react-icons/io";
import { IoIosColorPalette } from "react-icons/io";
import { VoiceSelector } from "@/pages/characters/create/character-voices-preview";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useCreateCharacterMutation } from "@/api/character";
import { useNavigate } from "react-router";
import { SimpleUploader } from "../common/file-uploader";

interface CharacterData {
  name: string;
  artStyle: string;
  gender: string;
  ageGroup: string;
  personality: string[];
  voiceTone: string;
  voiceAccent: string;
  hairColor: string;
  hairStyle: string;
  eyeColor: string;
  outfitStyle: string;
  backstory: string;
  skinTone: string;
  accessories: string[];
  selectedVoiceId: string;
  createcustomvoice: boolean;
}

interface CreateCharacterProps {
  onCharacterCreated: (character: any) => void;
}

const artStyles = [
  { name: "Anime", image: "/images/character-art-styles/anime.jpg" },
  { name: "Cartoon", image: "/images/character-art-styles/cartoon.jpeg" },
  { name: "Realistic", image: "/images/character-art-styles/real.PNG" },
  { name: "Fantasy", image: "/images/character-art-styles/fantasy.webp" },
  { name: "Sci-Fi", image: "/images/character-art-styles/sci-fi.jpg" },
  { name: "3D", image: "/images/character-art-styles/3d.jpg" }
];

const genders = [
  { value: "male", label: "Male", icon: IoMdMale, color: "bg-blue-500" },
  { value: "female", label: "Female", icon: IoMdFemale, color: "bg-pink-500" },
  { value: "non-binary", label: "Non-binary", icon: IoMdTransgender, color: "bg-violet-500" }
];

const ageGroups = [
  { label: "Child", value: "child" },
  { label: "Teen", value: "teen" },
  { label: "Young Adult", value: "youngAdult" },
  { label: "Adult", value: "adult" },
  { label: "Elderly", value: "elderly" },
];

const personalityTraits = [
  "Energetic", "Quirky", "Calm", "Playful", "Serious", "Mysterious",
  "Wise", "Shy", "Brave", "Confident", "Funny", "Heroic"
];

const voiceToneOptions = [
  { value: "cheerful", label: "Cheerful", icon: Smile },
  { value: "serious", label: "Serious", icon: Frown },
  { value: "mysterious", label: "Mysterious", icon: Sparkles },
  { value: "energetic", label: "Energetic", icon: Zap },
  { value: "calm", label: "Calm", icon: Wind },
  { value: "dramatic", label: "Dramatic", icon: Drama }
];

const voiceAccentOptions = [
  { value: "neutral", label: "Neutral" },
  { value: "american", label: "American" },
  { value: "british", label: "British" },
  { value: "australian", label: "Australian" }
];

const skinTones = ["Fair", "Light", "Medium", "Olive", "Tan", "Brown", "Dark"];
const hairColors = ["Black", "Brown", "Blonde", "Red", "Gray", "White", "Blue", "Pink", "Purple"];
const hairStyles = ["Long", "Short", "Curly", "Spiky", "Wavy", "Bald", "Ponytail", "Braided"];
const eyeColors = ["Brown", "Blue", "Green", "Gray", "Hazel", "Amber", "Violet"];
const outfitStyles = ["Casual", "Formal", "Athletic", "Fantasy", "Futuristic", "Vintage", "Urban"];
const accessoryOptions = ["Glasses", "Hat", "Jewelry", "Scarf", "Watch", "Tattoos", "Piercings", "Mask"];

export function CreateCharacter({ onCharacterCreated }: CreateCharacterProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const createdBy = user ? user._id : "dummy";
  const [step, setStep] = useState(1);
  const [createCharacter] = useCreateCharacterMutation();
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const [userGivenImage, setUserGivenImage] = useState("");
  const [characterData, setCharacterData] = useState<CharacterData>({
    name: "",
    artStyle: "",
    gender: "",
    ageGroup: "",
    personality: [],
    voiceTone: "",
    voiceAccent: "",
    hairColor: "",
    hairStyle: "",
    eyeColor: "",
    outfitStyle: "",
    backstory: "",
    skinTone: "",
    accessories: [],
    selectedVoiceId: "",
    createcustomvoice: true // Default to custom voice tab
  });

  const updateData = (field: keyof CharacterData, value: any) => {
    setCharacterData(prev => ({ ...prev, [field]: value }));
  };

  const togglePersonality = (trait: string) => {
    setCharacterData(prev => {
      const current = prev.personality;
      if (current.includes(trait)) {
        return { ...prev, personality: current.filter(t => t !== trait) };
      } else if (current.length < 5) {
        return { ...prev, personality: [...current, trait] };
      }
      return prev;
    });
  };

  const toggleAccessory = (accessory: string) => {
    setCharacterData(prev => {
      const current = prev.accessories;
      if (current.includes(accessory)) {
        return { ...prev, accessories: current.filter(a => a !== accessory) };
      } else {
        return { ...prev, accessories: [...current, accessory] };
      }
    });
  };

  const randomizeAppearance = () => {
    updateData("hairColor", hairColors[Math.floor(Math.random() * hairColors.length)]);
    updateData("hairStyle", hairStyles[Math.floor(Math.random() * hairStyles.length)]);
    updateData("eyeColor", eyeColors[Math.floor(Math.random() * eyeColors.length)]);
    updateData("outfitStyle", outfitStyles[Math.floor(Math.random() * outfitStyles.length)]);
    updateData("skinTone", skinTones[Math.floor(Math.random() * skinTones.length)]);
    toast.success("Appearance randomized!");
  };

  const formatCharacterData = (saveAsTemplate = false) => {
    const formattedData: any = {
      name: characterData.name,
      art_style: characterData.artStyle.toLowerCase(),
      gender: characterData.gender,
      age_group: characterData.ageGroup,
      personality_traits: characterData.personality,
      appearance: {
        hair_color: characterData.hairColor,
        hair_style: characterData.hairStyle,
        eye_color: characterData.eyeColor,
        skin_tone: characterData.skinTone,
        outfit: characterData.outfitStyle,
        accessories: characterData.accessories
      },
      backstory: characterData.backstory,
      created_by: createdBy,
      is_sample: false,
      is_premium: false,
      is_template: saveAsTemplate,
      createcustomvoice: characterData.createcustomvoice
    };

    // Add voice data conditionally
    if (characterData.createcustomvoice) {
      formattedData.voice_tone = characterData.voiceTone;
      formattedData.voice_accent = characterData.voiceAccent;
    } else {
      formattedData.characterVoice = characterData.selectedVoiceId;
    }

    return formattedData;
  };

  const handleGenerate = async (saveAsTemplate = false) => {
    setIsGenerating(true);
    
    // Format the data according to requirements
    let formattedData = formatCharacterData(saveAsTemplate);
    
    // Log the formatted data to console
    if (userGivenImage) {
      formattedData['userGivenImage'] = userGivenImage;
    }
    console.log(formattedData);
    const response = await createCharacter(formattedData);
    const rd = response.data as any;
    if (rd.success) {
      setIsGenerating(false);
      onCharacterCreated(formattedData);
      toast.success(rd.message || "Character saved successfully!");
      setCharacterData({
      name: "",
      artStyle: "",
      gender: "",
      ageGroup: "",
      personality: [],
      voiceTone: "",
      voiceAccent: "",
      hairColor: "",
      hairStyle: "",
      eyeColor: "",
      outfitStyle: "",
      backstory: "",
      skinTone: "",
      accessories: [],
      selectedVoiceId: "",
      createcustomvoice: true
    });
    setStep(1);
    navigate("/characters/my-characters");
    } else {
      setIsGenerating(false);
      toast.error(rd.message || "Failed to generate character");
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return characterData.name && characterData.artStyle && characterData.gender && characterData.ageGroup;
    }
    if (step === 2) {
      if (characterData.personality.length === 0) return false;
      
      if (characterData.createcustomvoice) {
        // Custom voice tab - require voice tone and accent
        return characterData.voiceTone && characterData.voiceAccent;
      } else {
        // Select voice tab - require voice ID
        return characterData.selectedVoiceId !== "";
      }
    }
    return true;
  };

  const progress = (step / 3) * 100;

  return (
    <>
      <GeneratingAnimation open={isGenerating} characterName={characterData.name || "Your Character"} />

      <div className="w-full p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Step {step} of 3</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="font-crimson-pro text-2xl font-bold mb-6">Character Details</h2>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Character Name
                </Label>
                <Input
                  value={characterData.name}
                  onChange={(e) => updateData("name", e.target.value)}
                  placeholder="Enter character name"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Your Image
                </Label>
                <SimpleUploader
                  value={userGivenImage}
                  setValue={setUserGivenImage}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Art Style
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {artStyles.map(style => (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => updateData("artStyle", style.name)}
                      className={`relative aspect-video rounded-lg border-2 overflow-hidden transition-all ${
                        characterData.artStyle === style.name
                          ? "border-white ring-2 ring-white/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${style.image})` }}
                      />
                      <div className={`absolute inset-0 ${
                        characterData.artStyle === style.name ? 'bg-black/20' : 'bg-black/40'
                      } flex items-center justify-center`}>
                        <span className={`font-medium ${
                          characterData.artStyle === style.name ? "text-white" : "text-white"
                        }`}>
                          {style.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <IoMdMale className="w-4 h-4" />
                  Gender
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {genders.map(gender => {
                    const IconComponent = gender.icon;
                    return (
                      <button
                        key={gender.value}
                        type="button"
                        onClick={() => updateData("gender", gender.value)}
                        className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                          characterData.gender === gender.value
                            ? "border-white " + gender.color
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <IconComponent className={`w-6 h-6 ${
                          characterData.gender === gender.value ? "text-white" : "text-muted-foreground"
                        }`} />
                        <span className={characterData.gender === gender.value ? "text-white" : "text-foreground"}>
                          {gender.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Age Group
                </Label>
                <Select value={characterData.ageGroup} onValueChange={(val) => updateData("ageGroup", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map(age => (
                      <SelectItem key={age.value} value={age.value}>{age.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="font-crimson-pro text-2xl font-bold mb-6">Personality & Voice</h2>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personality Traits (Select up to 5) - {characterData.personality.length}/5
                </Label>
                <div className="flex flex-wrap gap-2">
                  {personalityTraits.map(trait => (
                    <Badge
                      key={trait}
                      onClick={() => togglePersonality(trait)}
                      variant={characterData.personality.includes(trait) ? "default" : "secondary"}
                      className={`cursor-pointer ${
                        !characterData.personality.includes(trait) && characterData.personality.length >= 5
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <Tabs 
                value={characterData.createcustomvoice ? "custom" : "select"} 
                onValueChange={(value) => updateData("createcustomvoice", value === "custom")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="custom">Create Custom Voice</TabsTrigger>
                  <TabsTrigger value="select">Select Voice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="custom" className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Voice Tone
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {voiceToneOptions.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => updateData("voiceTone", value)}
                          className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                            characterData.voiceTone === value
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${
                            characterData.voiceTone === value ? "text-primary" : "text-muted-foreground"
                          }`} />
                          <span className={characterData.voiceTone === value ? "text-primary" : "text-foreground"}>
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Voice Accent
                    </Label>
                    <Select value={characterData.voiceAccent} onValueChange={(val) => updateData("voiceAccent", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select accent" />
                      </SelectTrigger>
                      <SelectContent>
                        {voiceAccentOptions.map(accent => (
                          <SelectItem key={accent.value} value={accent.value}>{accent.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="select" className="mt-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Select Voice
                    </Label>
                    <VoiceSelector
                      value={characterData.selectedVoiceId}
                      onChange={(value) => updateData("selectedVoiceId", value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-crimson-pro text-2xl font-bold">Appearance & Backstory</h2>
                <Button
                  onClick={randomizeAppearance}
                  variant="outline"
                  className="rounded-lg"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Randomize
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <IoIosColorPalette className="w-4 h-4" />
                    Hair Color
                  </Label>
                  <Input
                    value={characterData.hairColor}
                    onChange={(e) => updateData("hairColor", e.target.value)}
                    placeholder="e.g., Black, Red"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Stars className="w-4 h-4" />
                    Hair Style
                  </Label>
                  <Input
                    value={characterData.hairStyle}
                    onChange={(e) => updateData("hairStyle", e.target.value)}
                    placeholder="e.g., Spiky, Long"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Eye Color
                  </Label>
                  <Input
                    value={characterData.eyeColor}
                    onChange={(e) => updateData("eyeColor", e.target.value)}
                    placeholder="e.g., Blue, Green"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Skin Tone
                  </Label>
                  <Select value={characterData.skinTone} onValueChange={(val) => updateData("skinTone", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skin tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {skinTones.map(tone => (
                        <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Shirt className="w-4 h-4" />
                    Outfit Style
                  </Label>
                  <Input
                    value={characterData.outfitStyle}
                    onChange={(e) => updateData("outfitStyle", e.target.value)}
                    placeholder="e.g., Casual, Formal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Stars className="w-4 h-4" />
                  Accessories
                </Label>
                <div className="flex flex-wrap gap-2">
                  {accessoryOptions.map(accessory => (
                    <Badge
                      key={accessory}
                      onClick={() => toggleAccessory(accessory)}
                      variant={characterData.accessories.includes(accessory) ? "default" : "secondary"}
                      className="cursor-pointer"
                    >
                      {accessory}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Backstory (Optional)
                </Label>
                <Textarea
                  value={characterData.backstory}
                  onChange={(e) => updateData("backstory", e.target.value)}
                  className="rounded-lg min-h-32"
                  placeholder="Tell us about your character's story..."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="rounded-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="rounded-lg"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => handleGenerate(true)}
                disabled={isGenerating}
                variant="outline"
                className="rounded-lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
              <Button
                onClick={() => handleGenerate(false)}
                disabled={isGenerating}
                className="rounded-lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Generate Character
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}