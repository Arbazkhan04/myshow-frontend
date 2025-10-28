import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/api/auth";
import { useDispatch } from "react-redux";
import { login } from "@/store/auth-slice";
import { EmailField, FullNameField } from "../fields/text.field";
import { PasswordField } from "../fields/password.field";
import { PasswordStrength } from "../common/password-strength";
import { submitHandler } from "@/lib/submit-handler";
import { GenderField } from "../fields/select.field";
import { useEffect, useState } from "react";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Please select your gender",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}
export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [debouncedPassword, setDebouncedPassword] = useState("");
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit, watch } = methods;

  const rawPassword = watch("password", "");

  // debounce password updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPassword(rawPassword);
    }, 300); // 300ms delay
    return () => clearTimeout(handler);
  }, [rawPassword]);
   
  const onSubmit = async (data: RegisterFormData) => {
    submitHandler({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        gender: data.gender,
        role: "user",
      },
      mutate: registerMutation,
      onSuccess: (res) => {
        const token = res.body.accessToken as string;
        dispatch(login({ token }));
        // onSuccess?.();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FullNameField />
        <EmailField />
        <PasswordField />
        {debouncedPassword && <PasswordStrength password={debouncedPassword} />}
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Re-enter password"
        />
        <GenderField />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
}