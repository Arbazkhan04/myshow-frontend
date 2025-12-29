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
      <DialogContent className="lg:max-w-5xl lg:w-full p-0 overflow-hidden max-h-[90vh]">
        <AuthForm onSuccess={onAuthSuccess} />
      </DialogContent>
    </Dialog>
  );
}
