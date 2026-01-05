import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { useToilet } from '../hooks/useToilet';
import ToiletDetail from '../components/toilet/ToiletDetail';

const ToiletPage: React.FC = () => {
  const { id } = useParams();
  const { data: toilet, isLoading, error } = useToilet(id);

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col gap-6 px-4 py-8">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Link to="/app" className="text-[var(--uw-gold)] hover:underline">
            ← Back to map
          </Link>
          {toilet && <span>/ {toilet.name}</span>}
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-gray-300">
            Loading bathroom...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-red-400">
            Could not load bathroom details.
          </div>
        )}

        {!isLoading && !error && <ToiletDetail toilet={toilet} />}
      </div>
    </AppShell>
  );
};

export default ToiletPage;
