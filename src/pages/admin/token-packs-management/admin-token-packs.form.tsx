"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { type TokenPack } from "./admin-token-packs.index";
import { useEffect } from "react";
import {
  useCreateTokenPackMutation,
  useUpdateTokenPackMutation,
} from "@/api/tokenPack";
import {
  FaTag,
  FaCoins,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "sonner";

type FormValues = {
  name: string;
  tokens: number;
  priceUSD: number;
  isActive: boolean;
  description: string;
};

type Props = {
  tokenPack?: TokenPack | null;
  onClose?: () => void;
};

export function TokenPackFormDialog({ tokenPack, onClose }: Props) {
  const [createTokenPack, { isLoading: creating }] =
    useCreateTokenPackMutation();
  const [updateTokenPack, { isLoading: updating }] =
    useUpdateTokenPackMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      tokens: 0,
      priceUSD: 0,
      isActive: true,
      description: "",
    },
  });

  useEffect(() => {
    if (tokenPack) {
      form.reset({
        name: tokenPack.name,
        tokens: tokenPack.tokens,
        priceUSD: tokenPack.priceUSD,
        isActive: tokenPack.isActive,
        description: tokenPack.description,
      });
    }
  }, [tokenPack, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      let response: any;

      if (tokenPack) {
        response = await updateTokenPack({
          id: tokenPack._id,
          body: values,
        }).unwrap();
        console.log(response);
        toast(response.message || "Token Pack Updated");
      } else {
        response = await createTokenPack(values).unwrap();
        toast(response.message || "Token Pack Created");
      }

      onClose?.();
    } catch (err: any) {
        console.log(err)
      toast(err?.data?.message || "Submission Failed");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {tokenPack ? "Update Token Pack" : "Create Token Pack"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <div className="relative">
              <FaTag className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input className="pl-10" {...form.register("name")} />
            </div>
          </div>

          {/* Tokens */}
          <div className="space-y-2">
            <Label>Tokens</Label>
            <div className="relative">
              <FaCoins className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="number"
                className="pl-10"
                {...form.register("tokens", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price (USD)</Label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="number"
                className="pl-10"
                {...form.register("priceUSD", { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <div className="relative">
              <FaInfoCircle className="absolute left-3 top-3" />
              <Textarea
                rows={3}
                className="pl-10"
                {...form.register("description")}
              />
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <Switch
              checked={form.watch("isActive")}
              onCheckedChange={(v) => form.setValue("isActive", v)}
            />
            <Label>Active</Label>
          </div>

          {/* Submit */}
          <Button className="w-full" disabled={creating || updating}>
            {tokenPack ? "Update Token Pack" : "Create Token Pack"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
