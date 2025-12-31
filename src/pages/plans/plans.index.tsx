"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { useGetActivePlansQuery } from "@/api/plan";
import { useCreateSubscriptionCheckoutMutation } from "@/api/stripe";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Zap, ListOrdered, CheckCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Local objects instead of enums
// RESTORING ALL ORIGINAL TIERS (STARTER, CREATOR, PRO, AGENCY)
const PlanTiers = { STARTER: "STARTER", CREATOR: "CREATOR", PRO: "PRO", AGENCY: "AGENCY" } as const;
type PlanTier = keyof typeof PlanTiers | "ALL";

const PlanIntervals = { MONTHLY: "MONTHLY", ANNUAL: "ANNUAL" } as const;
type PlanInterval = keyof typeof PlanIntervals | "ALL";

// Define a type for your plan structure (based on your usage)
interface Plan {
  _id: string;
  name: string;
  tier: keyof typeof PlanTiers;
  interval: keyof typeof PlanIntervals;
  priceUSD: number;
  tokensPerPeriod: number;
  queuePriority: number;
  features: string[];
  description: string;
}

// Function to get a distinct badge style based on tier (using Shadcn colors)
const getTierBadgeVariant = (tier: keyof typeof PlanTiers): "default" | "secondary" | "outline" | "destructive" => {
  switch (tier) {
    case "STARTER":
      return "secondary";
    case "CREATOR":
      return "default";
    case "PRO":
      return "outline";
    case "AGENCY":
      return "destructive"; // Using a different variant for high tier
    default:
      return "secondary";
  }
};

