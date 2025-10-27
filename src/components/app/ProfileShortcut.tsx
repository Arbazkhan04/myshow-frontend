import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import {
  Button,
} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useNavigate } from "react-router"
import { RegisterForm } from "./RegisterForm"
import { logout } from "@/store/auth-slice"
import { AuthForm } from "./AuthForm"

export function ProfileShortcut() {
  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  if (!user) {
    // Not logged in → show sign-in dialog
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-sm">
            Sign in
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:max-w-5xl lg:w-full p-0 overflow-hidden max-h-[90vh]">
          <AuthForm onSuccess={() => { }} />
        </DialogContent>

      </Dialog>
    )
  }

  // Logged in → show avatar with popover menu
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3" align="end">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground break-all">
              {user.email}
            </div>

            <div className="border-t my-2" />

            <Button
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => navigate("/profile")}
            >
              Settings
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-red-600 hover:text-red-700"
              onClick={() => setLogoutDialogOpen(true)}
            >
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Logout confirmation dialog */}
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
              }}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
