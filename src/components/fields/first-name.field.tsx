import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FirstNameField({ name = "firstName" }) {
  const { register } = useFormContext()
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>First Name</Label>
      <Input id={name} placeholder="John" {...register(name)} />
    </div>
  )
}
