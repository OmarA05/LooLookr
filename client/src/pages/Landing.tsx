import React from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';

const Landing: React.FC = () => {
  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 text-center">
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--uw-gold)]">
            University of Waterloo
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            Rate, rank, and discover the best bathrooms on campus.
          </h1>
          <p className="text-lg text-gray-300">
            loolookr keeps the campus clean and honest—powered by student ratings with a UW black
            and gold vibe.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-[var(--uw-gold)] px-6 py-3 text-lg font-semibold text-black transition hover:brightness-95"
          >
            Get started
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-[var(--uw-gold)] px-6 py-3 text-lg font-semibold text-[var(--uw-gold)] transition hover:bg-[var(--uw-gold)] hover:text-black"
          >
            I already have an account
          </Link>
        </div>
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
          <h3 className="text-xl font-semibold text-[var(--uw-gold)]">What you get</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-gray-200">
            <li>Top 10 bathrooms leaderboard</li>
            <li>Campus map with live markers</li>
            <li>Filter by building or search</li>
            <li>0-5 star ratings with comments</li>
            <li>JWT login & register</li>
            <li>Black + gold Waterloo styling</li>
          </ul>
        </div>
      </section>
    </AppShell>
  );
};

export default Landing;
