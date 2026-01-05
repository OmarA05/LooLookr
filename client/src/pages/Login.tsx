import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-between gap-12 px-4 py-10">
        <div className="max-w-md space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--uw-gold)]">loolookr</p>
          <h1 className="text-4xl font-bold">Log in to unlock the map.</h1>
          <p className="text-gray-300">
            See the top 10 bathrooms on the interactive campus map and rate them in seconds.
          </p>
        </div>
        <LoginForm onSuccess={() => navigate('/app')} />
      </div>
    </AppShell>
  );
};

export default Login;
