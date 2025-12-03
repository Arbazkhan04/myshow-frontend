"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeletePlanMutation } from "@/api/plan";

type Props = {
  id: string;
  onClose: () => void;
};

export function DeletePlanDialog({ id, onClose }: Props) {
  const [deletePlan, { isLoading }] = useDeletePlanMutation();

  const handleDelete = async () => {
    await deletePlan({ id }).unwrap();
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Plan</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to permanently delete this plan?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