export function PlansIndexPage() {
  // --- State and Hooks ---
  const { data, isLoading, isError } = useGetActivePlansQuery();
  const [createCheckout] = useCreateSubscriptionCheckoutMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const createdBy = user?._id || "dummy";

  // RESTORING TIER STATE AND INITIALIZING INTERVAL STATE
  const [selectedTier, setSelectedTier] = useState<PlanTier>("ALL");
  const [selectedInterval, setSelectedInterval] = useState<PlanInterval>("MONTHLY");
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  // --- Data Filtering and Loading States ---
  if (isLoading) {
    return (
      <div className="w-full h-full n flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-center text-lg font-medium text-muted-foreground">Loading subscription plans...</p>
      </div>
    );
  }
  // Handle error state
  if (isError || !data?.body?.plans) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-center mt-12 text-lg text-destructive">Failed to load plans. Please try again.</p>
      </div>
    );
  }

  // Filter plans based on state (selectedTier AND selectedInterval)
  const plans: Plan[] = (data.body.plans as Plan[]).filter(
    (plan) =>
      (selectedTier === "ALL" || plan.tier === selectedTier) &&
      (selectedInterval === "ALL" || plan.interval === selectedInterval)
  );

  // --- Handlers ---
  const handleSubscribe = async (planId: string) => {
    setLoadingPlanId(planId);
    try {
      const res: any = await createCheckout({ userId: createdBy, planId }).unwrap();

      const redirectUrl = res?.body?.url;

      if (redirectUrl) {
        // Redirect to Stripe Checkout
        window.location.href = redirectUrl;
      } else {
        console.error("Subscription response did not contain a URL:", res);
        alert("Failed to get checkout URL. Please try again.");
      }

    } catch (err) {
      console.error("Subscription error:", err);
      alert("An error occurred during subscription setup. Please check the console.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  // --- Render ---
  return (
    <div className="flex flex-col items-center w-full px-4 py-16 bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center mb-12">
        <h1 className="font-crimson-pro text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mt-3 leading-relaxed max-w-3xl mx-auto">
          Select the subscription that fits your needs. Adjust your tier and billing cycle below.
        </p>
      </section>

      {/* Filters (Restored both Tier and Interval filters) */}
      <div className="w-full max-w-5xl mb-12 flex flex-col gap-6 items-center">
        {/* Tier Filter */}
        <div className="w-full sm:w-auto">
          <Tabs value={selectedTier} onValueChange={(val) => setSelectedTier(val as PlanTier)} className="w-full">
            <TabsList className="bg-muted p-1 rounded-lg shadow-sm grid grid-cols-5 md:flex md:w-auto">
              <TabsTrigger value="ALL" className="py-2 px-4 text-sm whitespace-nowrap">All Tiers</TabsTrigger>
              {Object.keys(PlanTiers).map((tier) => (
                <TabsTrigger key={tier} value={tier} className="py-2 px-4 text-sm whitespace-nowrap">
                  {tier.charAt(0) + tier.slice(1).toLowerCase()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Interval Filter */}
        <div className="w-full sm:w-auto">
          <Tabs value={selectedInterval} onValueChange={(val) => setSelectedInterval(val as PlanInterval)} className="w-full">
            <TabsList className="bg-muted p-1 rounded-lg shadow-sm grid grid-cols-3 md:flex md:w-auto">
              <TabsTrigger value="ALL" className="py-2 px-4 text-sm whitespace-nowrap">Both</TabsTrigger>
              {Object.keys(PlanIntervals).map((interval) => (
                <TabsTrigger
                  key={interval}
                  value={interval}
                  className="py-2 px-4 text-sm whitespace-nowrap"
                >
                  {interval === "ANNUAL" ? "Annual" : "Monthly"}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Plan Cards (3 Columns Max) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.length > 0 ? (
          plans.map((plan) => {
            const isSubscribing = loadingPlanId === plan._id;
            const priceDisplay = plan.priceUSD === 0 ? "Free" : `$${plan.priceUSD}`;
            const intervalText = plan.interval === PlanIntervals.ANNUAL ? "/ year" : "/ month";
            const isFeatured = plan.tier === "PRO" || plan.tier === "CREATOR"; // Highlight middle tiers

            return (
              <Card
                key={plan._id}
                className={`flex flex-col justify-between p-6 h-full transition-all duration-300 ${isFeatured ? 'border-primary shadow-lg ring-2 ring-primary/50' : 'border-border hover:shadow-md'}`}
              >
                <CardHeader className="p-0 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-bold text-foreground">
                      {plan.name}
                    </CardTitle>
                    <Badge variant={getTierBadgeVariant(plan.tier)} className="text-xs font-semibold uppercase">
                      {plan.tier}
                    </Badge>
                  </div>

                  <CardDescription className="text-muted-foreground min-h-[40px]">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-6 flex-grow">
                  {/* Price */}
                  <div className="border-b pb-4 border-border/70">
                    <div className="text-5xl font-extrabold text-foreground">
                      {priceDisplay}
                      <span className="text-base font-medium text-muted-foreground">
                        {plan.priceUSD > 0 && intervalText}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Tokens */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-medium text-sm text-foreground">
                        <Zap className="w-4 h-4 mr-2 text-primary" />
                        Tokens
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        {plan.tokensPerPeriod.toLocaleString()}
                      </span>
                    </div>

                    {/* Queue Priority */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-medium text-sm text-foreground">
                        <ListOrdered className="w-4 h-4 mr-2 text-primary" />
                        Queue Priority
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        Level {plan.queuePriority}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mt-4 text-sm text-foreground/80">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <div className="pt-6 mt-6 border-t border-border">
                  <Button
                    onClick={() => handleSubscribe(plan._id)}
                    disabled={isSubscribing}
                    className="w-full py-3 text-lg font-semibold"
                    variant={isFeatured ? "default" : "secondary"}
                  >
                    {isSubscribing ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </div>
                    ) : (
                      "Subscribe Now"
                    )}
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground col-span-full mt-8 text-xl">
            No plans found for the selected filters. Please adjust the tier or interval.
          </p>
        )}
      </div>
    </div>
  );
}