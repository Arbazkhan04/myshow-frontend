"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
// Assuming the API hooks and types are available in the following imports:
import { type RootState } from "@/store/store";
import { useGetAllTokenPacksQuery } from "@/api/tokenPack"; // Placeholder for the actual query hook
import { useCreateTokenPackCheckoutMutation } from "@/api/stripe"; // Placeholder for the actual mutation hook
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, ListOrdered, CheckCircle, Loader2, ShoppingBag } from "lucide-react"; // Added ShoppingBag icon
import { Badge } from "@/components/ui/badge";

// Define a type for your token pack structure
interface TokenPack {
  _id: string;
  name: string;
  tokens: number;
  priceUSD: number;
  isActive: boolean;
  description: string;
}

// Function to get a distinct badge style based on token count
const getTokenCountBadgeVariant = (tokens: number): "default" | "secondary" | "outline" | "destructive" => {
  if (tokens >= 500) return "destructive"; // High tier
  if (tokens >= 250) return "default"; // Medium tier
  if (tokens >= 100) return "secondary"; // Small tier
  return "outline";
};

/**
 * Renders the page for displaying and purchasing one-time token packs.
 * This is similar to the PlansIndexPage but for non-subscription, one-time purchases.
 */
export function TokenPacksIndexPage() {
  // --- State and Hooks ---
  // Using the provided query hook (simulated import path)
  const { data, isLoading, isError } = useGetAllTokenPacksQuery(); 
  // Using the provided mutation hook (simulated import path)
  const [createCheckout] = useCreateTokenPackCheckoutMutation(); 
  
  const user = useSelector((state: RootState) => state.auth.user);
  const createdBy = user?._id || "dummy"; // Fallback to 'dummy' if user is not loaded

  const [loadingPackId, setLoadingPackId] = useState<string | null>(null);

  // --- Data Filtering and Loading States ---
  if (isLoading) return <p className="text-center mt-12 text-lg font-medium text-muted-foreground">Loading token packs...</p>;
  if (isError || !data?.body?.tokenPacks) return <p className="text-center mt-12 text-lg text-destructive">Failed to load token packs. Please try again.</p>;

  // Filter only active token packs
  const tokenPacks: TokenPack[] = (data.body.tokenPacks as TokenPack[])
    .filter((pack) => pack.isActive)
    // Optional: Sort by token count or price for better presentation
    .sort((a, b) => a.tokens - b.tokens);

  // --- Handlers ---
  const handleBuyPack = async (tokenPackId: string) => {
    setLoadingPackId(tokenPackId);
    try {
      // Using the provided mutation and request body structure
      const res: any = await createCheckout({ userId: createdBy, tokenPackId }).unwrap(); 
      
      const redirectUrl = res?.body?.url;

      if (redirectUrl) {
        // Redirect to Stripe Checkout
        window.location.href = redirectUrl;
      } else {
        console.error("Token Pack Checkout response did not contain a URL:", res);
        alert("Failed to get checkout URL. Please try again.");
      }

    } catch (err) {
      console.error("Token Pack Checkout error:", err);
      alert("An error occurred during purchase setup. Please check the console.");
    } finally {
      setLoadingPackId(null);
    }
  };

  // --- Render ---
  return (
    <div className="flex flex-col items-center w-full px-4 py-16 bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-5xl text-center mb-12">
        <h1 className="font-crimson-pro text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Purchase One-Time Token Packs
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mt-3 leading-relaxed max-w-3xl mx-auto">
          Need extra tokens? Top up your balance anytime with a one-time token pack purchase.
        </p>
      </section>

      {/* Token Pack Cards (3 Columns Max) */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tokenPacks.length > 0 ? (
          tokenPacks.map((pack) => {
            const isBuying = loadingPackId === pack._id;
            const priceDisplay = `$${pack.priceUSD}`;
            // Determine if this pack is 'featured' (e.g., the most popular or best value)
            // Assuming the pack with tokens >= 250 is featured for this example
            const isFeatured = pack.tokens >= 250 && pack.tokens < 500; 

            return (
              <Card 
                key={pack._id} 
                className={`flex flex-col justify-between p-6 h-full transition-all duration-300 ${isFeatured ? 'border-primary shadow-lg ring-2 ring-primary/50' : 'border-border hover:shadow-md'}`}
              >
                <CardHeader className="p-0 mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold text-foreground">
                            {pack.name}
                        </CardTitle>
                        <Badge variant={getTokenCountBadgeVariant(pack.tokens)} className="text-xs font-semibold uppercase">
                            Pack
                        </Badge>
                    </div>
                  
                  <CardDescription className="text-muted-foreground min-h-[40px]">
                    {pack.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 space-y-6 flex-grow">
                  {/* Price */}
                  <div className="border-b pb-4 border-border/70">
                      <div className="text-5xl font-extrabold text-foreground">
                          {priceDisplay}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">One-time purchase</p>
                  </div>

                  <div className="space-y-4">
                    {/* Tokens */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-medium text-sm text-foreground">
                        <Zap className="w-4 h-4 mr-2 text-primary" />
                        Tokens Included
                      </span>
                      <span className="font-semibold text-2xl text-primary">
                        {pack.tokens.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Feature/Benefit: Instant Access */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-medium text-sm text-foreground">
                        <ShoppingBag className="w-4 h-4 mr-2 text-primary" />
                        Usage
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        Pay-As-You-Go
                      </span>
                    </div>

                    {/* Feature/Benefit: Never Expire (Example feature) */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center font-medium text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Tokens Expire
                      </span>
                      <span className="font-semibold text-lg text-green-500">
                        Never
                      </span>
                    </div>
                  </div>
                </CardContent>

                <div className="pt-6 mt-6 border-t border-border">
                  <Button 
                    onClick={() => handleBuyPack(pack._id)} 
                    disabled={isBuying}
                    className="w-full py-3 text-lg font-semibold"
                    variant={isFeatured ? "default" : "secondary"}
                  >
                    {isBuying ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </div>
                    ) : (
                      "Buy Pack"
                    )}
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <p className="text-center text-muted-foreground col-span-full mt-8 text-xl">
            No token packs are currently available for purchase.
          </p>
        )}
      </div>
    </div>
  );
}