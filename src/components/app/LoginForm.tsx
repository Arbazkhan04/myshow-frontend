import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLoginMutation } from '@/api/auth';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth-slice'
import { EmailField } from '../fields/text.field';
import { PasswordField } from '../fields/password.field';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ onSuccess }: {
  onSuccess: () => void;
}) {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation({
        email: data.email,
        password: data.password
      }).unwrap() as any;

      if (response.success) {
        // Dispatch to auth slice to set token in cookie and update state
        dispatch(login({ token: response.body.accessToken }));

        // Show success toast with backend message
        toast(response.message);
        onSuccess();
      } else {
        // Handle case where token is not present
        toast('Login Failed', {
          description: 'No token received from server'
        });
      }
    } catch (error: any) {
      // Handle API error - use backend message if available
      const errorData = error.data;
      if (errorData?.message) {
        toast(errorData.message || 'Login Failed', {
          description: errorData.message.description || 'Please try again',
        });
      } else {
        toast('Login Failed', {
          description: 'An unexpected error occurred'
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <EmailField />
        <PasswordField />
        <Button type="submit" className="w-full" isLoading={isLoading}>
          {isLoading ? "Signing in..." : "Log In"}
        </Button>
      </form>
    </FormProvider>
  );
}