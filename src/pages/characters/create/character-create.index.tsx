import { CreateCharacter } from "@/components/app/CreateCharacter";
import { DemoForm } from "./dummy";

export function CreateCharacterIndex() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center px-4 mt-12">
        <h1
          className="text-4xl md:text-6xl font-bold font-[Crimson_Pro] tracking-tight"
        >
          Create Your Character
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mt-4 leading-relaxed">
          Bring your imagination to life — generate unique personas with rich personalities,
          authentic voices, and expressive styles. Our AI-powered character studio gives you
          full control to design the stars of your stories effortlessly.
        </p>
      </section>

      {/* Banner */}
      <div className="w-full mt-10 relative">
        <img
          src="/images/characters-banner.jpg"
          alt="Character banner"
          className="w-full max-h-[300px] opacity-80 object-cover object-center shadow-md"
        />
      </div>

      {/* Placeholder Box */}
      <div className="w-full max-w-4xl mt-16 border border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center text-muted-foreground">
        <CreateCharacter onCharacterCreated={() => {}} />
      </div>
    </div>
  );
}
