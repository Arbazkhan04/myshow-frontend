"use client";

import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/api/user";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator"; // Added Separator for visual break
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Assuming this component is available and functional
import { SimpleUploader } from "@/components/common/file-uploader";

import {
  FiMail,
  FiShield,
  FiZap,
  FiCalendar,
  FiEdit,
  FiSave,
  FiLogIn,
  FiPackage,
  FiUser, // Added for gender/full name field icons
  FiClock, // Added for interval
} from "react-icons/fi";

/* ✅ Date Formatter */
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  })}`;
}

export function ProfileIndex() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const createdBy = user?._id;

  if (!createdBy) {
  return (
    <div className="h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-0 rounded-xl shadow-lg border-2 border-dashed border-primary/30">
        <FiShield className="mx-auto h-10 w-10 text-primary animate-pulse" />
        <CardTitle className="text-2xl font-bold">Access Restricted</CardTitle>
        <p className="text-base text-muted-foreground">
          This profile page requires authentication.
        </p>
        <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
            <p className="font-medium text-sm text-foreground/80 dark:text-primary-foreground/90">
                Please click on the Sign In button in the top-right corner
                to log in or create an account.
            </p>
        </div>
      </Card>
    </div>
  );
}

  const { data, isLoading, error } = useGetUserByIdQuery({ id: createdBy });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const profile = data?.body?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setGender(profile.gender || "");
      setProfilePic(profile.profilePic || "");
    }
  }, [profile]);

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  // Handle Error/No Profile State
  if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;

  /* ✅ REAL UPDATE HANDLER */
  const handleSave = async () => {
    const payload = {
      fullName,
      gender,
      profilePic, // ✅ URL from SimpleUploader
    };

    console.log("PUT PAYLOAD →", payload);

    try {
        await updateUser({
            path: { id: createdBy },
            body: payload,
        }).unwrap();
        setIsEditing(false);
    } catch (err) {
        // Handle error notification here
        console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10">
      
      {/* 🌟 PROFILE HEADER & EDIT/SAVE */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-primary/20">
              {profilePic ? (
                <AvatarImage src={profilePic} alt={profile.fullName} />
              ) : (
                <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                  {profile.fullName?.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            {isEditing && (
              <div className="absolute -bottom-2 -right-2">
                 {/* This uploader will update the profilePic state */}
                <SimpleUploader
                  value={""}
                  setValue={setProfilePic}
                  showPreview={false}
                  // Styling the button for the uploader to be subtle and fit the theme
                  buttonComponent={
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full h-8 w-8 bg-accent text-accent-foreground hover:bg-accent/80 shadow-md"
                    >
                      <FiEdit className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {profile.fullName}
            </h1>
            <p className="flex items-center text-muted-foreground gap-2">
              <FiMail className="h-4 w-4" />
              {profile.email}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="secondary">
                <FiShield className="mr-1 h-3 w-3" />
                {profile.role}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-dashed">
                <FiCalendar className="mr-1 h-3 w-3" />
                Joined {formatDate(profile.createdAt)}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* EDIT/SAVE BUTTON */}
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full sm:w-auto mt-4 sm:mt-0">
            <FiEdit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        ) : (
          <Button onClick={handleSave} disabled={isUpdating} className="w-full sm:w-auto mt-4 sm:mt-0">
            <FiSave className="mr-2 h-4 w-4" /> {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        )}
      </div>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Token Card */}
        {typeof profile.tokensRemaining === "number" && (
          <Card className="shadow-lg border-l-4 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Remaining Tokens
              </CardTitle>
              <FiZap className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(profile.tokensRemaining || 0) + (profile.purchasedTokens || 0)}</div>
              <p className="text-xs text-muted-foreground">
                {typeof profile.tokensRemaining === "number" && `${profile.tokensRemaining} credit and `}
                {typeof profile.purchasedTokens === "number" && `${profile.purchasedTokens} additional`}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Plan Card */}
        {profile.currentPlan && (
            <Card className="shadow-lg border-l-4 border-secondary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Current Plan
                </CardTitle>
                <FiPackage className="h-5 w-5 text-secondary" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{profile.currentPlan.name}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                    ${profile.currentPlan.priceUSD} / <FiClock className="h-3 w-3" /> {profile.currentPlan.interval}
                </p>
                </CardContent>
            </Card>
        )}

        {/* Action Card - Upgrade Plan */}
        <Card className="shadow-lg border-l-4 border-accent hidden lg:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Need More Features?
                </CardTitle>
                <FiZap className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
                <Button onClick={() => navigate("/subscription/plans")} size="sm" className="w-full">
                    View Subscription Plans
                </Button>
                <p className="text-xs text-muted-foreground pt-1">
                    Upgrade for more features and tokens.
                </p>
            </CardContent>
        </Card>
      </div>

      {/* 👤 CORE DETAILS & EDITABLE FIELDS */}
      <Card className="rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            View and manage your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <FiUser className="h-4 w-4" /> Full Name
            </label>
            {isEditing ? (
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full"
              />
            ) : (
              <p className="text-lg font-semibold">{profile.fullName}</p>
            )}
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <FiUser className="h-4 w-4" /> Gender
            </label>
            {isEditing ? (
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-lg font-semibold capitalize">
                {profile.gender || "Not specified"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 📦 CURRENT PLAN DETAILS */}
      {profile.currentPlan && (
        <Card className="rounded-xl shadow-md border-2 border-dashed border-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FiPackage className="h-5 w-5 text-secondary" />
                Subscription Plan Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xl font-bold">
                        {profile.currentPlan.name}
                    </p>
                    <Badge variant="default" className="mt-1 text-xs">
                        {profile.currentPlan.tier} Tier
                    </Badge>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-extrabold text-primary">
                        ${profile.currentPlan.priceUSD}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        /{profile.currentPlan.interval}
                    </p>
                </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {profile.currentPlan.description}
            </p>

            <Separator />

            <div className="space-y-2">
                <p className="text-sm font-medium">Included Features:</p>
                <div className="flex flex-wrap gap-2">
                    {profile.currentPlan.features.map((f: string) => (
                        <Badge key={f} variant="outline" className="bg-muted text-muted-foreground">
                            {f}
                        </Badge>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 🎯 ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Upgrade Plan */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
            <CardDescription>
                Unlock premium features and get more tokens monthly.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => navigate("/subscription/plans")}
            >
              View Plans
            </Button>
          </CardFooter>
        </Card>

        {/* Buy Tokens */}
        <Card className="border-2 border-secondary/20">
          <CardHeader>
            <CardTitle>Top Up Tokens</CardTitle>
            <CardDescription>
                Purchase one-time token packs for additional usage.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => navigate("/subscription/token-packs")}
            >
              Buy Token Packs
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}