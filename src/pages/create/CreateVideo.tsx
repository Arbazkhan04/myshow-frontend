import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import EpisodeForm from "@/components/app/EpisodeForm";
import { Video, User, Zap, LayoutGrid, LogIn, PlusCircle } from "lucide-react";

// Helper component for feature list
const FeatureItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
    // Content styling (sits above the layout's background)
    <div className="flex items-start space-x-3 p-4 bg-card/70 backdrop-blur-md rounded-lg border border-border/50 shadow-md transition-all hover:border-primary/50 hover:shadow-lg">
        <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-foreground">{text}</p>
    </div>
);

export function CreateVideo() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return (
            // This entire structure will be rendered inside the Z-10 content container of CenteredFormLayout
            <div className="flex flex-col items-center justify-center p-4 sm:p-8">
                
                {/* Header Section */}
                <div className="text-center max-w-2xl mb-12">
                    <Video className="h-16 w-16 text-primary mb-6 mx-auto animate-in fade-in zoom-in" style={{ animationDuration: '0.8s' }} />
                    <p className="text-muted-foreground mt-4 text-lg">
                        Log in or create an account to start generating cinematic episodes with custom characters and advanced tools.
                    </p>
                </div>

                {/* Feature Grid (Now sits beautifully above your animated background) */}
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <FeatureItem 
                        icon={User} 
                        text="Access your personal, custom character library and character voice profiles." 
                    />
                    <FeatureItem 
                        icon={Zap} 
                        text="Generate high-quality videos instantly using advanced AI lipsync modes." 
                    />
                    <FeatureItem 
                        icon={LayoutGrid} 
                        text="Optimized desktop form for quick selection of styles, resolution, and modes." 
                    />
                    <FeatureItem 
                        icon={Video} 
                        text="Choose from multiple Art Styles (Anime, Sci-Fi, Realistic) and Resolutions (up to 1080P)." 
                    />
                </div>
            </div>
        );
    }

    // Original Component Render (User is logged in)
    return (
        <div className="w-full">
            <EpisodeForm />
        </div>
    );
}