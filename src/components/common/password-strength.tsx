import { cn } from "@/lib/utils";

export const getPasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;

  if (strength === 0)
    return { strength: 0, label: "Weak", color: "bg-gray-300" };
  if (strength <= 50)
    return { strength, label: "Fair", color: "bg-orange-400" };
  if (strength <= 75)
    return { strength, label: "Good", color: "bg-blue-500" };
  return { strength, label: "Strong", color: "bg-green-500" };
};

export function PasswordStrength({ password }: { password: string; }) {
  const passwordStrength = getPasswordStrength(password);
  return (
    <div className="space-y-1 mt-3">
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            passwordStrength.color
          )}
          style={{ width: `${passwordStrength.strength}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Strength:{" "}
        <span className="font-medium">{passwordStrength.label}</span>
      </p>
    </div>
  )
}