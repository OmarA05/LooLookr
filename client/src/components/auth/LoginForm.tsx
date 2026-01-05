import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

type LoginFormProps = {
  onSuccess?: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { loginWithCredentials, isAuthLoading } = useAuth();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await loginWithCredentials(values.email, values.password);
      showToast('Logged in successfully', 'success');
      onSuccess?.();
    } catch (error) {
      showToast('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-black/60 p-8 shadow-card border border-white/5"
    >
      <div>
        <h2 className="text-2xl font-semibold text-[var(--uw-gold)]">Welcome back</h2>
        <p className="text-sm text-gray-300">Sign in to rate and explore the top bathrooms.</p>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        <span>Email</span>
        <input
          type="email"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[var(--uw-gold)] focus:outline-none"
          placeholder="you@uwaterloo.ca"
          {...register('email')}
        />
        {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span>Password</span>
        <input
          type="password"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[var(--uw-gold)] focus:outline-none"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-xs text-red-400">{errors.password.message}</span>
        )}
      </label>
      <button
        type="submit"
        disabled={isAuthLoading}
        className="mt-2 w-full rounded-lg bg-[var(--uw-gold)] px-4 py-2 font-semibold text-black transition hover:brightness-90 disabled:opacity-60"
      >
        {isAuthLoading ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
