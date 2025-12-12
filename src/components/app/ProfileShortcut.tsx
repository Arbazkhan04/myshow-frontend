"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useGetUserByIdQuery } from "@/api/user"; // Import the necessary query
import {
  Button,
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Use Badge for role/plan tier
import { Skeleton } from "@/components/ui/skeleton"; // Use Skeleton for loading state
import { Separator } from "@/components/ui/separator"; // For visual breaks
import { useNavigate } from "react-router";
// import { RegisterForm } from "./RegisterForm" // Not used in this component
import { logout } from "@/store/auth-slice";
import { AuthForm } from "./AuthForm"; // Assuming this handles login
import { FiLogOut, FiSettings, FiZap, FiPackage, FiLogIn } from "react-icons/fi"; // Icons

// Custom Gradient Avatar component for the border effect
const GradientAvatar = ({ src, fallback }: { src: string, fallback: string }) => (
    <div
        // Tailwind utility classes for a vibrant gradient ring
        className="p-[3px] rounded-full bg-gradient-to-r from-primary to-secondary transition-all hover:scale-105"
    >
        <Avatar className="h-8 w-8 border-2 border-background">
            <AvatarImage src={src} alt="User Avatar" />
            <AvatarFallback className="bg-muted text-foreground font-semibold">
                {fallback}
            </AvatarFallback>
        </Avatar>
    </div>
);

export function ProfileShortcut() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Fetch detailed user profile only if logged in
  const userId = user?._id;
  const { data: profileData, isLoading: isProfileLoading } = useGetUserByIdQuery(
    { id: userId! },
    { skip: !userId } // Skip the query if userId is null/undefined
  );

  const profile = profileData?.body?.user;


  if (!user) {
    // Not logged in → show sign-in dialog
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-sm">
            <FiLogIn className="h-4 w-4 mr-2" /> Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-5xl lg:w-full p-0 overflow-hidden max-h-[90vh]">
          {/* Success callback closes the dialog */}
          <AuthForm onSuccess={() => document.documentElement.click()} />
        </DialogContent>
      </Dialog>
    );
  }

  // Logged in → show avatar with popover menu
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <GradientAvatar 
                src={profile?.profilePic || user.avatarUrl || ""} 
                fallback={user.name?.charAt(0)?.toUpperCase() ?? "U"}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3 shadow-2xl" align="end">
            {/* User Info Section */}
            <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.profilePic || user.avatarUrl || ""} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-base font-semibold truncate max-w-[160px]">{user.name}</div>
                    <Badge variant="outline" className="text-xs font-medium bg-muted/50">
                        {profile?.role || "User"}
                    </Badge>
                </div>
            </div>

            <p className="text-xs text-muted-foreground break-all mb-3 border-b pb-2">
                {user.email}
            </p>

            {/* Quick Stats Section */}
            <div className="space-y-2 mb-3">
                <h3 className="text-xs font-medium text-muted-foreground uppercase">Usage & Plan</h3>
                {isProfileLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/5" />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 font-medium">
                                <FiZap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" /> Tokens Left
                            </span>
                            <span className="font-bold text-lg">
                                {(profile?.tokensRemaining || 0) + (profile?.purchasedTokens || 0) ?? 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 font-medium">
                                <FiPackage className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Current Plan
                            </span>
                            <Badge variant="default" className="text-xs">
                                {profile?.currentPlan?.tier || "Basic"}
                            </Badge>
                        </div>
                    </>
                )}
            </div>

            <Separator className="my-2" />

            {/* Actions Section */}
            <div className="flex flex-col gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-sm"
                    onClick={() => navigate("/profile")}
                >
                    <FiSettings className="mr-2 h-4 w-4" /> Manage Profile
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-red-600 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    onClick={() => setLogoutDialogOpen(true)}
                >
                    <FiLogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
            </div>
        </PopoverContent>
      </Popover>

      {/* Logout confirmation dialog (Kept as is, it's functional and clean) */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            Are you sure you want to log out?
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setLogoutDialogOpen(false)
                dispatch(logout());
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}