"use client"

import * as React from "react"
import { useRef, useState } from "react"
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
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex flex-col lg:flex-row w-full bg-background text-foreground max-h-[90vh] overflow-hidden">
      {/* Carousel Section - Hidden on mobile, visible from md up */}
      <div className="hidden lg:block relative w-full lg:w-1/2 h-[240px] lg:h-auto overflow-hidden">
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

      {/* Form Section */}
      <div className={`flex flex-col justify-start w-full lg:w-1/2 px-6 lg:px-16 py-8 lg:py-10 max-h-[512px] overflow-y-auto`}>
        <div className="max-w-md w-full my-auto mx-auto">
          <h1 className="text-3xl font-crimson-pro lg:text-4xl font-semibold mb-6 text-center">
            Welcome to our platform
          </h1>

          {/* Mobile View - Single Form with Toggle */}
          <div className="lg:hidden">
            {isLogin ? (
              <div className="space-y-6">
                <LoginForm onSuccess={onSuccess} />
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-primary font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <RegisterForm onSuccess={onSuccess} />
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-primary font-medium hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop View - Tabs */}
          <div className="hidden lg:block">
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
    </div>
  )
}