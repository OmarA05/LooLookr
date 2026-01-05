import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-between gap-12 px-4 py-10">
        <div className="max-w-md space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--uw-gold)]">Join loolookr</p>
          <h1 className="text-4xl font-bold">Find the best campus bathrooms.</h1>
          <p className="text-gray-300">
            Create an account to browse the leaderboard, map markers, and share your ratings.
          </p>
        </div>
        <RegisterForm onSuccess={() => navigate('/app')} />
      </div>
    </AppShell>
  );
};

export default Register;
