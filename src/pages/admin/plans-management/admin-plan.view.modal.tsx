"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { type Plan } from "./admin-plan.index";

type Props = {
  plan: Plan;
  onClose: () => void;
};

export function ViewPlanDialog({ plan, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Plan Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          {/* Name & Status */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <Badge variant={plan.isActive ? "default" : "destructive"}>
              {plan.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4">
            <Info label="Tier" value={plan.tier} />
            <Info label="Interval" value={plan.interval} />
            <Info label="Price" value={`$${plan.priceUSD}`} />
            <Info label="Tokens / Period" value={plan.tokensPerPeriod} />
            <Info label="Queue Priority" value={plan.queuePriority} />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <p className="font-medium">Description</p>
            <p className="text-muted-foreground">
              {plan.description || "No description provided."}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-1">
            <p className="font-medium">Features</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ✅ Tiny reusable row */
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
