import { CreateVideo } from "./CreateVideo";

export default function CreateVideoIndex() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center px-4 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold font-[Crimson_Pro] tracking-tight">
          Create Your Video
        </h1>

        <p className="text-muted-foreground text-base md:text-lg mt-4 leading-relaxed">
          Craft immersive AI-generated videos with expressive characters, cinematic storytelling,
          and high-quality visuals. Your imagination becomes motion.
        </p>
      </section>

      {/* Form Section */}
      <div className="px-4 w-full max-w-4xl mt-16 rounded-xl flex items-center justify-center">
        <CreateVideo />
      </div>
    </div>
  );
}
