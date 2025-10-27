"use client"

import * as React from "react"
import { useRef } from "react"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import * as Tabs from "@radix-ui/react-tabs"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

interface AuthFormProps {
  onSuccess: () => void
}

const carouselItems = [
  {
    image: "/images/sign-in/1.png",
    caption: "Create stories with the power of imagination.",
  },
  {
    image: "/images/sign-in/2.png",
    caption: "Turn your ideas into living characters.",
  },
  {
    image: "/images/sign-in/3.png",
    caption: "Experience storytelling redefined by AI.",
  },
  {
    image: "/images/sign-in/4.png",
    caption: "Experience storytelling redefined by AI.",
  },
]

export function AuthForm({ onSuccess }: AuthFormProps) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <div className="flex flex-col md:flex-row w-full bg-background text-foreground max-h-[90vh] overflow-hidden">
      {/* Left Carousel Section */}
      <div className="relative w-full md:w-1/2 h-[240px] md:h-auto overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Right Tabs Section */}
      <div className={`flex flex-col justify-start w-full md:w-1/2 px-6 md:px-16 py-10 max-h-[512px] overflow-y-auto`}>
        <div className="max-w-md w-full my-auto">
          <h1 className="text-3xl md:text-4xl font-crimson-pro font-semibold mb-6 text-center">
            Welcome
          </h1>

          <Tabs.Root defaultValue="login" className="w-full">
            <Tabs.List className="flex border-b mb-6">
              <Tabs.Trigger
                value="login"
                className={cn(
                  "flex-1 py-2 text-center text-sm font-medium border-b-2 border-transparent transition-all",
                  "data-[state=active]:border-primary data-[state=active]:text-primary"
                )}
              >
                Log In
              </Tabs.Trigger>
              <Tabs.Trigger
                value="register"
                className={cn(
                  "flex-1 py-2 text-center text-sm font-medium border-b-2 border-transparent transition-all",
                  "data-[state=active]:border-primary data-[state=active]:text-primary"
                )}
              >
                Create Account
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content
              value="login"
              className="animate-in fade-in-50"
            >
              <LoginForm onSuccess={onSuccess} />
            </Tabs.Content>

            <Tabs.Content
              value="register"
              className="animate-in fade-in-50"
            >
              <RegisterForm onSuccess={onSuccess} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  )
}
