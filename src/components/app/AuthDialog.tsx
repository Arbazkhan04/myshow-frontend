import { Dialog, DialogContent } from "../ui/dialog";
import { AuthForm } from "./AuthForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: () => void;
}

export function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <AuthForm onSuccess={onAuthSuccess} />
      </DialogContent>
    </Dialog>
  );
}
