"use client"

import { motion } from "framer-motion"
import { useGetCharactersByUserQuery, useDeleteCharacterMutation } from "@/api/character"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash2, Volume2 } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { VoicePreview } from "@/components/common/voice-preview"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Users } from "lucide-react"
import { useNavigate } from "react-router"

export function MyCharactersIndex() {
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user ? user._id : null;
    const navigate = useNavigate();

    const { data, isLoading } = useGetCharactersByUserQuery({ userId })
    const [deleteCharacter, { isLoading: isDeleting }] = useDeleteCharacterMutation()
    const [openChar, setOpenChar] = useState<any | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )

    const characters = data?.body?.body || []

if (!characters.length) {
  return (
    <Empty className="mt-24">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>No characters found</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first character.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => navigate("/characters/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Character
        </Button>
      </EmptyContent>
    </Empty>
  )
}

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        try {
            await deleteCharacter({ id }).unwrap()
            setOpenChar(null)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="p-6">
            {/* Hero Section */}
            <section className="w-full max-w-4xl mx-auto text-center px-4 mt-8 mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-[Crimson_Pro] tracking-tight">
                    My Characters
                </h1>
                <p className="text-muted-foreground text-base md:text-lg mt-4 leading-relaxed">
                    Your creative companions await — explore, manage, and bring to life the unique
                    personalities you've crafted with our AI character studio.
                </p>
            </section>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {characters.map((char) => (
                    <motion.div
                        key={char._id}
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                            "relative rounded-xl overflow-hidden cursor-pointer group",
                            "transition-all duration-300 shadow-md hover:shadow-xl border border-border/50",
                            "bg-background hover:border-primary/30"
                        )}
                        onClick={() => setOpenChar(char)}
                    >
                        {/* Character Image */}
                        <img
                            src={char.Image}
                            alt={char.name}
                            className="w-full aspect-[768/1344] object-contain bg-black/5"
                        />

                        {/* Name at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-0 from-70% from-black/80 to-transparent p-4">
                            <h2 className="text-lg font-semibold text-white text-center">{char.name}</h2>
                            <p className="text-sm text-gray-300 text-center capitalize mt-1">
                                {char.gender} • {char.art_style}
                            </p>
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* View Modal */}
            {openChar && (
                <Dialog open={!!openChar} onOpenChange={() => setOpenChar(null)}>
                    <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-hidden p-0 sm:max-w-3xl md:max-w-4xl">
                        <div className="flex flex-col md:flex-row w-full bg-background">
                            {/* Left side - Character Image */}
                            <div className="relative w-full md:w-[400px] xl:w-[520px] bg-black flex justify-center items-center min-h-[300px] md:min-h-[500px]">
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    src={openChar.Image}
                                    alt={openChar.name}
                                    className="max-h-[70vh] object-contain rounded-lg shadow-lg relative z-20"
                                />
                            </div>

                            {/* Right side - Details */}
                            <div className="w-full p-4 sm:p-6 md:p-8 flex flex-col justify-between max-h-[70vh] md:max-h-[90vh] overflow-y-auto">
                                <div>
                                    <DialogHeader className="text-left">
                                        <DialogTitle className="text-2xl sm:text-3xl font-crimson-pro mb-2">
                                            {openChar.name}
                                        </DialogTitle>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Created at {format(openChar.createdAt, "do MMM, yyyy")}
                                        </p>
                                    </DialogHeader>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="outline">{openChar.gender}</Badge>
                                        <Badge variant="outline">{openChar.age_group}</Badge>
                                        <Badge variant="outline">{openChar.art_style}</Badge>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mt-4 mb-1">Personality Traits</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {openChar.personality_traits.map((t: string, i: number) => (
                                                <Badge key={i} variant="secondary">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mt-4 mb-1">Backstory</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {openChar.backstory || "No backstory provided."}
                                        </p>
                                    </div>

                                    {openChar.characterVoice?.preview_url && (
                                        <div className="mt-4">
                                            <h3 className="font-medium flex items-center gap-2 mb-1">
                                                <Volume2 className="h-4 w-4" /> Voice Preview
                                            </h3>
                                            <VoicePreview src={openChar.characterVoice.preview_url} />
                                        </div>
                                    )}


                                    <div className="mt-4">
                                        <h3 className="font-medium mb-1">Appearance</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                                            <div>Hair: {openChar.appearance?.hair_color}</div>
                                            <div>Eyes: {openChar.appearance?.eye_color}</div>
                                            <div>Outfit: {openChar.appearance?.outfit}</div>
                                            <div>Skin: {openChar.appearance?.skin_tone}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <div className="flex justify-end mt-6">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" disabled={isDeleting && deletingId === openChar._id}>
                                                {isDeleting && deletingId === openChar._id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete Character
                                                    </>
                                                )}
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Character</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete{" "}
                                                    <strong>{openChar.name}</strong>?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(openChar._id)}
                                                    className="bg-destructive text-white hover:bg-destructive/90"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}