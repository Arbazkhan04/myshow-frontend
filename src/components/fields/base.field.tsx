import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import type { ReactNode } from "react";
import type { LucideProps } from "lucide-react";
import type { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

export function FieldWrapper({
    label,
    name,
    Icon,
    children
}: {
    label: string;
    name: string;
    children: ReactNode;
    Icon: IconType | React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}) {
    const { formState: { errors } } = useFormContext();
    const error = errors[name];
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Icon className={cn("left-3 top-3 h-4 w-4 text-muted-foreground", error && "text-destructive")} />
                <div>
                    {error ? (
                        <Label htmlFor={label} className="text-sm text-destructive font-medium">
                            {error.message as string}
                        </Label>
                    ) : (
                        <Label htmlFor={label} className="text-sm font-medium">
                            {label}
                        </Label>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}