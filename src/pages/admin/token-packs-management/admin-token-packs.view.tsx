"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { TokenPack } from "./admin-token-packs.index";

type Props = {
  tokenPack: TokenPack;
  onClose: () => void;
};

export function ViewTokenPackDialog({ tokenPack, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Token Pack Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* Name & Status */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{tokenPack.name}</h2>
            <Badge variant={tokenPack.isActive ? "default" : "destructive"}>
              {tokenPack.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4">
            <Info label="Tokens" value={tokenPack.tokens} />
            <Info label="Price" value={`$${tokenPack.priceUSD}`} />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="font-medium">Description</p>
            <p className="text-muted-foreground">
              {tokenPack.description || "No description provided."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
