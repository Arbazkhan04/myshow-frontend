import { useFormContext } from "react-hook-form";
import { FieldWrapper } from "./base.field";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

export function PasswordField({
    name = "password",
    label = "Password",
    placeholder = "Enter password"
}: {
    name?: string;
    label?: string;
    placeholder?: string;
}) {
    const { register } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <FieldWrapper {...{ label, name, Icon: Lock }}>
            <div className="relative">
                <Input
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    {...register(name)}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                        {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                </Button>
            </div>
        </FieldWrapper>
    )
}