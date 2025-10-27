import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sparkles, Mail } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (userName: string) => void;
}

export function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const userName = isLogin ? email.split('@')[0] : name;
    onAuthSuccess(userName || "User");
  };

  const handleGoogleSignIn = () => {
    onAuthSuccess("Google User");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-panel border-2 border-pink-500/30 rounded-3xl p-8 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center glow-effect">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="gradient-text">{isLogin ? "Welcome Back" : "Join MyShow AI"}</h2>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-card border-pink-500/30 text-white placeholder:text-purple-300/50 rounded-xl"
                placeholder="Enter your name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-200">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-card border-pink-500/30 text-white placeholder:text-purple-300/50 rounded-xl"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-200">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-card border-pink-500/30 text-white placeholder:text-purple-300/50 rounded-xl"
              placeholder="••••••••"
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl py-6"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-500/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-black text-purple-300/70">or</span>
            </div>
          </div>

          <Button 
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full glass-card border-pink-500/30 text-white hover:bg-pink-500/10 rounded-xl py-6"
          >
            <Mail className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>

          <p className="text-center text-purple-200/70 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-400 hover:text-pink-300 underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
