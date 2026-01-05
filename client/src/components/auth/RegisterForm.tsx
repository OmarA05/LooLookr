import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

const schema = z.object({
  userName: z.string().min(2, 'Username is required'),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

type RegisterFormProps = {
  onSuccess?: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { registerWithCredentials, isAuthLoading } = useAuth();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await registerWithCredentials(values.userName, values.email, values.password);
      showToast('Account created', 'success');
      onSuccess?.();
    } catch (error) {
      showToast('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-black/60 p-8 shadow-card border border-white/5"
    >
      <div>
        <h2 className="text-2xl font-semibold text-[var(--uw-gold)]">Create account</h2>
        <p className="text-sm text-gray-300">Join to rate and discover campus bathrooms.</p>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        <span>Username</span>
        <input
          type="text"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-[var(--uw-gold)] focus:outline-none"
          placeholder="uwaterloo fan"
          {...register('userName')}
        />
        {errors.userName && (
          <span className="text-xs text-red-400">{errors.userName.message}</span>
        )}
      </label>
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
        {isAuthLoading ? 'Creating...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
