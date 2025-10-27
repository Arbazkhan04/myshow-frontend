import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

interface ProfileMenuProps {
  userName: string;
  onLogout: () => void;
}

export function ProfileMenu({ userName, onLogout }: ProfileMenuProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState("user@example.com");

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setEditDialogOpen(false);
  };

  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <Avatar className="w-10 h-10 border-2 border-pink-500/50 hover:border-pink-500 transition-colors cursor-pointer">
              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="glass-panel border-pink-500/30 w-56 rounded-2xl p-2"
          align="end"
        >
          <div className="px-3 py-2 mb-2">
            <p className="text-white">{userName}</p>
            <p className="text-purple-200/60 text-sm">{email}</p>
          </div>
          <DropdownMenuSeparator className="bg-pink-500/20" />
          <DropdownMenuItem 
            onClick={() => setEditDialogOpen(true)}
            className="text-purple-200 hover:bg-pink-500/10 hover:text-white rounded-xl cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={onLogout}
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="glass-panel border-2 border-pink-500/30 rounded-3xl p-8 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
              </div>
              <h2 className="gradient-text">Edit Profile</h2>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-purple-200">Name</Label>
              <Input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-card border-pink-500/30 text-white placeholder:text-purple-300/50 rounded-xl"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email" className="text-purple-200">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-card border-pink-500/30 text-white placeholder:text-purple-300/50 rounded-xl"
                placeholder="your@email.com"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setEditDialogOpen(false)}
                variant="outline"
                className="flex-1 glass-card border-pink-500/30 text-white hover:bg-pink-500/10 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
