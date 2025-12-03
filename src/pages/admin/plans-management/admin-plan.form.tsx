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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { type Plan } from "./admin-plan.index";
import { useEffect } from "react";
import { useCreatePlanMutation, useUpdatePlanMutation } from "@/api/plan";
import {
    FaLayerGroup,
    FaTag,
    FaClock,
    FaDollarSign,
    FaCoins,
    FaSortAmountUp,
    FaListUl,
    FaInfoCircle,
} from "react-icons/fa";
import { toast } from "sonner";

/* ✅ Enums mirrored from backend */
const PLAN_TIERS = ["STARTER", "CREATOR", "PRO", "AGENCY"] as const;
const PLAN_INTERVALS = ["MONTHLY", "ANNUAL"] as const;

const QUEUE_PRIORITIES = [
    { label: "Standard", value: 10 },
    { label: "Priority", value: 20 },
    { label: "High Priority", value: 30 },
    { label: "Dedicated", value: 40 },
] as const;

type FormValues = {
    tier: string;
    name: string;
    interval: string;
    priceUSD: number;
    tokensPerPeriod: number;
    queuePriority: number;
    features: string;
    isActive: boolean;
    description: string;
};

type Props = {
    plan?: Plan | null;
    onClose?: () => void;
};

export function PlanFormDialog({ plan, onClose }: Props) {
    const [createPlan, { isLoading: creating }] = useCreatePlanMutation();
    const [updatePlan, { isLoading: updating }] = useUpdatePlanMutation();

    const form = useForm<FormValues>({
        defaultValues: {
            tier: "",
            name: "",
            interval: "",
            priceUSD: 0,
            tokensPerPeriod: 0,
            queuePriority: 10,
            features: "",
            isActive: true,
            description: "",
        },
    });

    useEffect(() => {
        if (plan) {
            form.reset({
                tier: plan.tier,
                name: plan.name,
                interval: plan.interval,
                priceUSD: plan.priceUSD,
                tokensPerPeriod: plan.tokensPerPeriod,
                queuePriority: plan.queuePriority,
                features: plan.features.join("\n"),
                isActive: plan.isActive,
                description: plan.description,
            });
        }
    }, [plan, form]);

    const onSubmit = async (values: FormValues) => {
        const payload = {
            ...values,
            queuePriority: Number(values.queuePriority),
            features: values.features
                .split("\n")
                .map((f) => f.trim())
                .filter(Boolean),
        };

        try {
            let response;

            if (plan) {
                response = await updatePlan({ id: plan._id, body: payload }).unwrap();
                toast(response.message || "Plan Updated");
            } else {
                response = await createPlan(payload).unwrap();
                toast(response.data.message || "New Plan Created");
            }

            console.log(response);

            onClose?.();
        } catch (err) {
            console.log("Error", err);
            toast(err.data.message || "Submission Failed");
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {plan ? "Update Plan" : "Create Plan"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    {/* Tier */}
                    <div className="space-y-2">
                        <Label>Tier</Label>
                        <Select
                            value={form.watch("tier")}
                            onValueChange={(v) => form.setValue("tier", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select tier" />
                            </SelectTrigger>
                            <SelectContent>
                                {PLAN_TIERS.map((tier) => (
                                    <SelectItem key={tier} value={tier}>
                                        {tier}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label>Plan Name</Label>
                        <div className="relative">
                            <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-10" {...form.register("name")} />
                        </div>
                    </div>

                    {/* Interval */}
                    <div className="space-y-2">
                        <Label>Billing Interval</Label>
                        <Select
                            value={form.watch("interval")}
                            onValueChange={(v) => form.setValue("interval", v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select interval" />
                            </SelectTrigger>
                            <SelectContent>
                                {PLAN_INTERVALS.map((interval) => (
                                    <SelectItem key={interval} value={interval}>
                                        {interval}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price & Tokens */}
                    <div className="grid grid-cols-2 gap-4">
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

                        <div className="space-y-2">
                            <Label>Tokens / Period</Label>
                            <div className="relative">
                                <FaCoins className="absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="number"
                                    className="pl-10"
                                    {...form.register("tokensPerPeriod", { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Queue Priority */}
                    <div className="space-y-2">
                        <Label>Queue Priority</Label>
                        <Select
                            value={String(form.watch("queuePriority"))}
                            onValueChange={(v) =>
                                form.setValue("queuePriority", Number(v))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {QUEUE_PRIORITIES.map((p) => (
                                    <SelectItem key={p.value} value={String(p.value)}>
                                        {p.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="relative">
                            <FaListUl className="absolute left-3 top-3" />
                            <Textarea
                                rows={5}
                                className="pl-10"
                                {...form.register("features")}
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
                        {plan ? "Update Plan" : "Create Plan"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
